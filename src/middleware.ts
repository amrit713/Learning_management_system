import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    // console.log("middleware pathname:", req.nextUrl.pathname);
    // console.log("middleware token:", req.nextauth.token?.role);

    if (
      req.nextUrl.pathname.startsWith("/teacher") &&
      req.nextauth.token?.role !== "TEACHER"
    ) {
      return NextResponse.rewrite(new URL("/unauthorized", req.url)); // display unauthorized page in orginal url
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/teacher/:path*"],
};
