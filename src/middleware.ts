import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function middleware(request: NextRequest) {
  // Check if the request is for admin routes (except login)
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {

      // Redirect to login if no token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Verify the token using jose (Edge Runtime compatible)
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secret);
      // Token is valid, continue to the requested page
      return NextResponse.next();
    } catch (_) {

      // Token is invalid, redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin-token');
      return response;
    }
  }

  // For login page, redirect to dashboard if already authenticated
  if (request.nextUrl.pathname === '/admin/login') {
    const token = request.cookies.get('admin-token')?.value;
    
    if (token) {
      try {
        const secret = new TextEncoder().encode(JWT_SECRET);
        await jwtVerify(token, secret);
        // Token is valid, redirect to dashboard
        return NextResponse.redirect(new URL('/admin', request.url));
      } catch (_) {
        // Token is invalid, allow access to login page
        const response = NextResponse.next();
        response.cookies.delete('admin-token');
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/(.*)']
};