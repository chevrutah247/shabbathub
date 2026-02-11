'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SubscribeForm from '@/components/SubscribeForm';

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-md mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8">
          <ArrowLeft size={18} />
          На главную
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <SubscribeForm />
        </div>
      </div>
    </div>
  );
}
