'use client';

import { useState } from 'react';

type ArchiveTab = 'rebbe-house' | 'ohel' | 'rebbe-office';

const tabLabels: Record<ArchiveTab, string> = {
  'rebbe-house': 'Дом Ребе',
  ohel: 'Огел',
  'rebbe-office': 'Кабинет Ребе',
};

export default function RebbeArchivePage() {
  const [activeTab, setActiveTab] = useState<ArchiveTab>('rebbe-house');

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">Архив фотографий</h1>
        <p className="mt-3 text-gray-600">Разделы: Дом Ребе, Огел и Кабинет Ребе.</p>
      </div>

      <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary-700">Вкладки архива</div>
      <div className="flex flex-wrap gap-3 mb-8">
        {(Object.keys(tabLabels) as ArchiveTab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={
              'px-4 py-2 rounded-lg border text-sm md:text-base transition ' +
              (activeTab === tab
                ? 'bg-primary-600 border-primary-600 text-white shadow'
                : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50')
            }
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      <section className="rounded-xl border border-gray-200 bg-gray-50 p-6">
        <h2 className="text-xl font-medium text-gray-900 mb-2">{tabLabels[activeTab]}</h2>
        <p className="text-gray-600">Фотографии в этом разделе временно скрыты.</p>
      </section>
    </main>
  );
}
