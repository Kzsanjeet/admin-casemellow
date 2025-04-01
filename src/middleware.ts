import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/verifyToken"

// Authentication configuration
const AUTH_CONFIG = {
  publicPaths: ["/login", "/forgot-password"], // initially authorized path
  protectedPaths: [
    "/home",
    "/brands",
    "/products",
    "/wellness",
    "/blogs",
    "/activities",
    "/plan-trip",
    "/requests-mails",
    "/users-info",
  ],  // path that are applicable only after logged in
  loginPath: "/login",
  homePath: "/home",
}

export async function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get("accessToken")?.value

  const pathname = new URL(request.url).pathname



  // Helper function to check path matching
  const matchesPath = (paths: string[]) =>
    paths.some((path) => pathname.startsWith(path))
  // Scenario 1: No token - redirect to login for protected routes
  if (!token) {
    if (matchesPath(AUTH_CONFIG.protectedPaths)) {
      return NextResponse.redirect(new URL(AUTH_CONFIG.loginPath, request.url))
    }
    return NextResponse.next()
  }

  // Scenario 2: Token exists - validate token
//   try {
//     const isValidToken = await verifyToken(token)

//     // If token is invalid
//     if (!isValidToken) {
//       const response = NextResponse.redirect(
//         new URL(AUTH_CONFIG.loginPath, request.url)
//       )
//       response.cookies.delete("token")
//       return response
//     }

//     // Scenario 3: Valid token - prevent access to public paths
//     if (matchesPath(AUTH_CONFIG.publicPaths)) {
//       return NextResponse.redirect(new URL(AUTH_CONFIG.homePath, request.url))
//     }

//     // Allow access to protected routes
//     return NextResponse.next()
//   } catch (error) {
//     // Catch any unexpected errors during token validation
//     const response = NextResponse.redirect(
//       new URL(AUTH_CONFIG.loginPath, request.url)
//     )
//     response.cookies.delete("token")
//     return response
//   }
}

// Matcher configuration
export const config = {
  matcher: [
    "/home/:path*",
    "/brands/:path*",
    "/products/:path*",
    "/wellness/:path*",
    "/blogs/:path*",
    "/activities/:path*",
    "/plan-trip/:path*",
    "/requests-mails/:path*",
    "/users-info/:path*",
    "/login", // Include login in matcher
    "/forgot-password", // Include forgot-password in matcher
  ],
}