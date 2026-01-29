# ShabbatHub - Next.js

Крупнейший архив материалов к Шаббату. Платформа для обмена еврейскими газетами, статьями и учебными материалами.

## 🌟 Функции

- 📰 **Публикации** — создание серий газет/журналов с метаданными
- 📄 **Загрузка PDF** — привязка к недельным главам или праздникам
- 🔍 **Поиск и фильтры** — по парашиот, датам, категориям
- 👤 **Личный кабинет** — избранное, мои загрузки, подписки
- 🌐 **Мультиязычность** — Русский, English, עברית
- 📱 **Адаптивный дизайн** — мобильные устройства и десктоп
- 📊 **Лидерборд** — топ загрузчиков

## 🚀 Быстрый старт

### 1. Клонирование и установка

```bash
git clone https://github.com/YOUR_USERNAME/shabbathub.git
cd shabbathub
npm install
```

### 2. Настройка Supabase

1. Создайте проект на [supabase.com](https://supabase.com)
2. Запустите SQL из `database/schema.sql` в SQL Editor
3. Включите Storage и создайте bucket `pdfs` (public)
4. Скопируйте URL и anon key

### 3. Переменные окружения

```bash
cp .env.example .env.local
```

Заполните `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxx...
```

### 4. Запуск

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## 📁 Структура проекта

```
shabbathub-next/
├── app/                      # Next.js App Router
│   ├── page.tsx              # Главная страница
│   ├── catalog/              # Каталог материалов
│   ├── add-publication/      # Добавить публикацию
│   ├── add-pdf/              # Загрузить PDF
│   ├── login/                # Авторизация
│   └── layout.tsx            # Root layout
├── components/
│   ├── Header.tsx            # Шапка с навигацией
│   ├── Footer.tsx            # Подвал
│   ├── PDFViewer.tsx         # Просмотрщик PDF
│   ├── SearchBar.tsx         # Поиск
│   └── Providers.tsx         # Context providers
├── lib/
│   ├── supabase.ts           # Supabase клиент
│   ├── types.ts              # TypeScript типы
│   ├── translations.ts       # Переводы (i18n)
│   ├── auth-context.tsx      # Auth context
│   └── language-context.tsx  # Language context
├── database/
│   └── schema.sql            # SQL схема для Supabase
└── public/                   # Статические файлы
```

## 🗄️ База данных

### Таблицы

| Таблица | Описание |
|---------|----------|
| `profiles` | Профили пользователей |
| `publications` | Серии публикаций (газеты) |
| `parshiot` | 54 недельные главы |
| `events` | Праздники и события |
| `issues` | Выпуски (PDF файлы) |
| `favorite_publications` | Избранные публикации |
| `favorite_issues` | Избранные выпуски |
| `subscriptions` | Подписки на обновления |

### Связи

```
publications ──< issues
parshiot ──< issues
events ──< issues
profiles ──< issues (uploaded_by)
profiles ──< favorites
profiles ──< subscriptions
```

## 🌐 Мультиязычность

Поддерживаемые языки:
- 🇷🇺 Русский (ru) — основной
- 🇺🇸 English (en)
- 🇮🇱 עברית (he) — RTL

Переводы в `lib/translations.ts`. Для добавления:
```typescript
export const translations = {
  newKey: {
    ru: 'Русский текст',
    en: 'English text',
    he: 'טקסט בעברית',
  },
};
```

## 🚀 Деплой

### Vercel (рекомендуется)

1. Push код на GitHub
2. Импортируйте в [Vercel](https://vercel.com)
3. Добавьте Environment Variables
4. Deploy

### Переменные в Vercel

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL (https://your-domain.com)
```

## 📝 TODO

- [x] Базовая структура Next.js
- [x] Мультиязычность (RU/EN/HE)
- [x] Схема базы данных
- [x] Формы добавления публикаций и PDF
- [x] PDF Viewer с контролами
- [ ] Страница авторизации
- [ ] Страница каталога с фильтрами
- [ ] Страница отдельного выпуска
- [ ] Избранное и подписки
- [ ] Email уведомления
- [ ] Генерация превью PDF
- [ ] Миграция данных из WordPress
- [ ] SEO оптимизация
- [ ] Sitemap.xml

## 🔒 Безопасность

- Row Level Security (RLS) на всех таблицах
- Email верификация при регистрации
- Проверка авторских прав при загрузке

## 📄 Лицензия

MIT

---

Сделано с ❤️ для еврейской общины
