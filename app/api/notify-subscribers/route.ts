import { NextRequest, NextResponse } from 'next/server';
import { newIssueEmail } from '@/lib/email-templates';
import { Lang } from '@/lib/language-context';
import { createClient } from '@supabase/supabase-js';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'ShabbatHub <noreply@shabbathub.com>';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yvgcxmqgvxlvbxsszqcc.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY'
);

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
    const body = await request.json();
    const { publication_id, pub_title, issue_title, pdf_url, doc_id } = body;

    if (!publication_id || !issue_title) {
      return NextResponse.json({ error: 'publication_id and issue_title required' }, { status: 400 });
    }

    const siteUrl = 'https://shabbathub.com';
    const docUrl = doc_id ? siteUrl + '/document/' + doc_id : siteUrl + '/catalog';
    const downloadUrl = pdf_url || docUrl;

    // Найти подписчиков на эту публикацию
    const { data: subscribers, error } = await supabase
      .from('subscriptions')
      .select('email, language, publication_ids')
      .eq('is_active', true);

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
    }

    // Фильтруем подписчиков
    const targetSubscribers = (subscribers || []).filter(sub => {
      if (!sub.publication_ids || !Array.isArray(sub.publication_ids)) return false;
      return sub.publication_ids.includes(publication_id);
    });

    if (targetSubscribers.length === 0) {
      return NextResponse.json({ success: true, sent: 0, message: 'No subscribers' });
    }

    let sent = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const sub of targetSubscribers) {
      // Язык письма = язык ПОДПИСЧИКА (не публикации)
      const lang: Lang = (['ru', 'en', 'he', 'uk'].includes(sub.language) ? sub.language : 'ru') as Lang;
      const emailData = newIssueEmail(lang, sub.email, pub_title || issue_title, issue_title, downloadUrl, docUrl);

      const result = await sendEmail(sub.email, emailData.subject, emailData.html);
      if (result.success) {
        sent++;
      } else {
        failed++;
        errors.push(sub.email + ': ' + (result.error || 'unknown'));
      }
      // Пауза между письмами
      await new Promise(r => setTimeout(r, 300));
    }

    return NextResponse.json({ success: true, total: targetSubscribers.length, sent, failed, errors: errors.length > 0 ? errors : undefined });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
