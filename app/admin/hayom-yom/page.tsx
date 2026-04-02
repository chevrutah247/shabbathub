'use client';

import { useState, useMemo, useEffect } from 'react';
import { hayomYomData } from '@/data/hayom-yom';

const ADMIN_SECRET = 'shabbathub-admin-2026';

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
  const [saving, setSaving] = useState(false);
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());
  const [dbOverrides, setDbOverrides] = useState<Record<string, string>>({});

  // Load DB overrides on mount
  useEffect(() => {
    fetch('/api/admin/hayom-yom')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          const overrides: Record<string, string> = {};
          for (const row of data) {
            overrides[`${row.hebrew_month}-${row.hebrew_day}`] = row.main_text;
          }
          setDbOverrides(overrides);
        }
      })
      .catch(() => {});
  }, []);

  const entries = useMemo(() => {
    const result: { key: string; day: number; header: string; text: string; fromDb: boolean }[] = [];
    for (const [key, val] of Object.entries(hayomYomData)) {
      const [month, dayStr] = key.split('-');
      if (month === selectedMonth) {
        const dbText = dbOverrides[key];
        result.push({
          key,
          day: parseInt(dayStr),
          header: val.header,
          text: dbText || val.text,
          fromDb: !!dbText,
        });
      }
    }
    return result.sort((a, b) => a.day - b.day);
  }, [selectedMonth, dbOverrides]);

  const monthName = months.find(m => m.key === selectedMonth)?.ru || selectedMonth;

  async function handleSave(key: string, header: string) {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/hayom-yom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, text: editText, header, secret: ADMIN_SECRET }),
      });
      const data = await res.json();
      if (data.ok) {
        setSavedKeys(prev => { const n = new Set(Array.from(prev)); n.add(key); return n; });
        setDbOverrides(prev => ({ ...prev, [key]: editText }));
        setEditingKey(null);
      } else {
        alert('Ошибка: ' + (data.error || 'unknown'));
      }
    } catch (e: any) {
      alert('Ошибка сети: ' + e.message);
    }
    setSaving(false);
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#fef3c7', padding: '12px 20px', borderRadius: 12, marginBottom: 24, border: '1px solid #fbbf24' }}>
        <strong>Админ-панель Айом Йом</strong> — редактирование текстов. Нажми «Редактировать» → исправь текст → «Сохранить». Изменения сохраняются в базу данных.
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

      {entries.map(entry => (
        <div
          key={entry.key}
          style={{
            marginBottom: 16,
            border: savedKeys.has(entry.key) ? '2px solid #22c55e' : entry.fromDb ? '2px solid #3b82f6' : '1px solid #e5e7eb',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '10px 16px',
              background: entry.fromDb ? '#eff6ff' : '#f9fafb',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <strong style={{ fontSize: 15 }}>{entry.day} {monthName}</strong>
              <span style={{ color: '#6b7280', marginLeft: 12, fontSize: 13 }}>{entry.header}</span>
              {entry.fromDb && <span style={{ marginLeft: 8, fontSize: 11, color: '#3b82f6', fontWeight: 600 }}>✓ отредактировано</span>}
              {savedKeys.has(entry.key) && <span style={{ marginLeft: 8, fontSize: 11, color: '#22c55e', fontWeight: 600 }}>✓ сохранено</span>}
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
                    border: '2px solid #fbbf24',
                    borderRadius: 8,
                    resize: 'vertical',
                    outline: 'none',
                  }}
                />
                <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => handleSave(entry.key, entry.header)}
                    disabled={saving}
                    style={{
                      padding: '10px 28px',
                      background: saving ? '#9ca3af' : '#22c55e',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      cursor: saving ? 'wait' : 'pointer',
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                  >
                    {saving ? 'Сохраняю...' : '💾 Сохранить'}
                  </button>
                  <button
                    onClick={() => setEditingKey(null)}
                    style={{
                      padding: '10px 20px',
                      background: '#fff',
                      color: '#6b7280',
                      border: '1px solid #d1d5db',
                      borderRadius: 8,
                      cursor: 'pointer',
                    }}
                  >
                    Отмена
                  </button>
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
