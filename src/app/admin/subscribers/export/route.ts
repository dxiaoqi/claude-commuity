import { NextRequest, NextResponse } from "next/server";
import { getSubscribersForExport, isAdminHostname, type SubscriberFilters } from "@/lib/subscriber-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function safeCsvCell(value: unknown) {
  let text = value instanceof Date ? value.toISOString() : String(value ?? "");
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET(request: NextRequest) {
  if (!isAdminHostname(request.headers.get("host"))) return new NextResponse("Not found", { status: 404 });

  const query = request.nextUrl.searchParams.get("q")?.trim().slice(0, 120) || undefined;
  const source = request.nextUrl.searchParams.get("source")?.trim().slice(0, 80) || undefined;
  const rawStatus = request.nextUrl.searchParams.get("status");
  const status = rawStatus === "active" || rawStatus === "unsubscribed" ? rawStatus : undefined;
  const filters: SubscriberFilters = { query, source, status };
  const rows = await getSubscribersForExport(filters);
  const headers = ["email", "status", "source", "landing_page", "referrer", "locale", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "consented_at", "created_at", "updated_at"];
  const csv = [
    headers.map(safeCsvCell).join(","),
    ...rows.map((row) => headers.map((key) => safeCsvCell(row[key as keyof typeof row])).join(",")),
  ].join("\r\n");
  const day = new Date().toISOString().slice(0, 10);

  return new NextResponse(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="claude-community-subscribers-${day}.csv"`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

