import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ANON_KEY;

const supabaseAuth = createClient(SUPABASE_URL, ANON_KEY);
const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_KEY);

export { supabaseAdmin };

type AuthResult =
  | { ok: true; userId: string; email: string; role: string | null }
  | { ok: false; response: NextResponse };

/**
 * Verify the Bearer token from Authorization header.
 * Returns user info or a 401 response.
 */
export async function requireAuth(request: Request): Promise<AuthResult> {
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';

  if (!token) {
    return { ok: false, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }

  const { data, error } = await supabaseAuth.auth.getUser(token);
  if (error || !data?.user) {
    return { ok: false, response: NextResponse.json({ error: 'Invalid session' }, { status: 401 }) };
  }

  // Fetch role from profiles table (source of truth)
  let role: string | null = null;
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single();
  if (profile) role = profile.role;

  return { ok: true, userId: data.user.id, email: data.user.email || '', role };
}

/**
 * Verify that the caller is an admin or editor.
 */
export async function requireAdmin(request: Request): Promise<AuthResult> {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth;

  if (auth.role !== 'admin' && auth.role !== 'editor') {
    return { ok: false, response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
  }

  return auth;
}

/**
 * Verify CRON_SECRET for cron job endpoints.
 * Denies access if secret is not configured or doesn't match.
 */
export function requireCronSecret(request: Request): NextResponse | null {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Cron not configured' }, { status: 403 });
  }
  const auth = request.headers.get('authorization') || '';
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null; // OK
}

/**
 * Escape special characters for PostgREST LIKE/ILIKE patterns.
 */
export function escapeLikePattern(input: string): string {
  return input.replace(/[%_\\]/g, '\\$&');
}

/**
 * HTML-escape a string to prevent XSS in email templates.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
