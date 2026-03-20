/**
 * Tag system for ShabbatHub publications.
 * Tags are stored in the publications.tags TEXT[] column in the database.
 * This file provides display names and ordering.
 */

export const tagNames: Record<string, Record<string, string>> = {
  parsha:    { ru: 'Недельная глава', en: 'Weekly Parsha', he: 'פרשת השבוע', uk: 'Тижнева глава' },
  chassidut: { ru: 'Хасидут',        en: 'Chassidut',     he: 'חסידות',      uk: 'Хасидут' },
  halacha:   { ru: 'Галаха',         en: 'Halacha',       he: 'הלכה',        uk: 'Галаха' },
  stories:   { ru: 'Истории',        en: 'Stories',       he: 'סיפורים',     uk: 'Історії' },
  kids:      { ru: 'Детям',          en: 'For Kids',      he: 'לילדים',      uk: 'Дітям' },
  moshiach:  { ru: 'Мошиах',         en: 'Moshiach',      he: 'משיח',        uk: 'Мошіах' },
  mussar:    { ru: 'Мусар',          en: 'Mussar',        he: 'מוסר',        uk: 'Мусар' },
  rebbe:     { ru: 'Учение Ребе',    en: 'The Rebbe',     he: 'הרבי',        uk: 'Вчення Ребе' },
  emunah:    { ru: 'Эмуна',         en: 'Emunah',        he: 'אמונה',       uk: 'Емуна' },
  community: { ru: 'Газеты',         en: 'Community',     he: 'קהילה',       uk: 'Газети' },
  kabbalah:  { ru: 'Каббала',        en: 'Kabbalah',      he: 'קבלה',        uk: 'Кабала' },
  youth:     { ru: 'Для подростков', en: 'For Youth',     he: 'לנוער',       uk: 'Для підлітків' },
  other:     { ru: 'Другое',         en: 'Other',        he: 'אחר',        uk: 'Інше' },
}

export const orderedTags = [
  'parsha', 'chassidut', 'rebbe', 'mussar', 'halacha',
  'stories', 'emunah', 'moshiach', 'community', 'kabbalah',
  'kids', 'youth', 'other',
] as const

export type TagSlug = typeof orderedTags[number]

/** Get localized tag name */
export function getTagName(tag: string, lang: string): string {
  return tagNames[tag]?.[lang] || tagNames[tag]?.en || tag
}

// ── Backward compatibility ──
// Old category system mapped to new tags
export const categoryNames = tagNames
export const orderedCategories = orderedTags

export function getPublicationIdsForCategory(_category: string): string[] {
  return [] // Tags are now in the database, no UUID mapping needed
}

export function getCategoryForPublication(_pubId: string): string | null {
  return null // Use publication.tags instead
}
