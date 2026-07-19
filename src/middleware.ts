import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Redirect all Next.js admin pages (like /admin, /admin/login, /admin/templates, etc.)
  // to the unified PHP Admin Panel
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const phpAdminUrl = process.env.NEXT_PUBLIC_PHP_API_URL
      ? `${process.env.NEXT_PUBLIC_PHP_API_URL.replace(/\/$/, '')}/admin/landingpage.php`
      : 'http://localhost/UndanganPanel/admin/landingpage.php'
    
    return NextResponse.redirect(new URL(phpAdminUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/(.*)']
}