import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Admin auth is handled client-side in /app/admin/layout.tsx
  // (checks supabase session + profile role)
  // Middleware cannot check localStorage-based Supabase sessions
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
