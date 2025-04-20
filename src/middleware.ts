// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
// import { verifyToken } from "./lib/verifyToken"

// // Authentication configuration
// const AUTH_CONFIG = {
//   publicPaths: ["/login", "/forgot-password"], // initially authorized path
//   protectedPaths: [
//     "/home",
//     "/brands",
//     "/products",
//     "/orders",
//     "/blogs",
//     "/activities",
//     "/plan-trip",
//     "/requests-mails",
//     "/users-info",
//   ],  // path that are applicable only after logged in
//   loginPath: "/login",
//   homePath: "/home",
// }

// export async function middleware(request: NextRequest) {
//   // Get token from cookies
//   const token = request.cookies.get("accessToken")?.value

//   const pathname = new URL(request.url).pathname



//   // Helper function to check path matching
//   const matchesPath = (paths: string[]) =>
//     paths.some((path) => pathname.startsWith(path))
//   // Scenario 1: No token - redirect to login for protected routes
//   if (!token) {
//     if (matchesPath(AUTH_CONFIG.protectedPaths)) {
//       return NextResponse.redirect(new URL(AUTH_CONFIG.loginPath, request.url))
//     }
//     return NextResponse.next()
//   }

// }

// // Matcher configuration
// export const config = {
//   matcher: [
//     "/home/:path*",
//     "/brands/:path*",
//     "/products/:path*",
//     "/wellness/:path*",
//     "/blogs/:path*",
//     "/activities/:path*",
//     "/plan-trip/:path*",
//     "/requests-mails/:path*",
//     "/users-info/:path*",
//     "/login", // Include login in matcher
//     "/forgot-password", // Include forgot-password in matcher
//   ],
// }



// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Define routes protected by role
  const protectedRoutes = [
    "/home",
    "/brands",
    "/products",
    "/orders",
    "/customize",
    "/customize/orders",
    "/plan-trip",
    "/requests-mails",
    "/users-info",
  ]

  // Get the current path
  const path = request.nextUrl.pathname

  // Skip authentication check for login and forgot-password
  if (path === '/login' || path === '/forgot-password') {
    // If user is already logged in, redirect to home
    if (token) {
      const homeUrl = new URL("/home", request.url)
      return NextResponse.redirect(homeUrl)
    }
    return NextResponse.next()
  }

  // Login redirect if not authenticated
  if (!token) {
    const loginUrl = new URL("/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Check role-based access
  if (token) {
    const userRole = token.role as string
    
    // Check if current path is in protectedRoutes
    const isProtectedRoute = protectedRoutes.some(route => 
      path === route || path.startsWith(`${route}/`)
    )
    
    // Here you should implement your role-based logic
    // For example:
    // if (isProtectedRoute && !hasAccess(userRole, path)) {
    //   const unauthorizedUrl = new URL("/unauthorized", request.url)
    //   return NextResponse.redirect(unauthorizedUrl)
    // }
    
    // This is a placeholder for your role-check logic
    // Replace with your actual role-permission checks
    const hasAccess = (role: string, path: string): boolean => {
      // Implement your role-based access control here
      // Example: return role === 'admin' || (role === 'user' && path.startsWith('/home'))
      return true; // Temporary placeholder
    }
    
    if (isProtectedRoute && !hasAccess(userRole, path)) {
      const unauthorizedUrl = new URL("/unauthorized", request.url)
      return NextResponse.redirect(unauthorizedUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/home/:path*",
    "/brands/:path*",
    "/products/:path*",
    "/orders/:path*",
    "/customize/:path*",
    "/activities/:path*",
    "/plan-trip/:path*",
    "/requests-mails/:path*",
    "/users-info/:path*",
    "/login", // Include login in matcher
    "/forgot-password", // Include forgot-password in matcher
  ],
}