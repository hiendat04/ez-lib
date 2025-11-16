import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

export async function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  // Verify session token existence
  if (sessionToken) {
    try {
      // Verify the token. If it fails, the catch block will execute.
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      await jose.jwtVerify(sessionToken, secret);

      // If token is valid and user is on login/register, redirect them away
      if (pathname === "/login" || pathname === "/register") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (error) {
      // TOKEN IS INVALID (malformed, expired, etc.)
      console.log("Middleware: Invalid token found. Clearing cookie.");
      const response = NextResponse.redirect(new URL("/login", request.url));

      // Clear the invalid cookie by setting it with an expiration date in the past
      response.cookies.set("session", "", { expires: new Date(0), path: "/" });

      return response;
    }
  }

  // If user is not authenticated and tries to access a protected route, redirect to login
  if (!sessionToken && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is authenticated and tries to access login/register, redirect to dashboard
  if (sessionToken && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
