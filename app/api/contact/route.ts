import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    await resend.emails.send({
      from: 'ShabbatHub <noreply@shabbathub.com>',
      to: 'chevrutah24x7@gmail.com',
      subject: 'ShabbatHub: Сообщение от ' + name,
      replyTo: email,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <h2 style="color:#1e3a8a;">Новое сообщение с ShabbatHub</h2>
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
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
