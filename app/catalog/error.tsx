'use client';

export default function CatalogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center">
        <div className="text-5xl mb-4">📚</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Не удалось загрузить каталог</h2>
        <p className="text-gray-600 mb-6">Проверьте подключение к интернету и попробуйте снова.</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Обновить
        </button>
      </div>
    </div>
  );
}
