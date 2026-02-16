'use client';

import { useState, useEffect } from 'react';
import { X, Bell } from 'lucide-react';
import SubscribeForm from '@/components/SubscribeForm';
import { useLanguage } from '@/lib/language-context';
import { t } from '@/lib/translations';

export default function SubscribePopup() {
  const { lang } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('shabbathub-sub-dismissed');
    if (dismissed) return;

    const timer = setTimeout(() => {
      setShow(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem('shabbathub-sub-dismissed', 'true');
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
