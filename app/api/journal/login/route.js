import { NextResponse } from "next/server";
import { createToken, COOKIE_NAME, SESSION_DAYS } from "@/lib/journal/auth";

export async function POST(request) {
  const { password } = await request.json().catch(() => ({}));
  if (!password || password !== process.env.JOURNAL_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  const token = await createToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
  return res;
}
