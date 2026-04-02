'use client';

import { useState, useMemo } from 'react';
import { hayomYomData } from '@/data/hayom-yom';

const months = [
  { key: 'Tishrei', ru: 'Тишрей' },
  { key: 'Cheshvan', ru: 'Хешван' },
  { key: 'Kislev', ru: 'Кислев' },
  { key: 'Tevet', ru: 'Тевет' },
  { key: 'Shevat', ru: 'Шват' },
  { key: 'Adar I', ru: 'Адар' },
  { key: 'Nisan', ru: 'Нисан' },
  { key: 'Iyyar', ru: 'Ияр' },
  { key: 'Sivan', ru: 'Сиван' },
  { key: 'Tammuz', ru: 'Тамуз' },
  { key: 'Av', ru: 'Ав' },
  { key: 'Elul', ru: 'Элул' },
];

export default function HayomYomAdmin() {
  const [selectedMonth, setSelectedMonth] = useState('Nisan');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const entries = useMemo(() => {
    const result: { key: string; day: number; header: string; text: string }[] = [];
    for (const [key, val] of Object.entries(hayomYomData)) {
      const [month, dayStr] = key.split('-');
      if (month === selectedMonth) {
        result.push({ key, day: parseInt(dayStr), header: val.header, text: val.text });
      }
    }
    return result.sort((a, b) => a.day - b.day);
  }, [selectedMonth]);

  const monthName = months.find(m => m.key === selectedMonth)?.ru || selectedMonth;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#fef3c7', padding: '12px 20px', borderRadius: 12, marginBottom: 24, border: '1px solid #fbbf24' }}>
        <strong>Админ-панель Айом Йом</strong> — только для проверки и редактирования текстов. Эта страница не видна обычным пользователям.
      </div>

      {/* Month selector */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        {months.map(m => (
          <button
            key={m.key}
            onClick={() => { setSelectedMonth(m.key); setEditingKey(null); }}
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              border: selectedMonth === m.key ? '2px solid #92400e' : '1px solid #d1d5db',
              background: selectedMonth === m.key ? '#92400e' : '#fff',
              color: selectedMonth === m.key ? '#fff' : '#374151',
              fontWeight: selectedMonth === m.key ? 700 : 400,
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            {m.ru}
          </button>
        ))}
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
        {monthName} — {entries.length} дней
      </h2>

      {/* Entries list */}
      {entries.map(entry => (
        <div
          key={entry.key}
          style={{
            marginBottom: 16,
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '10px 16px',
              background: '#f9fafb',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <strong style={{ fontSize: 15 }}>{entry.day} {monthName}</strong>
              <span style={{ color: '#6b7280', marginLeft: 12, fontSize: 13 }}>{entry.header}</span>
            </div>
            <button
              onClick={() => {
                if (editingKey === entry.key) {
                  setEditingKey(null);
                } else {
                  setEditingKey(entry.key);
                  setEditText(entry.text);
                }
              }}
              style={{
                padding: '4px 12px',
                borderRadius: 6,
                border: '1px solid #d1d5db',
                background: editingKey === entry.key ? '#fbbf24' : '#fff',
                cursor: 'pointer',
                fontSize: 12,
              }}
            >
              {editingKey === entry.key ? 'Закрыть' : 'Редактировать'}
            </button>
          </div>

          {/* Text */}
          <div style={{ padding: 16 }}>
            {editingKey === entry.key ? (
              <div>
                <textarea
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: 300,
                    padding: 12,
                    fontFamily: 'Georgia, serif',
                    fontSize: 14,
                    lineHeight: 1.8,
                    border: '1px solid #d1d5db',
                    borderRadius: 8,
                    resize: 'vertical',
                  }}
                />
                <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `KEY: ${entry.key}\n\n${editText}`
                      );
                      alert('Скопировано в буфер! Отправь текст для обновления.');
                    }}
                    style={{
                      padding: '8px 20px',
                      background: '#92400e',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    Копировать исправленный текст
                  </button>
                  <span style={{ color: '#6b7280', fontSize: 12, alignSelf: 'center' }}>
                    После редактирования скопируй текст и отправь мне для обновления на сайте
                  </span>
                </div>
              </div>
            ) : (
              <div
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: '#1f2937',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {entry.text}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
