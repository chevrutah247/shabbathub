import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ensureSignupAllowed } from '@/lib/auth-throttle';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const GENERIC_ERROR = 'Не удалось выполнить регистрацию. Попробуйте позже.';
const TOO_MANY = 'Слишком много попыток регистрации. Подождите 1 час.';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email || '').trim().toLowerCase();
    const password = String(body?.password || '');
    const firstName = String(body?.firstName || '').trim();
    const lastName = String(body?.lastName || '').trim();

    if (!email || password.length < 6) {
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
    }

    // Block + in email (anti-alias spam)
    if (email.includes('+')) {
      return NextResponse.json({ error: 'Email cannot contain the + symbol' }, { status: 400 });
    }

    // Validate names (letters only)
    const nameRegex = /^[\p{L}\s'-]*$/u;
    if (firstName && !nameRegex.test(firstName)) {
      return NextResponse.json({ error: 'Name can only contain letters' }, { status: 400 });
    }
    if (lastName && !nameRegex.test(lastName)) {
      return NextResponse.json({ error: 'Last name can only contain letters' }, { status: 400 });
    }

    const guard = await ensureSignupAllowed(email, request);
    if (!guard.allowed) {
      return NextResponse.json({ error: TOO_MANY, code: 'TEMP_BLOCKED', retryAfterSec: guard.retryAfterSec || 3600 }, { status: 429 });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName || null,
          last_name: lastName || null,
        },
      },
    });

    if (error) {
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      userId: data.user?.id || null,
      email,
    });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
