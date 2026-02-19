'use client';

import { useMemo, useState } from 'react';

type ArchiveTab = 'rebbe-house' | 'ohel' | 'rebbe-office';

type ArchiveItem = {
  src: string;
  alt: string;
};

const tabLabels: Record<ArchiveTab, string> = {
  'rebbe-house': 'Дом Ребе',
  ohel: 'Огел',
  'rebbe-office': 'Кабинет Ребе',
};

function buildItems(prefix: string, count: number, label: string): ArchiveItem[] {
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return {
      src: `/images/rebbe-archive/${prefix}/${prefix}-${n}.jpg`,
      alt: `${label} - фото ${i + 1}`,
    };
  });
}

const archivePhotos: Record<ArchiveTab, ArchiveItem[]> = {
  'rebbe-house': buildItems('house', 18, 'Дом Ребе'),
  ohel: buildItems('ohel', 24, 'Огел'),
  'rebbe-office': buildItems('office', 18, 'Кабинет Ребе'),
};

export default function RebbeArchivePage() {
  const [activeTab, setActiveTab] = useState<ArchiveTab>('rebbe-house');
  const photos = useMemo(() => archivePhotos[activeTab] || [], [activeTab]);

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

      <section>
        <h2 className="text-xl font-medium text-gray-900 mb-4">{tabLabels[activeTab]}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {photos.map((photo, idx) => (
            <figure key={photo.src + idx} className="bg-white border rounded-xl overflow-hidden shadow-sm">
              <img src={photo.src} alt={photo.alt} className="w-full h-64 object-cover" loading="lazy" />
              <figcaption className="px-3 py-2 text-sm text-gray-600">{photo.alt}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
