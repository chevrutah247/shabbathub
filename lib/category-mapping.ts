/**
 * Hardcoded mapping of publication categories.
 * Since the DB has no category field, we map publication UUIDs to category slugs.
 */

export const categoryPublicationMap: Record<string, string[]> = {
  stories: [
    '7ac6f70a-a91c-45d5-9aab-79a3dafba5ba', // Heartwarming Stories
    '6dc82f9e-9427-4d2c-bbce-51ad63755b5d', // Here's My Story
    '5ee5549b-953a-47bb-a7ec-7bb88befb001', // Yerachmiel Tilles Story
    '4d8d6e8b-f7e7-4a0a-9290-b78bac154b8a', // HASHGACHAH PRATIS
    '61b802e1-47f2-48bb-9c46-794db6b671a8', // Wonders
    '80470273-6237-4a00-8a81-9591f1df97e3', // Наследие
    '9b973112-51eb-41f0-81eb-6b9baf8bb8bb', // Любите делать добро
    '26865a26-b64e-491f-a283-b940292d624b', // Cyber Farbrengens
  ],
  chassidut: [
    '71d92845-571d-4063-8efe-e69aae010136', // Еженедельный хасидут
    'acd678cc-083e-4485-9d35-9ba67831f793', // Ликутей Сихот
    '195dc058-5bee-4f11-84ec-1f2bb4cd9a5d', // МААМАР Любавического Ребе
    '2f80e049-bade-45ce-8226-9beef532dc7c', // Маамар БАТИ ЛЕ-ГАНИ
    'a4f8403d-e8e4-44d8-9152-ec2171477099', // ТАНИЯ Ликутей Амарим
    '61a90a4e-fba2-44a4-bf92-c1316788c589', // Торат Менахем
    'a2fee237-ee7d-4e97-a05f-0574a0b5d88b', // ДЕРХЕР
    '6c9ae8f9-7e74-4e86-b795-a6a7c50f0fcb', // Двар Малхут
    'f6cddaf9-3328-47c0-b421-dd90a2e3f4c2', // זוהר הקדוש
    'd1441062-63e4-4fba-92b1-9a9459f21f1c', // Хитас
    '1602e562-6343-43ae-8317-f9509d209f0f', // מעמקים
    '16ed7c4d-5202-4646-834b-c4517315775d', // אביר יעקב
    'e29b7706-51c2-4faa-ae97-2c3d953a15bb', // LearnChassidus
    '9f605105-8017-4d3a-8e01-4ae0d7c1abe2', // The Weekly Farbrengen
  ],
  halacha: [
    'bcf51168-42c5-4adf-8988-55a64dec7b2d', // РАМБАМ МИШНЕ ТОРА
    'af181067-9bd0-4011-bc65-5046898ed531', // שונה הלכות
    '784f6411-9391-4537-b923-e405dbe9dd1c', // НЕДЕЛЬНАЯ ГЛАВА — ТЕКСТ И СМЫСЛ
    '6b603427-9008-4cc8-bbfe-3cb137dcad43', // Даркей Шалом
    'ff60ef99-c507-4023-858a-f0b13f674d5d', // Путеводитель по Праздникам
    'f2ecb012-106f-42df-aa60-c99fc89ccff8', // ПАРАШАТ АМАН
    '7a508772-c4dc-4dae-be32-fe7ad64c3b64', // Симаним
  ],
  kids: [
    'ea002e48-90d7-4e8b-9551-e63784cf4b88', // Chevrutah KIDS
    '8408d0a6-939c-4504-a881-2dc2d5efa9e1', // ФОРШМАК
  ],
  moshiach: [
    '048eb2eb-26e7-4b0e-b7ee-f357ee37b9f6', // Время Мошиаха
    '471d7577-a2c0-4fb3-9054-cffbc202a55c', // Встречаем Мошиаха Вместе
    'bc7955b3-76be-40c4-b7a1-010ac8596d83', // Сихот а-Геула
  ],
  general: [
    '65beb8c9-e84b-4490-8d7f-5291b95bf24b', // Chevrutah24x7
    '36e61c97-fb28-4f5f-8ae0-1dc97a0ca63c', // АМИ
    '18729da8-c776-4ab7-8f7d-4e65b73ae62e', // Еврейский Журнал
    '4972d30f-2a83-425d-b2c2-9ebc264ad228', // Субботний стол
    'b13c2f01-70ef-47df-9720-0ba53be6e767', // Шабат Шалом
    '1a0634f6-6d01-4e6b-9dcd-9c0067758e7f', // ШАЛОМ
    'fbe9558f-f8a8-4000-8ceb-36c680e98bbf', // Шомрей Шабос
    '2bf69aac-1ceb-473a-bfdc-92a191e8ee84', // לקראת שבת
    'aa738162-9ad5-4f65-aead-717ab2c6ecd2', // מגזין שבועי
    '224f294c-890e-4d93-a8e2-2f3e2ec19ff9', // שבת טיש
    'c4ec0ebe-a89c-4798-94e3-1c47fede4abf', // ערוץ 2000
    'f9344b1e-d8ee-4f90-906e-30a548a48435', // קול ברמה
    '537ec839-c446-47de-8543-b8c1f9207207', // Rebbe Responsa
    'e3659b52-4988-40bd-9f5e-eb13f4372d45', // Другое
    '6026fb6f-540f-498c-90be-c44d1960849a', // הקהל
    'db25ae7b-8657-4239-890b-9217c86c575d', // הדברות
    '628a57c9-f3a4-4075-b113-747058c02fd0', // באר הפרשה
    '93ffcfb3-58e2-4346-bab8-a6d6a19db0a2', // שלח לחמך (Shlach Lachmecha)
    '25670d8f-0b9e-4fef-a2a2-7306f955fa09', // Недельный листок (Weekly Parsha Sheet)
    '72e20438-85aa-4c13-9b2b-b0efe8e559ea', // Наш Голос (Nash Golos)
    'dbb8c484-8a7a-44e7-a63f-90df9c854f30', // Фонд Наследия (Fond Nasledia)
    'dc161e75-5a5a-4fb7-a7d3-2bc4fde623aa', // Torah Tidbits
    '637c25b9-a2e3-4b80-8779-e90edc86abd2', // Bukharian Times
    'd4c66f41-c8bd-43fb-8d48-3aad1efedcda', // СТМЭГИ (STMEGI)
    '38c62555-1a5b-4c90-ade3-73de6d660d4d', // Parsha.net
    'b10973f9-e98c-4293-886f-f31146bb0bdc', // Общинный Вестник (Obshchinniy Vestnik)
  ],
  mussar: [
    '9b08c2bf-17e5-4d73-bb87-f56d451a9e2f', // Беерот Ицхак
    '2f11231b-193e-4baa-833e-46c41b55defb', // Восхождение
    'da19b805-9b11-41a2-a9b5-8f03e46a7ce4', // Имрей Ноам
    'b96a64e9-a2fa-4d8f-9bea-8632bc254e0a', // Колодец Торы
    'cb49a796-e0b1-4b87-97e7-f93f2b7416a2', // Колодец Торы Буклет
    '9fddb3a5-149c-45ba-9d25-f75a026a3aec', // Мааян Хай
    '4a4eb1ab-d8c4-4f2e-b9dc-987fd138ef23', // Месилот
    'c5acca57-4069-44fc-817a-a09ca26cc857', // Свет Торы
    '8a496e02-44a7-419a-b7b7-9eab9a0ec65d', // Рав Э. Шпилер
    '0a7424b7-1f20-43be-a2a0-7b11504e0036', // ЖУРНАЛ "Биркат ЭлиГу"
    '968f6966-b26d-4478-8b37-6e38ab586b4c', // УРОК ПО НЕДЕЛЬНОЙ ГЛАВЕ
    '9a2fe774-dd52-4d46-b43b-5920d7a2d4e6', // הדרך אל החיים
    'ab2eb159-0de6-4590-8572-0ebf03638010', // ובחרת בחיים
    '10a0d4de-6fae-4ac9-8f23-5c423ce30b19', // מסילות
    '39c16c78-caef-4402-84c0-f13b3a2eee43', // Mesilot HaNefesh
    'eb3af85b-8df8-4637-92ac-ed4c4a3d98c8', // BeEzrat HaShem
  ],
};

export function getPublicationIdsForCategory(category: string): string[] {
  return categoryPublicationMap[category] || [];
}

export function getCategoryForPublication(pubId: string): string | null {
  for (const [category, pubIds] of Object.entries(categoryPublicationMap)) {
    if (pubIds.includes(pubId)) return category;
  }
  return null;
}

export const categoryNames: Record<string, Record<string, string>> = {
  stories:   { ru: 'Истории и история', en: 'Stories & History', he: 'סיפורים והיסטוריה', uk: 'Історії та історія' },
  chassidut: { ru: 'Хасидут', en: 'Chassidut', he: 'חסידות', uk: 'Хасидут' },
  halacha:   { ru: 'Галаха', en: 'Halacha', he: 'הלכה', uk: 'Галаха' },
  kids:      { ru: 'Детям', en: 'For Kids', he: 'לילדים', uk: 'Дітям' },
  moshiach:  { ru: 'Мошиах', en: 'Moshiach', he: 'משיח', uk: 'Мошіах' },
  general:   { ru: 'Общее', en: 'General', he: 'כללי', uk: 'Загальне' },
  mussar:    { ru: 'Мусар', en: 'Mussar', he: 'מוסר', uk: 'Мусар' },
  other:     { ru: 'Другое', en: 'Other', he: 'אחר', uk: 'Інше' },
};

export const orderedCategories = ['stories', 'chassidut', 'halacha', 'kids', 'moshiach', 'mussar', 'general', 'other'] as const;
