'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import SubscribeForm from '@/components/SubscribeForm';
import { useLanguage } from '@/lib/language-context';
import { t } from '@/lib/translations';

function SubscribeContent() {
  const searchParams = useSearchParams();
  const { lang } = useLanguage();
  const pubId = searchParams.get('pub') || undefined;
  const dir = lang === 'he' ? 'rtl' : 'ltr';

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white" dir={dir}>
      <div className="max-w-md mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8">
          <ArrowLeft size={18} />
          {t('subscribe.backHome', lang)}
        </Link>
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <SubscribeForm preSelectedPubId={pubId} />
        </div>
      </div>
    </div>
  );
}

export default function SubscribePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary-600" size={32} /></div>}>
      <SubscribeContent />
    </Suspense>
  );
}
