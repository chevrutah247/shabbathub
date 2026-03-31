'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { useLang } from '@/lib/language-context';
import { t } from '@/lib/translations';
import ContactFormModal from './ContactFormModal';

export default function FloatingContactSticker() {
  const lang = useLang();
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const sticker = (
    <>
      <button
        onClick={() => setOpen(true)}
        title={t('contact.tooltip', lang)}
        aria-label={t('contact.tooltip', lang)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
        }}
        className="group"
      >
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ring-2 ring-white ring-offset-2 ring-offset-transparent">
          {!imgError ? (
            <Image
              src="/images/stickers/contact_sticker.png"
              alt={t('contact.tooltip', lang)}
              width={128}
              height={128}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-primary-600 flex items-center justify-center">
              <MessageCircle size={28} className="text-white" />
            </div>
          )}
        </div>

        {/* Tooltip */}
        <span className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {t('contact.tooltip', lang)}
        </span>
      </button>

      <ContactFormModal open={open} onClose={() => setOpen(false)} />
    </>
  );

  // Portal to document.body to avoid any parent transform/filter breaking fixed positioning
  if (mounted) {
    return createPortal(sticker, document.body);
  }
  return null;
}
