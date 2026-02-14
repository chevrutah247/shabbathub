'use client';

import Link from 'next/link';

export default function DocumentError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-center">
      <div className="text-5xl mb-4">📄</div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Документ не найден</h2>
      <p className="text-gray-600 mb-6">Возможно, документ был удалён или ссылка недействительна.</p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Попробовать снова
        </button>
        <Link
          href="/catalog"
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          В каталог
        </Link>
      </div>
    </div>
  );
}
