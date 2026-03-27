# ShabbatHub - Next.js

Крупнейший архив материалов к Шаббату. Платформа для обмена еврейскими газетами, статьями и учебными материалами.

## 🌟 Функции

- 📰 **Публикации** — создание серий газет/журналов с метаданными
- 📄 **Загрузка PDF** — привязка к недельным главам или праздникам
- 🔍 **Поиск и фильтры** — по парашиот, датам, категориям
- 🛡️ **Защита входа** — блокировка на 1 час после 3 неудачных попыток входа
- 🛒 **Маркетплейс** — поиск по странам, городам, районам, блюдам и продуктам
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

### Исправление превью (PDF и публикации)

```bash
# Сначала посмотреть, что будет исправлено
npm run backfill:previews:dry

# Применить изменения
npm run backfill:previews
```

Требуется `pdftoppm` (Poppler):
```bash
brew install poppler
```

Важно:
- для записи в Supabase скрипту нужен `SUPABASE_SERVICE_ROLE_KEY` в `.env.local`;
- если включён RLS и используется только `NEXT_PUBLIC_SUPABASE_ANON_KEY`, обновления могут не примениться.

Гарантированный вариант через SQL Editor:
`database/fix-missing-previews.sql`

### Удаление и предотвращение дубликатов

SQL для безопасной дедупликации и уникальных ограничений:
`database/dedupe-and-constraints.sql`

### Маркетплейс (еда/товары)

Создайте таблицы и индексы:
`database/marketplace.sql`

После этого доступно:
- страница `/marketplace`
- API поиска `/api/marketplace/search`

Параметры поиска API:
- `q`
- `country`
- `city`
- `district`
- `dishes` (через запятую)
- `products` (через запятую)

### Защита аккаунтов от перебора пароля

Включено:
- 3 неверных пароля подряд -> блок входа на 1 час
- лимит по IP на попытки входа/регистрации
- нейтральные сообщения об ошибке (без раскрытия деталей)

Для надежного серверного rate-limit в проде добавьте Upstash KV:
`KV_REST_API_URL`
`KV_REST_API_TOKEN`

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
NEXT_PUBLIC_GA_ID (optional, Google Analytics measurement ID)
RESEND_API_KEY (for email notifications/digests)
CRON_SECRET (optional, protects /api/cron/* routes)
KV_REST_API_URL (optional, recommended for auth/contact rate-limit)
KV_REST_API_TOKEN (optional, recommended for auth/contact rate-limit)
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
