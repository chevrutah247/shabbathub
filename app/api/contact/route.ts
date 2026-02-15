import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit } from '@/lib/rate-limit';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    // Rate limit: 5 messages per minute per IP
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const { success } = await rateLimit(`contact:${ip}`, 5, 60);
    if (!success) return NextResponse.json({ error: 'Слишком много запросов. Подождите минуту.' }, { status: 429 });

    const { name, email, message } = await req.json();
    if (!name || !email || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    // Save to Supabase
    const { error: dbError } = await supabaseAdmin.from('contact_messages').insert({
      name,
      contact: email,
      message,
      ip,
    });
    if (dbError) {
      console.error('[ShabbatHub] DB insert error:', dbError);
    }

    // Send email via Resend
    const apiKey = process.env.RESEND_API_KEY;
    let emailResult = null;
    if (apiKey) {
      const resend = new Resend(apiKey);
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      emailResult = await resend.emails.send({
        from: 'ShabbatHub <noreply@shabbathub.com>',
        to: 'chevrutah24x7@gmail.com',
        subject: 'ShabbatHub: Сообщение от ' + name,
        ...(isEmail ? { replyTo: email } : {}),
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
            <h2 style="color:#1e3a8a;">Новое сообщение с ShabbatHub</h2>
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Контакт:</strong> ${email}</p>
            <hr style="border:none;border-top:1px solid #eee;margin:16px 0;">
            <p style="white-space:pre-wrap;">${message}</p>
          </div>
        `,
      });
      console.log('[ShabbatHub] Resend result:', JSON.stringify(emailResult));
    }

    return NextResponse.json({
      success: true,
      db: dbError ? dbError.message : 'ok',
      email: emailResult ? 'sent' : 'no_api_key',
    });
  } catch (err: any) {
    console.error('[ShabbatHub] Contact error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
