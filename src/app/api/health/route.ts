import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ status: "ok", service: "claude-commuity", time: new Date().toISOString() });
}
