import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  const token = req.cookies.get('admin-token')?.value;

  // Protect only /sxs_admin routes
  if (req.nextUrl.pathname.startsWith('/sxs_admin')) {
    if (!token) {
      // ❌ No token, redirect to login
      return NextResponse.redirect(new URL('/sxs_admin/login', req.url));
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!); // ✅ Valid token
      return NextResponse.next(); // Allow access
    } catch (err) {
      // ❌ Invalid token
      return NextResponse.redirect(new URL('/sxs_admin/login', req.url));
    }
  }

  // Allow everything else
  return NextResponse.next();
}

export const config = {
  matcher: "/sxs_admin/:path*",
};