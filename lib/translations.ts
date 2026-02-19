import { Lang } from './language-context';

const translations = {
  // ===== Общие =====
  siteName: { ru: 'ShabbatHub', en: 'ShabbatHub', he: 'ShabbatHub', uk: 'ShabbatHub' },
  loading: { ru: 'Загрузка...', en: 'Loading...', he: '...טוען', uk: 'Завантаження...' },
  save: { ru: 'Сохранить', en: 'Save', he: 'שמור', uk: 'Зберегти' },
  cancel: { ru: 'Отмена', en: 'Cancel', he: 'ביטול', uk: 'Скасувати' },
  close: { ru: 'Закрыть', en: 'Close', he: 'סגור', uk: 'Закрити' },
  back: { ru: 'Назад', en: 'Back', he: 'חזרה', uk: 'Назад' },
  search: { ru: 'Поиск...', en: 'Search...', he: '...חיפוש', uk: 'Пошук...' },
  find: { ru: 'Найти', en: 'Find', he: 'חפש', uk: 'Знайти' },
  reset: { ru: 'Сбросить', en: 'Reset', he: 'איפוס', uk: 'Скинути' },
  open: { ru: 'Открыть', en: 'Open', he: 'פתח', uk: 'Відкрити' },
  download: { ru: 'Скачать', en: 'Download', he: 'הורד', uk: 'Завантажити' },
  free: { ru: 'Бесплатно', en: 'Free', he: 'חינם', uk: 'Безкоштовно' },

  // ===== Навигация =====
  nav: {
    catalog: { ru: 'Каталог', en: 'Catalog', he: 'קטלוג', uk: 'Каталог' },
    leaders: { ru: 'Лидеры', en: 'Leaders', he: 'מובילים', uk: 'Лідери' },
    about: { ru: 'О проекте', en: 'About', he: 'אודות', uk: 'Про проект' },
    donate: { ru: 'Поддержать', en: 'Donate', he: 'תרומה', uk: 'Підтримати' },
    add: { ru: 'Добавить', en: 'Add', he: 'הוסף', uk: 'Додати' },
    addPdf: { ru: 'Добавить PDF', en: 'Add PDF', he: 'הוסף PDF', uk: 'Додати PDF' },
    addPublication: { ru: 'Добавить публикацию', en: 'Add publication', he: 'הוסף פרסום', uk: 'Додати публікацію' },
    login: { ru: 'Войти', en: 'Sign in', he: 'התחבר', uk: 'Увійти' },
    logout: { ru: 'Выйти', en: 'Sign out', he: 'התנתק', uk: 'Вийти' },
    admin: { ru: 'Админ-панель', en: 'Admin panel', he: 'ניהול', uk: 'Адмін-панель' },
    share: { ru: 'Поделиться', en: 'Share', he: 'שתף', uk: 'Поділитися' },
    copied: { ru: 'Скопировано!', en: 'Copied!', he: '!הועתק', uk: 'Скопійовано!' },
    shareSite: { ru: 'Поделиться сайтом', en: 'Share site', he: 'שתף אתר', uk: 'Поділитися сайтом' },
    linkCopied: { ru: 'Ссылка скопирована!', en: 'Link copied!', he: '!הקישור הועתק', uk: 'Посилання скопійовано!' },
  },

  // ===== Роли =====
  roles: {
    admin: { ru: 'Администратор', en: 'Administrator', he: 'מנהל', uk: 'Адміністратор' },
    editor: { ru: 'Редактор', en: 'Editor', he: 'עורך', uk: 'Редактор' },
    user: { ru: 'Пользователь', en: 'User', he: 'משתמש', uk: 'Користувач' },
  },

  // ===== Шапка — ивритский календарь =====
  header: {
    parsha: { ru: 'Глава', en: 'Parashat', he: 'פרשת', uk: 'Глава' },
  },

  // ===== Главная =====
  home: {
    heroTitle: { ru: 'Крупнейший архив материалов к Шаббату', en: 'The largest archive of Shabbat materials', he: 'הארכיון הגדול ביותר של חומרי שבת', uk: 'Найбільший архів матеріалів до Шаббату' },
    heroSubtitle: { ru: 'материалов', en: 'materials', he: 'חומרים', uk: 'матеріалів' },
    heroDesc: { ru: 'газеты, статьи, учебные пособия', en: 'newspapers, articles, study materials', he: 'עיתונים, מאמרים, חומרי לימוד', uk: 'газети, статті, навчальні посібники' },
    searchPlaceholder: { ru: 'Поиск материалов, недельных глав, тем...', en: 'Search materials, weekly portions, topics...', he: '...חיפוש חומרים, פרשות, נושאים', uk: 'Пошук матеріалів, тижневих глав, тем...' },
    catalogBtn: { ru: 'Каталог материалов', en: 'Browse catalog', he: 'קטלוג חומרים', uk: 'Каталог матеріалів' },
    latestBtn: { ru: 'Последние выпуски', en: 'Latest issues', he: 'גיליונות אחרונים', uk: 'Останні випуски' },
    materials: { ru: 'Материалов', en: 'Materials', he: 'חומרים', uk: 'Матеріалів' },
    yearsArchive: { ru: 'Лет архива', en: 'Years of archive', he: 'שנות ארכיון', uk: 'Років архіву' },
    languages: { ru: 'Языка', en: 'Languages', he: 'שפות', uk: 'Мови' },
    latestTitle: { ru: 'Последние выпуски', en: 'Latest issues', he: 'גיליונות אחרונים', uk: 'Останні випуски' },
    latestSubtitle: { ru: 'Свежие материалы к Шаббату', en: 'Fresh materials for Shabbat', he: 'חומרים חדשים לשבת', uk: 'Свіжі матеріали до Шаббату' },
    viewAll: { ru: 'Смотреть все', en: 'View all', he: 'הצג הכל', uk: 'Дивитися все' },
    viewAllMaterials: { ru: 'Смотреть все материалы', en: 'View all materials', he: 'הצג את כל החומרים', uk: 'Дивитися всі матеріали' },
    categoriesTitle: { ru: 'Категории материалов', en: 'Material categories', he: 'קטגוריות חומרים', uk: 'Категорії матеріалів' },
    catNewspapers: { ru: 'Еженедельные газеты', en: 'Weekly newspapers', he: 'עיתונים שבועיים', uk: 'Щотижневі газети' },
    catNewspapersDesc: { ru: 'Chevrutah, Шомрей Шабос и другие издания', en: 'Chevrutah, Shomrei Shabbos and more', he: 'חברותא, שומרי שבת ועוד', uk: 'Chevrutah, Шомрей Шабос та інші видання' },
    catEducational: { ru: 'Учебные материалы', en: 'Educational materials', he: 'חומרי לימוד', uk: 'Навчальні матеріали' },
    catEducationalDesc: { ru: 'Статьи, уроки и образовательные материалы', en: 'Articles, lessons and educational content', he: 'מאמרים, שיעורים וחומרי חינוך', uk: 'Статті, уроки та освітні матеріали' },
    catHolidays: { ru: 'Праздники', en: 'Holidays', he: 'חגים', uk: 'Свята' },
    catHolidaysDesc: { ru: 'Материалы к еврейским праздникам', en: 'Materials for Jewish holidays', he: 'חומרים לחגי ישראל', uk: 'Матеріали до єврейських свят' },
    torahGroupsTitle: { ru: 'Группы для изучения Торы', en: 'Torah study groups', he: 'קבוצות לימוד תורה', uk: 'Групи для вивчення Тори' },
    torahGroupsDesc: { ru: 'WhatsApp и Telegram группы для совместного изучения', en: 'WhatsApp and Telegram groups for study', he: 'קבוצות וואטסאפ וטלגרם ללימוד משותף', uk: 'WhatsApp і Telegram групи для спільного вивчення' },
    torahGroupsBtn: { ru: 'Смотреть группы', en: 'View groups', he: 'הצג קבוצות', uk: 'Дивитися групи' },
    aboutTitle: { ru: 'О проекте ShabbatHub', en: 'About ShabbatHub', he: 'אודות ShabbatHub', uk: 'Про проект ShabbatHub' },
    aboutText: { ru: 'ShabbatHub — это бесплатный онлайн-архив материалов к Шаббату. Мы собираем и систематизируем еженедельные газеты, учебные материалы и статьи на русском, иврите и английском языках, чтобы сделать еврейское знание доступным для всех.', en: 'ShabbatHub is a free online archive of Shabbat materials. We collect and organize weekly newspapers, study materials and articles in Russian, Hebrew and English to make Jewish knowledge accessible to everyone.', he: 'ShabbatHub הוא ארכיון מקוון חינמי של חומרי שבת. אנו אוספים ומארגנים עיתונים שבועיים, חומרי לימוד ומאמרים ברוסית, עברית ואנגלית כדי להנגיש ידע יהודי לכולם.', uk: 'ShabbatHub — це безкоштовний онлайн-архів матеріалів до Шаббату. Ми збираємо та систематизуємо щотижневі газети, навчальні матеріали та статті російською, івритом та англійською мовами, щоб зробити єврейське знання доступним для всіх.' },
    aboutMore: { ru: 'Узнать больше о проекте', en: 'Learn more about the project', he: 'למד עוד על הפרויקט', uk: 'Дізнатися більше про проект' },
  },

  // ===== Каталог =====
  catalog: {
    title: { ru: 'Каталог материалов', en: 'Material catalog', he: 'קטלוג חומרים', uk: 'Каталог матеріалів' },
    subtitle: { ru: 'Газеты, недельные главы Торы и материалы к Шаббату', en: 'Newspapers, weekly Torah portions and Shabbat materials', he: 'עיתונים, פרשות השבוע וחומרי שבת', uk: 'Газети, тижневі глави Тори та матеріали до Шаббату' },
    searchPlaceholder: { ru: 'Поиск по названию...', en: 'Search by title...', he: '...חיפוש לפי שם', uk: 'Пошук за назвою...' },
    allParshiot: { ru: 'Все главы', en: 'All portions', he: 'כל הפרשות', uk: 'Всі глави' },
    allEvents: { ru: 'Все события', en: 'All events', he: 'כל האירועים', uk: 'Всі події' },
    found: { ru: 'Найдено', en: 'Found', he: 'נמצאו', uk: 'Знайдено' },
    materials: { ru: 'материалов', en: 'materials', he: 'חומרים', uk: 'матеріалів' },
    page: { ru: 'Страница', en: 'Page', he: 'עמוד', uk: 'Сторінка' },
    of: { ru: 'из', en: 'of', he: 'מתוך', uk: 'з' },
    notFound: { ru: 'По вашему запросу ничего не найдено', en: 'Nothing found for your query', he: 'לא נמצאו תוצאות לחיפוש שלך', uk: 'За вашим запитом нічого не знайдено' },
    toStart: { ru: 'В начало', en: 'First', he: 'ראשון', uk: 'На початок' },
    toEnd: { ru: 'В конец', en: 'Last', he: 'אחרון', uk: 'В кінець' },
    thisWeek: { ru: 'Эта неделя', en: 'This week', he: 'השבוע', uk: 'Цей тиждень' },
    newest: { ru: 'Сначала новые', en: 'Newest first', he: 'החדשים תחילה', uk: 'Спочатку нові' },
    oldest: { ru: 'Сначала старые', en: 'Oldest first', he: 'הישנים תחילה', uk: 'Спочатку старі' },
    issues: { ru: 'Выпуски', en: 'Issues', he: 'גיליונות', uk: 'Випуски' },
    publications: { ru: 'Публикации', en: 'Publications', he: 'פרסומים', uk: 'Публікації' },
    issuesCount: { ru: 'выпусков', en: 'issues', he: 'גיליונות', uk: 'випусків' },
    allIssues: { ru: 'Все выпуски', en: 'All issues', he: 'כל הגיליונות', uk: 'Всі випуски' },
    language: { ru: 'Язык', en: 'Language', he: 'שפה', uk: 'Мова' },
    allLanguages: { ru: 'Все', en: 'All', he: 'הכל', uk: 'Всі' },
  },

  // ===== Документ =====
  doc: {
    notFound: { ru: 'Документ не найден', en: 'Document not found', he: 'המסמך לא נמצא', uk: 'Документ не знайдено' },
    backToCatalog: { ru: 'Назад в каталог', en: 'Back to catalog', he: 'חזרה לקטלוג', uk: 'Назад до каталогу' },
    openPdf: { ru: 'Открыть PDF', en: 'Open PDF', he: 'פתח PDF', uk: 'Відкрити PDF' },
    pages: { ru: 'страниц', en: 'pages', he: 'עמודים', uk: 'сторінок' },
    embedded: { ru: 'Встроенный', en: 'Embedded', he: 'מוטבע', uk: 'Вбудований' },
    googleViewer: { ru: 'Google Viewer', en: 'Google Viewer', he: 'Google Viewer', uk: 'Google Viewer' },
    cantDisplay: { ru: 'Не удалось отобразить PDF', en: 'Could not display PDF', he: 'לא ניתן להציג את ה-PDF', uk: 'Не вдалося відобразити PDF' },
    tryGoogle: { ru: 'Попробовать Google Viewer', en: 'Try Google Viewer', he: 'נסה Google Viewer', uk: 'Спробувати Google Viewer' },
    subscribe: { ru: 'Подписаться на обновления', en: 'Subscribe to updates', he: 'הירשם לעדכונים', uk: 'Підписатися на оновлення' },
  },

  // ===== Публикация =====
  pub: {
    notFound: { ru: 'Публикация не найдена', en: 'Publication not found', he: 'הפרסום לא נמצא', uk: 'Публікацію не знайдено' },
    noTitle: { ru: 'Без названия', en: 'Untitled', he: 'ללא שם', uk: 'Без назви' },
    issues: { ru: 'выпусков', en: 'issues', he: 'גיליונות', uk: 'випусків' },
    allIssues: { ru: 'Все выпуски', en: 'All issues', he: 'כל הגיליונות', uk: 'Всі випуски' },
    grid: { ru: 'Плитка', en: 'Grid', he: 'רשת', uk: 'Плитка' },
    list: { ru: 'Список', en: 'List', he: 'רשימה', uk: 'Список' },
    noIssues: { ru: 'Выпуски не найдены', en: 'No issues found', he: 'לא נמצאו גיליונות', uk: 'Випуски не знайдено' },
    contacts: { ru: 'Контакты', en: 'Contacts', he: 'יצירת קשר', uk: 'Контакти' },
    noContacts: { ru: 'Контакты не указаны', en: 'No contacts provided', he: 'אין פרטי קשר', uk: 'Контакти не вказані' },
    site: { ru: 'Сайт', en: 'Website', he: 'אתר', uk: 'Сайт' },
    getUpdates: { ru: 'Получайте новые выпуски', en: 'Get new issues', he: 'קבל גיליונות חדשים', uk: 'Отримуйте нові випуски' },
    getUpdatesDesc: { ru: 'Уведомление на email при загрузке нового номера', en: 'Email notification when a new issue is uploaded', he: 'הודעה במייל כשגיליון חדש עולה', uk: 'Сповіщення на email при завантаженні нового номера' },
  },

  // ===== Подписка =====
  subscribe: {
    title: { ru: 'Подписка на обновления', en: 'Subscribe to updates', he: 'הרשמה לעדכונים', uk: 'Підписка на оновлення' },
    subtitle: { ru: 'Выберите что вас интересует', en: 'Choose what interests you', he: 'בחר מה מעניין אותך', uk: 'Оберіть що вас цікавить' },
    email: { ru: 'Ваш email', en: 'Your email', he: 'האימייל שלך', uk: 'Ваш email' },
    newsTitle: { ru: 'Новости проекта', en: 'Project news', he: 'חדשות הפרויקט', uk: 'Новини проекту' },
    newsDesc: { ru: 'Обновления ShabbatHub, новые функции, важные объявления', en: 'ShabbatHub updates, new features, important announcements', he: 'עדכוני ShabbatHub, פיצ\'רים חדשים, הודעות חשובות', uk: 'Оновлення ShabbatHub, нові функції, важливі оголошення' },
    pubsTitle: { ru: 'Новые выпуски публикаций', en: 'New publication issues', he: 'גיליונות חדשים', uk: 'Нові випуски публікацій' },
    pubsDesc: { ru: 'Письмо со ссылкой на скачивание при загрузке нового выпуска', en: 'Email with download link when a new issue is uploaded', he: 'מייל עם קישור להורדה כשגיליון חדש עולה', uk: 'Лист із посиланням на завантаження при виході нового випуску' },
    selectPubs: { ru: 'Выберите публикации:', en: 'Select publications:', he: ':בחר פרסומים', uk: 'Оберіть публікації:' },
    selectAll: { ru: 'Выбрать все', en: 'Select all', he: 'בחר הכל', uk: 'Обрати все' },
    deselectAll: { ru: 'Снять все', en: 'Deselect all', he: 'בטל הכל', uk: 'Зняти все' },
    selected: { ru: 'Выбрано', en: 'Selected', he: 'נבחרו', uk: 'Обрано' },
    outOf: { ru: 'из', en: 'of', he: 'מתוך', uk: 'з' },
    btn: { ru: 'Подписаться', en: 'Subscribe', he: 'הירשם', uk: 'Підписатися' },
    success: { ru: 'Вы подписаны!', en: 'You are subscribed!', he: '!נרשמת בהצלחה', uk: 'Ви підписані!' },
    successDesc: { ru: 'Уведомления придут на', en: 'Notifications will be sent to', he: 'עדכונים יישלחו ל', uk: 'Сповіщення надійдуть на' },
    errorEmail: { ru: 'Укажите email', en: 'Enter your email', he: 'הזן אימייל', uk: 'Вкажіть email' },
    errorChoice: { ru: 'Выберите хотя бы одну подписку', en: 'Select at least one subscription', he: 'בחר לפחות מנוי אחד', uk: 'Оберіть хоча б одну підписку' },
    backHome: { ru: 'На главную', en: 'Home', he: 'דף הבית', uk: 'На головну' },
    quickTitle: { ru: 'Подпишитесь на обновления', en: 'Subscribe to updates', he: 'הירשם לעדכונים', uk: 'Підпишіться на оновлення' },
    quickDesc: { ru: 'Получайте новые материалы к Шаббату на email', en: 'Get new Shabbat materials by email', he: 'קבל חומרי שבת חדשים במייל', uk: 'Отримуйте нові матеріали до Шаббату на email' },
    quickBtn: { ru: 'Подписаться', en: 'Subscribe', he: 'הירשם', uk: 'Підписатися' },
    quickSettings: { ru: 'Настроить подписку', en: 'Customize subscription', he: 'התאם מנוי', uk: 'Налаштувати підписку' },
    popupTitle: { ru: 'Не пропустите обновления!', en: "Don't miss updates!", he: '!אל תפספס עדכונים', uk: 'Не пропустіть оновлення!' },
    popupDesc: { ru: 'Подпишитесь на рассылку новых материалов к Шаббату', en: 'Subscribe to new Shabbat materials', he: 'הירשם לחומרי שבת חדשים', uk: 'Підпишіться на розсилку нових матеріалів до Шаббату' },
    langLabel: { ru: 'Язык уведомлений', en: 'Notification language', he: 'שפת התראות', uk: 'Мова сповіщень' },
  },

  // ===== Языки =====
  langNames: {
    ru: { ru: 'Русский', en: 'Russian', he: 'רוסית', uk: 'Російська' },
    en: { ru: 'English', en: 'English', he: 'אנגלית', uk: 'English' },
    he: { ru: 'עברית', en: 'עברית', he: 'עברית', uk: 'עברית' },
    uk: { ru: 'Українська', en: 'Ukrainian', he: 'אוקראינית', uk: 'Українська' },
  },

  // ===== PDF Viewer =====
  pdfViewer: {
    page: { ru: 'Стр.', en: 'Page', he: 'עמוד', uk: 'Стор.' },
    of: { ru: 'из', en: 'of', he: 'מתוך', uk: 'з' },
    singlePage: { ru: 'Одна страница', en: 'Single page', he: 'עמוד בודד', uk: 'Одна сторінка' },
    twoPages: { ru: 'Две страницы', en: 'Two pages', he: 'שני עמודים', uk: 'Дві сторінки' },
    allPages: { ru: 'Все страницы', en: 'All pages', he: 'כל העמודים', uk: 'Всі сторінки' },
    fullscreen: { ru: 'На весь экран', en: 'Fullscreen', he: 'מסך מלא', uk: 'На весь екран' },
  },

  // ===== Действия =====
  actions: {
    zoomIn: { ru: 'Увеличить', en: 'Zoom in', he: 'הגדל', uk: 'Збільшити' },
    zoomOut: { ru: 'Уменьшить', en: 'Zoom out', he: 'הקטן', uk: 'Зменшити' },
    share: { ru: 'Поделиться', en: 'Share', he: 'שתף', uk: 'Поділитися' },
    copyLink: { ru: 'Копировать ссылку', en: 'Copy link', he: 'העתק קישור', uk: 'Копіювати посилання' },
    print: { ru: 'Печать', en: 'Print', he: 'הדפס', uk: 'Друк' },
    download: { ru: 'Скачать', en: 'Download', he: 'הורד', uk: 'Завантажити' },
  },

  // ===== Сообщения =====
  messages: {
    linkCopied: { ru: 'Ссылка скопирована!', en: 'Link copied!', he: '!הקישור הועתק', uk: 'Посилання скопійовано!' },
  },

  // ===== Обратная связь (плавающий стикер) =====
  contact: {
    tooltip: { ru: 'Напишите нам', en: 'Contact us', he: 'צרו קשר', uk: 'Напишіть нам' },
    title: { ru: 'Обратная связь', en: 'Contact us', he: 'צרו קשר', uk: 'Зворотній зв\'язок' },
    name: { ru: 'Ваше имя', en: 'Your name', he: 'השם שלך', uk: 'Ваше ім\'я' },
    contactField: { ru: 'Email или телефон', en: 'Email or phone', he: 'אימייל או טלפון', uk: 'Email або телефон' },
    message: { ru: 'Сообщение', en: 'Message', he: 'הודעה', uk: 'Повідомлення' },
    send: { ru: 'Отправить', en: 'Send', he: 'שלח', uk: 'Надіслати' },
    success: { ru: 'Спасибо! Ваше сообщение отправлено.', en: 'Thank you! Your message has been sent.', he: 'תודה! ההודעה שלך נשלחה.', uk: 'Дякуємо! Ваше повідомлення надіслано.' },
    error: { ru: 'Ошибка отправки. Попробуйте позже.', en: 'Failed to send. Try again later.', he: 'שגיאה בשליחה. נסו שוב מאוחר יותר.', uk: 'Помилка надсилання. Спробуйте пізніше.' },
  },

  // ===== Парша (ивритская дата для разных языков) =====
  parsha: {
    prefix: { ru: 'Глава «', en: 'Parashat ', he: 'פרשת ', uk: 'Глава «' },
    suffix: { ru: '»', en: '', he: '', uk: '»' },
  },
} as const;

// Тип для вложенных переводов
type TranslationValue = { ru: string; en: string; he: string; uk: string };

export function t(key: string, lang: Lang): string {
  const keys = key.split('.');
  let current: any = translations;
  for (const k of keys) {
    if (current[k] === undefined) return key;
    current = current[k];
  }
  if (current && typeof current === 'object' && lang in current) {
    return (current as TranslationValue)[lang];
  }
  return key;
}

export default translations;
