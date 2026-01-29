-- ShabbatHub Database Schema for Supabase
-- Run this in Supabase SQL Editor

-- ============================================
-- 1. USERS (extends Supabase auth.users)
-- ============================================
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    display_name TEXT,
    avatar_url TEXT,
    preferred_language TEXT DEFAULT 'ru' CHECK (preferred_language IN ('ru', 'en', 'he')),
    email_notifications BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. PUBLICATIONS (серии газет)
-- ============================================
CREATE TABLE public.publications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Названия на разных языках
    title_ru TEXT NOT NULL,
    title_en TEXT,
    title_he TEXT,
    
    -- Описания
    description_ru TEXT,
    description_en TEXT,
    description_he TEXT,
    
    -- Периодичность
    frequency TEXT NOT NULL CHECK (frequency IN ('daily', 'weekly', 'monthly', 'irregular')),
    
    -- Основной язык публикации
    primary_language TEXT NOT NULL CHECK (primary_language IN ('ru', 'en', 'he')),
    
    -- Контакты
    whatsapp_link TEXT,
    telegram_link TEXT,
    website_url TEXT,
    email TEXT,
    
    -- Обложка/лого
    cover_image_url TEXT,
    
    -- Метаданные
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    
    -- Статистика
    total_issues INTEGER DEFAULT 0,
    total_downloads INTEGER DEFAULT 0,
    subscribers_count INTEGER DEFAULT 0
);

-- ============================================
-- 3. PARSHIOT (54 недельные главы)
-- ============================================
CREATE TABLE public.parshiot (
    id SERIAL PRIMARY KEY,
    order_num INTEGER NOT NULL UNIQUE, -- 1-54
    
    -- Названия на разных языках
    name_ru TEXT NOT NULL,
    name_en TEXT NOT NULL,
    name_he TEXT NOT NULL,
    
    -- Книга Торы
    book TEXT NOT NULL CHECK (book IN ('bereishit', 'shemot', 'vayikra', 'bamidbar', 'devarim'))
);

-- Заполняем парашиёт
INSERT INTO public.parshiot (order_num, name_ru, name_en, name_he, book) VALUES
(1, 'Берешит', 'Bereishit', 'בראשית', 'bereishit'),
(2, 'Ноах', 'Noach', 'נח', 'bereishit'),
(3, 'Лех-Леха', 'Lech-Lecha', 'לך-לך', 'bereishit'),
(4, 'Ваера', 'Vayera', 'וירא', 'bereishit'),
(5, 'Хаей Сара', 'Chayei Sarah', 'חיי שרה', 'bereishit'),
(6, 'Толдот', 'Toldot', 'תולדות', 'bereishit'),
(7, 'Ваеце', 'Vayetzei', 'ויצא', 'bereishit'),
(8, 'Вайишлах', 'Vayishlach', 'וישלח', 'bereishit'),
(9, 'Ваешев', 'Vayeshev', 'וישב', 'bereishit'),
(10, 'Микец', 'Miketz', 'מקץ', 'bereishit'),
(11, 'Ваигаш', 'Vayigash', 'ויגש', 'bereishit'),
(12, 'Ваехи', 'Vayechi', 'ויחי', 'bereishit'),
(13, 'Шмот', 'Shemot', 'שמות', 'shemot'),
(14, 'Ваэра', 'Vaera', 'וארא', 'shemot'),
(15, 'Бо', 'Bo', 'בא', 'shemot'),
(16, 'Бешалах', 'Beshalach', 'בשלח', 'shemot'),
(17, 'Итро', 'Yitro', 'יתרו', 'shemot'),
(18, 'Мишпатим', 'Mishpatim', 'משפטים', 'shemot'),
(19, 'Трума', 'Terumah', 'תרומה', 'shemot'),
(20, 'Тецаве', 'Tetzaveh', 'תצוה', 'shemot'),
(21, 'Ки Тиса', 'Ki Tisa', 'כי תשא', 'shemot'),
(22, 'Ваякгель', 'Vayakhel', 'ויקהל', 'shemot'),
(23, 'Пкудей', 'Pekudei', 'פקודי', 'shemot'),
(24, 'Ваикра', 'Vayikra', 'ויקרא', 'vayikra'),
(25, 'Цав', 'Tzav', 'צו', 'vayikra'),
(26, 'Шмини', 'Shemini', 'שמיני', 'vayikra'),
(27, 'Тазриа', 'Tazria', 'תזריע', 'vayikra'),
(28, 'Мецора', 'Metzora', 'מצורע', 'vayikra'),
(29, 'Ахарей Мот', 'Acharei Mot', 'אחרי מות', 'vayikra'),
(30, 'Кдошим', 'Kedoshim', 'קדושים', 'vayikra'),
(31, 'Эмор', 'Emor', 'אמור', 'vayikra'),
(32, 'Бегар', 'Behar', 'בהר', 'vayikra'),
(33, 'Бехукотай', 'Bechukotai', 'בחקותי', 'vayikra'),
(34, 'Бамидбар', 'Bamidbar', 'במדבר', 'bamidbar'),
(35, 'Насо', 'Naso', 'נשא', 'bamidbar'),
(36, 'Бегаалотха', 'Behaalotecha', 'בהעלותך', 'bamidbar'),
(37, 'Шлах', 'Shelach', 'שלח', 'bamidbar'),
(38, 'Корах', 'Korach', 'קרח', 'bamidbar'),
(39, 'Хукат', 'Chukat', 'חקת', 'bamidbar'),
(40, 'Балак', 'Balak', 'בלק', 'bamidbar'),
(41, 'Пинхас', 'Pinchas', 'פינחס', 'bamidbar'),
(42, 'Матот', 'Matot', 'מטות', 'bamidbar'),
(43, 'Масэй', 'Masei', 'מסעי', 'bamidbar'),
(44, 'Дварим', 'Devarim', 'דברים', 'devarim'),
(45, 'Ваэтханан', 'Vaetchanan', 'ואתחנן', 'devarim'),
(46, 'Экев', 'Eikev', 'עקב', 'devarim'),
(47, 'Реэ', 'Re''eh', 'ראה', 'devarim'),
(48, 'Шофтим', 'Shoftim', 'שופטים', 'devarim'),
(49, 'Ки Теце', 'Ki Teitzei', 'כי תצא', 'devarim'),
(50, 'Ки Таво', 'Ki Tavo', 'כי תבוא', 'devarim'),
(51, 'Ницавим', 'Nitzavim', 'נצבים', 'devarim'),
(52, 'Ваелех', 'Vayeilech', 'וילך', 'devarim'),
(53, 'Гаазину', 'Haazinu', 'האזינו', 'devarim'),
(54, 'Везот Габраха', 'Vezot Habracha', 'וזאת הברכה', 'devarim');

-- ============================================
-- 4. EVENTS/HOLIDAYS (праздники и события)
-- ============================================
CREATE TABLE public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Названия на разных языках
    name_ru TEXT NOT NULL,
    name_en TEXT NOT NULL,
    name_he TEXT NOT NULL,
    
    -- Описания
    description_ru TEXT,
    description_en TEXT,
    description_he TEXT,
    
    -- Тип события
    event_type TEXT NOT NULL CHECK (event_type IN ('holiday', 'fast', 'special', 'other')),
    
    -- Еврейская дата (месяц и день)
    hebrew_month INTEGER, -- 1-13 (включая Адар II)
    hebrew_day INTEGER,   -- 1-30
    
    -- Флаги
    is_annual BOOLEAN DEFAULT true, -- повторяется каждый год
    is_active BOOLEAN DEFAULT true,
    
    -- Метаданные
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Заполняем основные праздники
INSERT INTO public.events (name_ru, name_en, name_he, event_type, hebrew_month, hebrew_day) VALUES
('Рош а-Шана', 'Rosh Hashanah', 'ראש השנה', 'holiday', 7, 1),
('Йом Кипур', 'Yom Kippur', 'יום כיפור', 'holiday', 7, 10),
('Суккот', 'Sukkot', 'סוכות', 'holiday', 7, 15),
('Шмини Ацерет', 'Shemini Atzeret', 'שמיני עצרת', 'holiday', 7, 22),
('Симхат Тора', 'Simchat Torah', 'שמחת תורה', 'holiday', 7, 23),
('Ханука', 'Chanukah', 'חנוכה', 'holiday', 9, 25),
('10 Тевета', '10th of Tevet', 'עשרה בטבת', 'fast', 10, 10),
('Ту би-Шват', 'Tu B''Shvat', 'ט"ו בשבט', 'special', 11, 15),
('Пурим', 'Purim', 'פורים', 'holiday', 12, 14),
('Песах', 'Passover', 'פסח', 'holiday', 1, 15),
('Лаг ба-Омер', 'Lag B''Omer', 'ל"ג בעומר', 'special', 2, 18),
('Шавуот', 'Shavuot', 'שבועות', 'holiday', 3, 6),
('17 Тамуза', '17th of Tammuz', 'י"ז בתמוז', 'fast', 4, 17),
('9 Ава', 'Tisha B''Av', 'תשעה באב', 'fast', 5, 9),
('15 Ава', 'Tu B''Av', 'ט"ו באב', 'special', 5, 15);

-- ============================================
-- 5. ISSUES (выпуски PDF)
-- ============================================
CREATE TABLE public.issues (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Привязка к публикации
    publication_id UUID NOT NULL REFERENCES public.publications(id) ON DELETE CASCADE,
    
    -- Основная информация
    title TEXT NOT NULL,
    description TEXT,
    issue_number TEXT, -- номер выпуска (может быть "151" или "Специальный выпуск")
    
    -- Григорианская дата
    gregorian_date DATE,
    
    -- Еврейская дата (все поля для гибкости)
    hebrew_day INTEGER,      -- 1-30
    hebrew_month INTEGER,    -- 1-13 (включая Адар II)
    hebrew_year INTEGER,     -- 5786
    hebrew_date_display TEXT, -- "י׳ שבט תשפ״ו" для отображения
    
    -- Привязка к недельной главе (может быть вместе с event)
    parsha_id INTEGER REFERENCES public.parshiot(id),
    
    -- Привязка к празднику/событию (может быть вместе с parsha)
    event_id UUID REFERENCES public.events(id),
    
    -- Файл
    pdf_url TEXT NOT NULL,
    pdf_filename TEXT,
    file_size INTEGER, -- в байтах (макс 10 МБ = 10485760)
    page_count INTEGER,
    
    -- Превью (первая страница)
    thumbnail_url TEXT,
    
    -- Кто загрузил
    uploaded_by UUID NOT NULL REFERENCES public.profiles(id),
    
    -- Статистика
    download_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    
    -- Метаданные
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
    
    -- НЕТ ограничения parsha_or_event - можно указать и то и другое!
);

-- ============================================
-- 6. FAVORITES (избранное)
-- ============================================
-- Избранные публикации (серии)
CREATE TABLE public.favorite_publications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    publication_id UUID NOT NULL REFERENCES public.publications(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, publication_id)
);

-- Избранные выпуски
CREATE TABLE public.favorite_issues (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    issue_id UUID NOT NULL REFERENCES public.issues(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, issue_id)
);

-- ============================================
-- 7. SUBSCRIPTIONS (подписки на обновления)
-- ============================================
CREATE TABLE public.subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    publication_id UUID NOT NULL REFERENCES public.publications(id) ON DELETE CASCADE,
    
    -- Настройки доставки
    delivery_type TEXT NOT NULL CHECK (delivery_type IN ('link', 'attachment')),
    
    -- Метаданные
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    
    UNIQUE(user_id, publication_id)
);

-- ============================================
-- 8. UPLOAD STATS (для лидерборда)
-- ============================================
CREATE VIEW public.upload_leaderboard AS
SELECT 
    p.id,
    p.display_name,
    p.first_name,
    p.last_name,
    p.avatar_url,
    COUNT(i.id) as upload_count,
    SUM(i.download_count) as total_downloads
FROM public.profiles p
LEFT JOIN public.issues i ON i.uploaded_by = p.id AND i.is_active = true
GROUP BY p.id
ORDER BY upload_count DESC;

-- ============================================
-- 9. INDEXES для производительности
-- ============================================
CREATE INDEX idx_issues_publication ON public.issues(publication_id);
CREATE INDEX idx_issues_parsha ON public.issues(parsha_id);
CREATE INDEX idx_issues_event ON public.issues(event_id);
CREATE INDEX idx_issues_uploaded_by ON public.issues(uploaded_by);
CREATE INDEX idx_issues_created_at ON public.issues(created_at DESC);
CREATE INDEX idx_issues_gregorian_date ON public.issues(gregorian_date DESC);
CREATE INDEX idx_issues_hebrew_date ON public.issues(hebrew_year, hebrew_month, hebrew_day);
CREATE INDEX idx_favorite_publications_user ON public.favorite_publications(user_id);
CREATE INDEX idx_favorite_issues_user ON public.favorite_issues(user_id);
CREATE INDEX idx_subscriptions_user ON public.subscriptions(user_id);

-- ============================================
-- 10. WORDPRESS IMPORT (для миграции)
-- ============================================
-- Временная таблица для импорта из WordPress
-- После реорганизации можно удалить
CREATE TABLE public.wp_import (
    id SERIAL PRIMARY KEY,
    
    -- Оригинальные данные из WP
    wp_post_id INTEGER,
    wp_title TEXT,
    wp_author TEXT,
    wp_date TIMESTAMPTZ,
    wp_pdf_url TEXT,
    wp_pdf_filename TEXT,
    
    -- Распознанные данные (заполняются при импорте или вручную)
    detected_publication TEXT,  -- название публикации (для группировки)
    detected_parsha TEXT,       -- название парашá
    detected_event TEXT,        -- название праздника
    detected_language TEXT,     -- ru/en/he
    detected_issue_number TEXT, -- номер выпуска
    
    -- Статус обработки
    is_processed BOOLEAN DEFAULT false,
    assigned_publication_id UUID REFERENCES public.publications(id),
    assigned_issue_id UUID REFERENCES public.issues(id),
    
    -- Метаданные
    imported_at TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ,
    notes TEXT
);

CREATE INDEX idx_wp_import_processed ON public.wp_import(is_processed);
CREATE INDEX idx_wp_import_publication ON public.wp_import(detected_publication);

-- ============================================
-- 10. RLS (Row Level Security)
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorite_publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorite_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles: пользователи видят все профили, но редактируют только свой
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Publications: все видят активные, создатель может редактировать
CREATE POLICY "Active publications are viewable by everyone" ON public.publications FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated users can create publications" ON public.publications FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Creators can update own publications" ON public.publications FOR UPDATE USING (auth.uid() = created_by);

-- Issues: все видят активные, загрузивший может редактировать
CREATE POLICY "Active issues are viewable by everyone" ON public.issues FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated users can create issues" ON public.issues FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Uploaders can update own issues" ON public.issues FOR UPDATE USING (auth.uid() = uploaded_by);

-- Favorites & Subscriptions: только владелец
CREATE POLICY "Users can manage own favorite publications" ON public.favorite_publications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own favorite issues" ON public.favorite_issues FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own subscriptions" ON public.subscriptions FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- 11. FUNCTIONS
-- ============================================

-- Функция для обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггеры
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_publications_updated_at BEFORE UPDATE ON public.publications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_issues_updated_at BEFORE UPDATE ON public.issues
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Функция для увеличения счетчика загрузок
CREATE OR REPLACE FUNCTION increment_download_count(issue_uuid UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.issues SET download_count = download_count + 1 WHERE id = issue_uuid;
    UPDATE public.publications SET total_downloads = total_downloads + 1 
    WHERE id = (SELECT publication_id FROM public.issues WHERE id = issue_uuid);
END;
$$ LANGUAGE plpgsql;

-- Функция для создания профиля при регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email)
    VALUES (NEW.id, NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Триггер для автоматического создания профиля
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
