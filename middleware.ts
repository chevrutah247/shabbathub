import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/admin')) {
    // Security headers for admin pages
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  }

  // Prevent indexing of parameterized subscription landing pages.
  // Canonical remains /subscribe, but this avoids query-URL duplication in SERP.
  if (pathname === '/subscribe') {
    const hasQuery = request.nextUrl.searchParams.has('pub') || request.nextUrl.searchParams.has('lang');
    if (hasQuery) {
      response.headers.set('X-Robots-Tag', 'noindex, follow');
    }
  }

  // Admin auth is handled in app/admin/layout.tsx via Supabase session + role check.
  // Avoid cookie-based redirects here because this project stores auth in client session.

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/subscribe'],
};
