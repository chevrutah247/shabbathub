'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ReferralTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (!ref) return;

    // Не считать повторные визиты в одной сессии
    const storageKey = `ref_tracked_${ref}`;
    if (sessionStorage.getItem(storageKey)) return;

    async function trackReferral() {
      try {
        await supabase.from('referrals').insert({
          referrer_id: ref,
        });
        sessionStorage.setItem(storageKey, '1');
      } catch (err) {
        console.error('Referral tracking error:', err);
      }
    }

    trackReferral();
  }, [searchParams]);

  return null;
}
