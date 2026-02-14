import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'ShabbatHub <contact@chevrutah24x7.net>';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const supabaseAnon = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function resetEmailHtml(email: string) {
  const siteUrl = 'https://shabbathub.com';
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;">
  <tr><td style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:30px 40px;border-radius:16px 16px 0 0;text-align:center;">
    <h1 style="color:white;margin:0;font-size:24px;">Shabbat<span style="color:#f59e0b;">Hub</span></h1>
  </td></tr>
  <tr><td style="background:white;padding:40px;border-radius:0 0 16px 16px;">
    <h2 style="color:#1e3a8a;margin:0 0 16px;font-size:20px;">Сброс пароля / Password Reset</h2>
    <p style="color:#374151;line-height:1.6;margin:0 0 12px;">Уважаемый пользователь,</p>
    <p style="color:#374151;line-height:1.6;margin:0 0 12px;">В связи с техническими работами и переносом сайта на новую платформу, мы просим вас установить новый пароль для вашей учётной записи.</p>
    <p style="color:#374151;line-height:1.6;margin:0 0 12px;">Пожалуйста, нажмите кнопку ниже чтобы задать новый пароль:</p>
    <p style="color:#6b7280;line-height:1.6;margin:0 0 20px;font-size:13px;">Due to technical maintenance and platform migration, we ask you to set a new password for your account.</p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${siteUrl}/login" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#2563eb);color:white;padding:14px 40px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:16px;">Сбросить пароль / Reset Password</a>
    </div>
    <p style="color:#6b7280;font-size:13px;line-height:1.5;margin:16px 0 0;">Если вы не регистрировались на ShabbatHub, проигнорируйте это письмо.<br/>If you didn't register on ShabbatHub, please ignore this email.</p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
    <p style="color:#9ca3af;font-size:12px;text-align:center;margin:0;"><a href="${siteUrl}" style="color:#6b7280;">shabbathub.com</a></p>
  </td></tr>
</table>
</body></html>`;
}

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) return { success: false, error: 'No API key' };
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM_EMAIL, to: [to], subject, html }),
    });
    if (!res.ok) { const err = await res.json(); return { success: false, error: err.message }; }
    return { success: true };
  } catch (err: any) { return { success: false, error: err.message }; }
}

export async function POST(request: NextRequest) {
  try {
    // Получить список всех пользователей через admin API
    // Если нет service role key, используем список из body
    const body = await request.json();
    const emails: string[] = body.emails || [];

    if (emails.length === 0) {
      return NextResponse.json({ error: 'No emails provided' }, { status: 400 });
    }

    let sent = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const email of emails) {
      // Отправить Supabase reset (это создаёт настоящую ссылку сброса)
      const { error: resetError } = await supabaseAnon.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://shabbathub.com/reset-password',
      });

      if (resetError) {
        // Если Supabase reset не сработал, отправим своё письмо
        const result = await sendEmail(
          email,
          'ShabbatHub — Сброс пароля / Password Reset',
          resetEmailHtml(email)
        );
        if (result.success) sent++;
        else { failed++; errors.push(email + ': ' + (result.error || 'unknown')); }
      } else {
        sent++;
      }

      await new Promise(r => setTimeout(r, 500));
    }

    return NextResponse.json({ success: true, total: emails.length, sent, failed, errors: errors.length > 0 ? errors : undefined });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
