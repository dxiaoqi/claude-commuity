import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { hashIp, saveSubscriber } from "@/lib/newsletter";

export const runtime = "nodejs";

const payloadSchema = z.object({
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  company: z.string().max(100).optional().nullable(),
  consent: z.union([z.literal(true), z.literal("on")]).transform(() => true),
  source: z.string().trim().min(1).max(80),
  landingPage: z.string().trim().max(500).default("/"),
  referrer: z.string().trim().max(1000).optional().nullable(),
  locale: z.string().trim().max(40).optional().nullable(),
  utmSource: z.string().trim().max(200).optional().nullable(),
  utmMedium: z.string().trim().max(200).optional().nullable(),
  utmCampaign: z.string().trim().max(200).optional().nullable(),
  utmContent: z.string().trim().max(200).optional().nullable(),
  utmTerm: z.string().trim().max(200).optional().nullable(),
});

const attempts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }
  current.count += 1;
  return current.count > 5;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const ipHash = hashIp(ip);
  if (isRateLimited(ipHash)) return NextResponse.json({ message: "Too many attempts. Try again later." }, { status: 429 });

  try {
    const isJson = request.headers.get("content-type")?.includes("application/json");
    const rawPayload = isJson ? await request.json() : Object.fromEntries(await request.formData());
    const payload = payloadSchema.parse(rawPayload);
    if (payload.company) return NextResponse.json({ message: "You’re on the list." });
    const { company: _company, consent: _consent, ...subscriber } = payload;
    void _company; void _consent;
    const result = await saveSubscriber({ ...subscriber, ipHash });
    if (!isJson) return NextResponse.redirect(new URL("/?joined=1#join", request.url), 303);
    return NextResponse.json({
      message: result.duplicate ? "You’re already on the list — good instincts." : "You’re in. Watch your inbox for the first field note.",
      duplicate: result.duplicate,
    });
  } catch (error) {
    const isJson = request.headers.get("content-type")?.includes("application/json");
    if (!isJson) return NextResponse.redirect(new URL("/?join_error=1#join", request.url), 303);
    if (error instanceof z.ZodError) return NextResponse.json({ message: "Check your email and consent, then try again." }, { status: 400 });
    console.error("newsletter_signup_failed", error instanceof Error ? error.message : "unknown_error");
    return NextResponse.json({ message: "The list is temporarily unavailable. Try again soon." }, { status: 503 });
  }
}
