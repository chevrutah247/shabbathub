import { NextRequest, NextResponse } from 'next/server';
import { confirmationEmail, newIssueEmail } from '@/lib/email-templates';
import { Lang } from '@/lib/language-context';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = 'ShabbatHub <noreply@shabbathub.com>';

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set, skipping email');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + RESEND_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [to],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error('Resend error:', err);
      return { success: false, error: err.message || 'Failed to send' };
    }

    const data = await res.json();
    return { success: true, id: data.id };
  } catch (err: any) {
    console.error('Email send error:', err);
    return { success: false, error: err.message };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, email, lang = 'ru' } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const validLang: Lang = ['ru', 'en', 'he', 'uk'].includes(lang) ? lang : 'ru';

    if (type === 'confirmation') {
      const { subject, html } = confirmationEmail(validLang, email);
      const result = await sendEmail(email, subject, html);
      return NextResponse.json(result);
    }

    if (type === 'new_issue') {
      const { pubTitle, issueTitle, pdfUrl, docUrl } = body;
      if (!pubTitle || !issueTitle || !pdfUrl || !docUrl) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
      const { subject, html } = newIssueEmail(validLang, email, pubTitle, issueTitle, pdfUrl, docUrl);
      const result = await sendEmail(email, subject, html);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Unknown email type' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
