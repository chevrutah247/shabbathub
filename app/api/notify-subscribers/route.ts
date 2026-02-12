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
  if (!RESEND_API_KEY) return { success: false, error: 'Email service not configured' };
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

    const siteUrl = 'https://shabbathub-v2.vercel.app';
    const docUrl = doc_id ? siteUrl + '/document/' + doc_id : siteUrl + '/catalog';
    const downloadUrl = pdf_url || docUrl;

    // Получить язык публикации
    const { data: pubData } = await supabase
      .from('publications')
      .select('primary_language, title_ru, title_en, title_he')
      .eq('id', publication_id)
      .single();

    const pubLang: Lang = (pubData?.primary_language && ['ru', 'en', 'he', 'uk'].includes(pubData.primary_language))
      ? pubData.primary_language as Lang : 'ru';

    // Название публикации на языке публикации
    const localPubTitle = pubLang === 'he' ? (pubData?.title_he || pubData?.title_ru || pub_title)
      : pubLang === 'en' ? (pubData?.title_en || pubData?.title_ru || pub_title)
      : (pubData?.title_ru || pub_title || issue_title);

    // Найти подписчиков
    const { data: subscribers, error } = await supabase
      .from('subscriptions')
      .select('email, language, publication_ids')
      .eq('is_active', true);

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
    }

    const targetSubscribers = (subscribers || []).filter(sub => {
      if (!sub.publication_ids || !Array.isArray(sub.publication_ids)) return false;
      return sub.publication_ids.includes(publication_id);
    });

    if (targetSubscribers.length === 0) {
      return NextResponse.json({ success: true, sent: 0, message: 'No subscribers' });
    }

    // Получить популярные публикации (по числу подписок) для рекомендаций в письме
    const { data: allSubs } = await supabase
      .from('subscriptions')
      .select('publication_ids')
      .eq('is_active', true);

    const pubCounts: Record<string, number> = {};
    (allSubs || []).forEach(s => {
      (s.publication_ids || []).forEach((pid: string) => {
        if (pid !== publication_id) pubCounts[pid] = (pubCounts[pid] || 0) + 1;
      });
    });

    const topPubIds = Object.entries(pubCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id]) => id);

    let popularPubsHtml = '';
    if (topPubIds.length > 0) {
      const { data: topPubs } = await supabase
        .from('publications')
        .select('id, title_ru, title_en, title_he, thumbnail_url')
        .in('id', topPubIds);

      if (topPubs && topPubs.length > 0) {
        const pubCards = topPubs.map(p => {
          const pTitle = pubLang === 'he' ? (p.title_he || p.title_ru) : pubLang === 'en' ? (p.title_en || p.title_ru) : p.title_ru;
          const subUrl = siteUrl + '/subscribe?pub=' + p.id + '&lang=' + pubLang;
          return '<td style="width:33%;padding:4px;text-align:center;vertical-align:top;">' +
            '<a href="' + subUrl + '" style="text-decoration:none;color:#1e40af;">' +
            (p.thumbnail_url ? '<img src="' + p.thumbnail_url + '" alt="" style="width:80px;height:100px;object-fit:cover;border-radius:6px;margin-bottom:6px;" />' : '') +
            '<br/><span style="font-size:12px;color:#374151;">' + (pTitle || '').substring(0, 30) + '</span>' +
            '</a></td>';
        }).join('');

        const recTitle: Record<Lang, string> = {
          ru: 'Рекомендуем также подписаться:',
          en: 'You may also like:',
          he: ':אולי יעניין אותך גם',
          uk: 'Рекомендуємо також підписатися:',
        };

        popularPubsHtml = '<div style="margin-top:24px;padding-top:20px;border-top:1px solid #e5e7eb;">' +
          '<p style="font-size:14px;color:#6b7280;margin:0 0 12px;">' + recTitle[pubLang] + '</p>' +
          '<table width="100%" cellpadding="0" cellspacing="0"><tr>' + pubCards + '</tr></table></div>';
      }
    }

    let sent = 0; let failed = 0;

    for (const sub of targetSubscribers) {
      // Язык письма = язык публикации (не подписчика)
      const emailData = newIssueEmail(pubLang, sub.email, localPubTitle, issue_title, downloadUrl, docUrl);
      // Добавить популярные публикации в конец письма
      let html = emailData.html;
      if (popularPubsHtml) {
        html = html.replace('</td></tr>\n        <!-- Footer -->', popularPubsHtml + '</td></tr>\n        <!-- Footer -->');
      }

      const result = await sendEmail(sub.email, emailData.subject, html);
      if (result.success) sent++; else failed++;
      await new Promise(r => setTimeout(r, 300));
    }

    return NextResponse.json({ success: true, total: targetSubscribers.length, sent, failed });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
