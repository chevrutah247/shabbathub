'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import SubscribeForm from './SubscribeForm';

export default function SubscribePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Показываем через 30 секунд если ранее не закрывали
    const dismissed = localStorage.getItem('subscribe_dismissed');
    if (dismissed) return;

    const timer = setTimeout(() => {
      setShow(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem('subscribe_dismissed', '1');
  };

  const handleSuccess = () => {
    setTimeout(() => {
      setShow(false);
      localStorage.setItem('subscribe_dismissed', '1');
    }, 2000);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Оверлей */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      {/* Попап */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <SubscribeForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
