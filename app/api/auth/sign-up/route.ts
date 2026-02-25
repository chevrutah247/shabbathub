import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ensureSignupAllowed } from '@/lib/auth-throttle';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin = serviceKey
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey)
  : null;

const GENERIC_ERROR = 'Не удалось выполнить регистрацию. Попробуйте позже.';
const TOO_MANY = 'Слишком много попыток регистрации. Подождите 1 час.';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email || '').trim().toLowerCase();
    const password = String(body?.password || '');
    const firstName = String(body?.firstName || '').trim();
    const lastName = String(body?.lastName || '').trim();
    const referrerId = String(body?.referrerId || '').trim();

    if (!email || password.length < 6) {
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
    }

    // Block + in email (anti-alias spam)
    if (email.includes('+')) {
      return NextResponse.json({ error: 'Email cannot contain the + symbol' }, { status: 400 });
    }

    // Validate names (letters only)
    const nameRegex = /^[A-Za-zА-Яа-яЁё\u0590-\u05FF\s'-]*$/;
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
          role: 'volunteer',
        },
      },
    });

    if (error) {
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
    }

    // Optional hardening: set volunteer role + mark successful referral using service role.
    // Works only when SUPABASE_SERVICE_ROLE_KEY is configured.
    const userId = data.user?.id || null;
    const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (supabaseAdmin && userId) {
      try {
        await supabaseAdmin.from('profiles').update({ role: 'volunteer' }).eq('id', userId);
        if (uuidRe.test(referrerId) && referrerId !== userId) {
          const { error: refErr } = await supabaseAdmin.from('referrals').insert({
            referrer_id: referrerId,
            referred_user_id: userId,
            registered_at: new Date().toISOString(),
          });
          if (refErr) {
            // Backward compatibility for old referrals schema (without referred_user_id)
            await supabaseAdmin.from('referrals').insert({ referrer_id: referrerId });
          }
        }
      } catch {
        // noop: signup must not fail because of referral/logging side effects
      }
    }

    return NextResponse.json({
      ok: true,
      userId,
      email,
    });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
