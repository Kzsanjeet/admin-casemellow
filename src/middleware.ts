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
  // user to be authenticated before they can access them.
  const protectedRoutes = [
    "/home",
    "/brands",
    "/products",
    "/orders",
    "/customize",
    "/customize/orders",
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


//tells Next.js which routes the middleware should run on.
export const config = {
  matcher: [
    "/home/:path*",
    "/brands/:path*",
    "/products/:path*",
    "/orders/:path*",
    "/customize/:path*",
    "/users-info/:path*",
    "/login", // Include login in matcher
    "/forgot-password", // Include forgot-password in matcher
  ],
}