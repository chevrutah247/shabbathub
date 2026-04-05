'use client';

import { useState, useMemo } from 'react';
import { articles } from '@/data/articles';
import Link from 'next/link';

export default function ArticlesAdmin() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const tags = useMemo(() => {
    const all = new Set(articles.map(a => a.tag.ru));
    return Array.from(all).sort();
  }, []);

  const filtered = useMemo(() => {
    return articles.filter(a => {
      const matchesTag = !selectedTag || a.tag.ru === selectedTag;
      const matchesSearch = !search ||
        a.title.ru.toLowerCase().includes(search.toLowerCase()) ||
        a.title.en.toLowerCase().includes(search.toLowerCase()) ||
        a.id.toLowerCase().includes(search.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [selectedTag, search]);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const a of articles) {
      counts[a.tag.ru] = (counts[a.tag.ru] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Статьи</h1>
          <p style={{ color: '#6b7280', fontSize: 14, margin: '4px 0 0' }}>
            Всего: {articles.length} статей · Показано: {filtered.length}
          </p>
        </div>
        <Link
          href="/admin"
          style={{ padding: '8px 16px', background: '#f3f4f6', borderRadius: 8, color: '#374151', textDecoration: 'none', fontSize: 13 }}
        >
          ← Админ-панель
        </Link>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Поиск по названию или ID..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%', padding: '10px 16px', borderRadius: 10,
          border: '1px solid #d1d5db', fontSize: 15, marginBottom: 16,
          outline: 'none',
        }}
      />

      {/* Tag filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        <button
          onClick={() => setSelectedTag(null)}
          style={{
            padding: '6px 14px', borderRadius: 20, border: !selectedTag ? '2px solid #1d4ed8' : '1px solid #d1d5db',
            background: !selectedTag ? '#1d4ed8' : '#fff', color: !selectedTag ? '#fff' : '#374151',
            fontWeight: !selectedTag ? 700 : 400, cursor: 'pointer', fontSize: 13,
          }}
        >
          Все ({articles.length})
        </button>
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            style={{
              padding: '6px 14px', borderRadius: 20,
              border: selectedTag === tag ? '2px solid #92400e' : '1px solid #d1d5db',
              background: selectedTag === tag ? '#92400e' : '#fff',
              color: selectedTag === tag ? '#fff' : '#374151',
              fontWeight: selectedTag === tag ? 700 : 400,
              cursor: 'pointer', fontSize: 13,
            }}
          >
            {tag} ({tagCounts[tag] || 0})
          </button>
        ))}
      </div>

      {/* Articles list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map((article, idx) => (
          <div
            key={article.id}
            style={{
              border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden',
              background: '#fff',
            }}
          >
            {/* Row header */}
            <div
              style={{
                padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12,
                cursor: 'pointer', background: expandedId === article.id ? '#fefce8' : '#fff',
              }}
              onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
            >
              {/* Number */}
              <span style={{ color: '#9ca3af', fontSize: 12, minWidth: 30, textAlign: 'right' }}>
                {idx + 1}
              </span>

              {/* Image */}
              {article.image ? (
                <img
                  src={article.image}
                  alt=""
                  style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
                />
              ) : (
                <div style={{
                  width: 48, height: 48, borderRadius: 8, background: '#f3f4f6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#d1d5db', fontSize: 20, flexShrink: 0,
                }}>
                  📄
                </div>
              )}

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {article.title.ru}
                </div>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                  {article.id} · {article.createdAt}
                </div>
              </div>

              {/* Tag */}
              <span style={{
                padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600,
                background: '#f3f4f6', color: '#6b7280', whiteSpace: 'nowrap',
              }}>
                {article.tag.ru}
              </span>

              {/* Image status */}
              <span style={{ fontSize: 16 }}>
                {article.image ? '🖼️' : '⚠️'}
              </span>

              {/* Expand arrow */}
              <span style={{ color: '#9ca3af', fontSize: 18 }}>
                {expandedId === article.id ? '▲' : '▼'}
              </span>
            </div>

            {/* Expanded content */}
            {expandedId === article.id && (
              <div style={{ borderTop: '1px solid #e5e7eb', padding: 16 }}>
                {/* Titles */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase' }}>Заголовок RU</label>
                    <p style={{ fontSize: 14, fontWeight: 600, margin: '4px 0 0' }}>{article.title.ru}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase' }}>Title EN</label>
                    <p style={{ fontSize: 14, fontWeight: 600, margin: '4px 0 0' }}>{article.title.en}</p>
                  </div>
                </div>

                {/* Subtitles */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase' }}>Подзаголовок RU</label>
                    <p style={{ fontSize: 13, color: '#6b7280', margin: '4px 0 0' }}>{article.subtitle.ru}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase' }}>Subtitle EN</label>
                    <p style={{ fontSize: 13, color: '#6b7280', margin: '4px 0 0' }}>{article.subtitle.en}</p>
                  </div>
                </div>

                {/* Meta */}
                <div style={{
                  display: 'flex', gap: 16, marginBottom: 16, padding: '8px 12px',
                  background: '#f9fafb', borderRadius: 8, fontSize: 12, color: '#6b7280',
                }}>
                  <span><strong>ID:</strong> {article.id}</span>
                  <span><strong>Slug:</strong> {article.slug}</span>
                  <span><strong>Дата:</strong> {article.createdAt}</span>
                  <span><strong>Тег:</strong> {article.tag.ru} / {article.tag.en}</span>
                  <span><strong>Картинка:</strong> {article.image || 'нет'}</span>
                </div>

                {/* Content preview */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase' }}>Контент RU</label>
                    <div
                      style={{
                        fontSize: 13, lineHeight: 1.6, color: '#374151', marginTop: 8,
                        maxHeight: 400, overflow: 'auto', padding: 12,
                        background: '#fafafa', borderRadius: 8, border: '1px solid #e5e7eb',
                      }}
                      dangerouslySetInnerHTML={{ __html: article.content.ru }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase' }}>Content EN</label>
                    <div
                      style={{
                        fontSize: 13, lineHeight: 1.6, color: '#374151', marginTop: 8,
                        maxHeight: 400, overflow: 'auto', padding: 12,
                        background: '#fafafa', borderRadius: 8, border: '1px solid #e5e7eb',
                      }}
                      dangerouslySetInnerHTML={{ __html: article.content.en }}
                    />
                  </div>
                </div>

                {/* Link to article */}
                <div style={{ marginTop: 12 }}>
                  <a
                    href={`/articles/${article.slug}`}
                    target="_blank"
                    style={{ fontSize: 13, color: '#2563eb', textDecoration: 'underline' }}
                  >
                    Открыть статью на сайте →
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: '#9ca3af', padding: 40 }}>Статей не найдено</p>
      )}
    </div>
  );
}
