'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, FileText, Calendar, ExternalLink, ChevronDown } from 'lucide-react';
import documentsData from '@/data/documents.json';

interface Document {
  id: string;
  title: string;
  description: string;
  category: string;
  parasha: string;
  language: string;
  date: string;
  pdfUrl: string;
  pages: number;
}

const languageFlags: Record<string, string> = {
  ru: '🇷🇺',
  he: '🇮🇱',
  en: '🇺🇸',
};

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedParasha, setSelectedParasha] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  const documents = documentsData.documents as Document[];
  const categories = documentsData.categories;
  const parashiot = documentsData.parashiot;

  // Фильтрация
  let filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesParasha = selectedParasha === 'all' || doc.parasha === selectedParasha;
    const matchesLanguage = selectedLanguage === 'all' || doc.language === selectedLanguage;
    
    return matchesSearch && matchesCategory && matchesParasha && matchesLanguage;
  });

  // Сортировка
  filteredDocs = filteredDocs.sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-primary-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Каталог материалов
          </h1>
          <p className="text-blue-200 text-lg">
            {documents.length} материалов в архиве
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-primary-600" />
            <span className="font-semibold text-gray-700">Фильтры</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск по названию..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
            </div>

            {/* Category */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:border-primary-500 bg-white"
              >
                <option value="all">Все категории</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Parasha */}
            <div className="relative">
              <select
                value={selectedParasha}
                onChange={(e) => setSelectedParasha(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:border-primary-500 bg-white"
              >
                <option value="all">Все недельные главы</option>
                {parashiot.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:border-primary-500 bg-white"
              >
                <option value="date-desc">Сначала новые</option>
                <option value="date-asc">Сначала старые</option>
                <option value="title">По алфавиту</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 text-gray-600">
          Найдено: <span className="font-semibold text-gray-900">{filteredDocs.length}</span> материалов
        </div>

        {/* Documents Grid */}
        {filteredDocs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDocs.map((doc) => (
              <article
                key={doc.id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[8.5/6] bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText size={40} className="text-gray-400" />
                  </div>
                  
                  <div className="absolute inset-0 bg-primary-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link
                      href={doc.pdfUrl}
                      target="_blank"
                      className="flex items-center gap-2 bg-white text-primary-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gold-400 transition-colors"
                    >
                      <ExternalLink size={16} />
                      Открыть
                    </Link>
                  </div>

                  <div className="absolute top-2 right-2 text-lg">
                    {languageFlags[doc.language]}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  {doc.parasha && (
                    <span className="inline-block px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-medium mb-2">
                      {doc.parasha}
                    </span>
                  )}
                  
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-primary-700 transition-colors">
                    {doc.title}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar size={12} />
                    {new Date(doc.date).toLocaleDateString('ru-RU')}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Материалы не найдены</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedParasha('all');
              }}
              className="mt-4 text-primary-600 hover:text-primary-800 font-medium"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
