import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Lang } from '@/lib/language-context';
import { weeklyDigestEmail } from '@/lib/email-templates';
import { requireCronSecret } from '@/lib/api-auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = 'ShabbatHub <noreply@shabbathub.com>';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type SubscriptionRow = {
  email: string;
  language: Lang;
  subscribe_news?: boolean;
  publication_ids?: string[] | null;
  is_active: boolean;
};

type IssueRow = {
  id: string;
  title: string;
  publication_id: string;
  created_at: string;
  publications?: { title_ru?: string | null; title_en?: string | null; title_he?: string | null } | null;
};

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) return { success: false, error: 'No API key' };
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM_EMAIL, to: [to], subject, html }),
    });
    if (!res.ok) {
      const err = await res.json();
      return { success: false, error: err.message || 'send_failed' };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'send_failed' };
  }
}

function uniqueById(items: IssueRow[]) {
  const map = new Map<string, IssueRow>();
  for (const item of items) {
    if (!map.has(item.id)) map.set(item.id, item);
  }
  return Array.from(map.values());
}

export async function GET(request: NextRequest) {
  const denied = requireCronSecret(request);
  if (denied) return denied;

  try {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data: subscriptions, error: subsError } = await supabase
      .from('subscriptions')
      .select('email, language, subscribe_news, publication_ids, is_active')
      .eq('is_active', true);

    if (subsError) {
      return NextResponse.json({ error: 'Failed to load subscriptions' }, { status: 500 });
    }

    const { data: freshIssues, error: issuesError } = await supabase
      .from('issues')
      .select('id, title, publication_id, created_at, publications(title_ru, title_en, title_he)')
      .eq('is_active', true)
      .gte('created_at', weekAgo)
      .order('created_at', { ascending: false })
      .limit(1000);

    if (issuesError) {
      return NextResponse.json({ error: 'Failed to load issues' }, { status: 500 });
    }

    const allIssues: IssueRow[] = Array.isArray(freshIssues) ? (freshIssues as any) : [];
    if (allIssues.length === 0) {
      return NextResponse.json({ success: true, sent: 0, skipped: 0, reason: 'No issues in last 7 days' });
    }

    let sent = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const sub of (subscriptions || []) as SubscriptionRow[]) {
      const lang: Lang = ['ru', 'en', 'he', 'uk'].includes(sub.language) ? sub.language : 'ru';
      const wantsNews = sub.subscribe_news !== false;
      const pubIds = Array.isArray(sub.publication_ids) ? sub.publication_ids : [];

      let selected: IssueRow[] = [];
      if (wantsNews) {
        selected = selected.concat(allIssues.slice(0, 6));
      }
      if (pubIds.length > 0) {
        selected = selected.concat(allIssues.filter((item) => pubIds.includes(item.publication_id)).slice(0, 8));
      }

      selected = uniqueById(selected)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 8);

      if (selected.length === 0) {
        skipped++;
        continue;
      }

      const digestItems = selected.map((item) => ({
        id: item.id,
        title: item.title,
        publicationTitle:
          item.publications?.title_ru || item.publications?.title_en || item.publications?.title_he || 'ShabbatHub',
        createdAt: item.created_at,
      }));

      const { subject, html } = weeklyDigestEmail(lang, sub.email, digestItems);
      const result = await sendEmail(sub.email, subject, html);
      if (result.success) sent++;
      else errors.push(result.error || 'send_failed');

      await new Promise((r) => setTimeout(r, 250));
    }

    return NextResponse.json({
      success: true,
      total_subscribers: (subscriptions || []).length,
      sent,
      skipped,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed' }, { status: 500 });
  }
}

