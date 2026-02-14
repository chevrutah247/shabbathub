'use client';

import { useState } from 'react';
import { Share2, Check, MessageCircle, Send } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
        title="WhatsApp"
      >
        <MessageCircle size={18} />
      </a>
      <a
        href={`https://t.me/share/url?url=${encoded}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors"
        title="Telegram"
      >
        <Send size={18} />
      </a>
      <button
        onClick={copyLink}
        className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
        title="Скопировать ссылку"
      >
        {copied ? <Check size={18} className="text-green-600" /> : <Share2 size={18} />}
      </button>
    </div>
  );
}
