'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MessageCircle, Send, Users, Globe, Plus, MapPin } from 'lucide-react';

interface TorahGroup {
  id: string;
  name: string;
  platform: string;
  link: string;
  description?: string;
  language?: string;
  adminContact?: string;
  adminContactType?: string;
}

type PlaceCategory = 'synagogues' | 'mikvahs' | 'batei-midrash';

interface PlaceItem {
  name: string;
  area: string;
  note: string;
  link?: string;
}

const languages = [
  { id: 'all', name: 'Все', flag: '🌍' },
  { id: 'russian', name: 'Русский', flag: '🇷🇺' },
  { id: 'hebrew', name: 'Иврит', flag: '🇮🇱' },
  { id: 'english', name: 'English', flag: '🇺🇸' },
];

const platforms = [
  { id: 'all', name: 'Все', icon: Globe },
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle },
  { id: 'telegram', name: 'Telegram', icon: Send },
  { id: 'facebook', name: 'Facebook', icon: Users },
];

const placeTabs: { id: PlaceCategory; label: string }[] = [
  { id: 'synagogues', label: 'Синагоги Crown Heights' },
  { id: 'mikvahs', label: 'Миквы' },
  { id: 'batei-midrash', label: 'Бейт мидраши' },
];

const placesByCategory: Record<PlaceCategory, PlaceItem[]> = {
  synagogues: [
    { name: '770 Eastern Parkway', area: 'Crown Heights', note: 'Центральная синагога и место молитвы.' },
    { name: 'Local Neighborhood Shul', area: 'Crown Heights', note: 'Добавьте адрес и контакт раввина.' },
    { name: 'Community Minyan', area: 'Crown Heights', note: 'Добавьте расписание шихурим и миньянов.' },
  ],
  mikvahs: [
    { name: 'Mikvah.org', area: 'Worldwide', note: 'Глобальный каталог микв — найдите микву в любом городе мира.', link: 'https://www.mikvah.org' },
    { name: "Women's Mikvah", area: 'Crown Heights', note: 'Добавьте часы работы и номер для записи.' },
    { name: "Men's Mikvah", area: 'Crown Heights', note: 'Добавьте точный адрес и время открытия.' },
  ],
  'batei-midrash': [
    { name: 'Beit Midrash - Main', area: 'Crown Heights', note: 'Добавьте расписание уроков и язык.' },
    { name: 'Evening Learning Hall', area: 'Crown Heights', note: 'Добавьте контакт координатора.' },
    { name: 'Shiurim Center', area: 'Brooklyn', note: 'Добавьте адрес и формат занятий.' },
  ],
};

export default function TorahGroupsPage() {
  const [groups, setGroups] = useState<TorahGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlaceTab, setSelectedPlaceTab] = useState<PlaceCategory>('synagogues');

  useEffect(() => {
    fetch('/api/groups')
      .then(r => r.json())
      .then(data => { setGroups(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filteredGroups = groups.filter(group => {
    if (selectedLanguage !== 'all' && group.language !== selectedLanguage) return false;
    if (selectedPlatform !== 'all' && group.platform !== selectedPlatform) return false;
    if (searchQuery && !group.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'whatsapp': return 'bg-green-500';
      case 'telegram': return 'bg-blue-500';
      case 'facebook': return 'bg-indigo-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-900 mb-2">📚 Изучение Торы</h1>
          <p className="text-gray-600 text-lg">Группы для изучения Торы в WhatsApp, Telegram и Facebook</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <a href="https://edonthego.org" target="_blank" rel="noopener noreferrer"
            className="block p-6 bg-gradient-to-br from-purple-900 to-indigo-800 rounded-2xl text-white hover:shadow-xl transition-all">
            <h3 className="text-xl font-bold mb-2">📰 Chevrutah 24x7</h3>
            <p className="text-purple-100 text-sm mb-3">Еженедельная газета на русском + версия для детей</p>
            <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm">Подписаться →</span>
          </a>
          <a href="https://kidschitas.org" target="_blank" rel="noopener noreferrer"
            className="block p-6 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl text-white hover:shadow-xl transition-all">
            <h3 className="text-xl font-bold mb-2">📖 Chitas for Kids</h3>
            <p className="text-pink-100 text-sm mb-3">Ежедневные уроки Торы для детей — аудио и раскраски</p>
            <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm">Подписаться →</span>
          </a>
        </div>

        <section className="bg-white rounded-2xl p-6 shadow-sm mb-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-primary-900 mb-2">Crown Heights Directory</h2>
          <p className="text-gray-600 mb-4">Синагоги, миквы и бейт мидраши в одном месте.</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {placeTabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedPlaceTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${selectedPlaceTab === tab.id ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {selectedPlaceTab === 'mikvahs' && (
            <a
              href="https://www.mikvah.org"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full mb-4 rounded-xl border-2 border-blue-300 bg-blue-50 p-5 text-center hover:bg-blue-100 transition"
            >
              <span className="text-xl font-bold text-blue-800">Mikvah.org</span>
              <span className="block text-sm text-blue-600 mt-1">Глобальный каталог микв — найдите микву в любом городе мира</span>
            </a>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {placesByCategory[selectedPlaceTab].filter(p => !p.link).map((place, idx) => (
              <article key={place.name + idx} className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-2">{place.name}</h3>
                <p className="text-sm text-gray-700 mb-2 inline-flex items-center gap-1"><MapPin size={14} />{place.area}</p>
                <p className="text-sm text-gray-600">{place.note}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" placeholder="Поиск группы..." value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
            </div>
            <div className="flex flex-wrap gap-2">
              {languages.map(lang => (
                <button key={lang.id} onClick={() => setSelectedLanguage(lang.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedLanguage === lang.id ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {lang.flag} {lang.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {platforms.map(plat => {
              const Icon = plat.icon;
              return (
                <button key={plat.id} onClick={() => setSelectedPlatform(plat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedPlatform === plat.id ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  <Icon size={16} /> {plat.name}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-500">Загрузка...</p>
          </div>
        ) : filteredGroups.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{groups.length === 0 ? 'Группы скоро появятся!' : 'Ничего не найдено'}</h3>
            <p className="text-gray-500 mb-6">{groups.length === 0 ? 'Станьте первым — добавьте группу!' : 'Попробуйте другие фильтры'}</p>
            <Link href="/suggest-group" className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-green-600">
              <Plus size={20} /> Добавить группу
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGroups.map(group => (
              <div key={group.id} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-gray-900">{group.name}</h3>
                  <span className={`${getPlatformColor(group.platform)} text-white text-xs px-2 py-1 rounded-full`}>{group.platform}</span>
                </div>
                {group.description && <p className="text-gray-600 text-sm mb-3 line-clamp-2">{group.description}</p>}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {languages.find(l => l.id === group.language)?.flag || '🌍'} {group.language || 'Русский'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <a href={group.link} target="_blank" rel="noopener noreferrer"
                    className="flex-1 text-center bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700">
                    Присоединиться
                  </a>
                  {group.adminContact && (
                    <a href={group.adminContactType === 'whatsapp' ? `https://wa.me/${group.adminContact.replace(/\D/g, '')}` : group.adminContactType === 'telegram' ? `https://t.me/${group.adminContact.replace('@', '')}` : `mailto:${group.adminContact}`}
                      target="_blank" rel="noopener noreferrer"
                      className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200" title="Связаться с админом">👤</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-dashed border-blue-200">
          <h3 className="text-xl font-bold text-primary-900 mb-2">Знаете хорошую группу?</h3>
          <p className="text-gray-600 mb-4">Поделитесь с сообществом!</p>
          <Link href="/suggest-group" className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-green-600">
            <Plus size={20} /> Добавить группу
          </Link>
        </div>
      </div>
    </div>
  );
}
