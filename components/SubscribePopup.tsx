'use client';

import { useState, useEffect } from 'react';
import { X, Bell } from 'lucide-react';
import SubscribeForm from '@/components/SubscribeForm';
import { useLanguage } from '@/lib/language-context';
import { t } from '@/lib/translations';
import { trackEvent } from '@/lib/analytics';

const DISMISS_UNTIL_KEY = 'shabbathub-sub-dismiss-until';
const SESSION_VIEWS_KEY = 'shabbathub-content-views';
const SESSION_SHOWN_KEY = 'shabbathub-sub-shown';
const AB_VARIANT_KEY = 'shabbathub-sub-ab-variant';
const TRACK_SOURCE_KEY = 'shabbathub-sub-source';
const TRACK_VARIANT_KEY = 'shabbathub-sub-variant';

export default function SubscribePopup() {
  const { lang } = useLanguage();
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState<'timer' | 'intent'>('intent');

  useEffect(() => {
    const dismissedUntil = Number(localStorage.getItem(DISMISS_UNTIL_KEY) || '0');
    if (dismissedUntil > Date.now()) return;
    if (sessionStorage.getItem(SESSION_SHOWN_KEY) === '1') return;

    const path = window.location.pathname;
    const isContentPage = path.startsWith('/document/') || path.startsWith('/publication/');
    let views = Number(sessionStorage.getItem(SESSION_VIEWS_KEY) || '0');
    if (isContentPage) {
      views += 1;
      sessionStorage.setItem(SESSION_VIEWS_KEY, String(views));
    }

    let chosen = localStorage.getItem(AB_VARIANT_KEY) as 'timer' | 'intent' | null;
    if (!chosen) {
      chosen = Math.random() < 0.5 ? 'timer' : 'intent';
      localStorage.setItem(AB_VARIANT_KEY, chosen);
    }
    setVariant(chosen);
    const delay = chosen === 'timer' ? 25000 : views >= 2 ? 8000 : isContentPage ? 12000 : 18000;
    const timer = setTimeout(() => setShow(true), delay);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!show) return;
    sessionStorage.setItem(TRACK_SOURCE_KEY, 'popup');
    sessionStorage.setItem(TRACK_VARIANT_KEY, variant);
    trackEvent('subscribe_popup_shown', { variant });
  }, [show, variant]);

  const handleClose = () => {
    setShow(false);
    const twoWeeksMs = 14 * 24 * 60 * 60 * 1000;
    localStorage.setItem(DISMISS_UNTIL_KEY, String(Date.now() + twoWeeksMs));
    sessionStorage.setItem(SESSION_SHOWN_KEY, '1');
    trackEvent('subscribe_popup_close', { variant });
  };

  if (!show) return null;

  const dir = lang === 'he' ? 'rtl' : 'ltr';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4" dir={dir}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 my-auto animate-slide-up">
        <button onClick={handleClose} className={'absolute top-4 text-gray-400 hover:text-gray-600 ' + (lang === 'he' ? 'left-4' : 'right-4')}>
          <X size={20} />
        </button>

        <div className="text-center mb-4">
          <Bell className="mx-auto text-amber-500 mb-2" size={28} />
          <h3 className="text-lg font-bold text-gray-900">{t('subscribe.popupTitle', lang)}</h3>
          <p className="text-sm text-gray-500">{t('subscribe.popupDesc', lang)}</p>
        </div>

        <SubscribeForm compact onSuccess={() => setTimeout(handleClose, 2000)} />
      </div>
    </div>
  );
}
