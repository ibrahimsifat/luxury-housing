import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the request is for CMS routes
  if (request.nextUrl.pathname.startsWith("/cms")) {
    // Allow access to login page
    if (request.nextUrl.pathname === "/cms/login") {
      return NextResponse.next();
    }

    // Check if user is logged in (client-side check will handle redirect)
    const isLoggedIn = request.cookies.get("cms_logged_in")?.value === "true";

    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/cms/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/cms/:path*",
};
