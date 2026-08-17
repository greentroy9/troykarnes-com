import { NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/journal/auth";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Public paths within the protected space
  if (
    pathname === "/journal/login" ||
    pathname === "/api/journal/login" ||
    pathname.startsWith("/api/journal/cron")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const ok = await verifyToken(token);
  if (ok) return NextResponse.next();

  if (pathname.startsWith("/api/journal")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = request.nextUrl.clone();
  url.pathname = "/journal/login";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/journal/:path*", "/api/journal/:path*"],
};
