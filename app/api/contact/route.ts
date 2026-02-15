import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    // Rate limit: 5 messages per minute per IP
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const { success } = await rateLimit(`contact:${ip}`, 5, 60);
    if (!success) return NextResponse.json({ error: 'Слишком много запросов. Подождите минуту.' }, { status: 429 });

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });

    const resend = new Resend(apiKey);
    const { name, email, message } = await req.json();
    if (!name || !email || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    await resend.emails.send({
      from: 'ShabbatHub <onboarding@resend.dev>',
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

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
