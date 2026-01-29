// Database types for ShabbatHub

export type Language = 'ru' | 'en' | 'he';
export type Frequency = 'daily' | 'weekly' | 'monthly' | 'irregular';
export type EventType = 'holiday' | 'fast' | 'special' | 'other';
export type DeliveryType = 'link' | 'attachment';

// User Profile
export interface Profile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  avatar_url?: string;
  preferred_language: Language;
  email_notifications: boolean;
  created_at: string;
  updated_at: string;
}

// Publication (серия газет)
export interface Publication {
  id: string;
  title_ru: string;
  title_en?: string;
  title_he?: string;
  description_ru?: string;
  description_en?: string;
  description_he?: string;
  frequency: Frequency;
  primary_language: Language;
  whatsapp_link?: string;
  telegram_link?: string;
  website_url?: string;
  email?: string;
  cover_image_url?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  total_issues: number;
  total_downloads: number;
  subscribers_count: number;
}

// Parsha (недельная глава)
export interface Parsha {
  id: number;
  order_num: number;
  name_ru: string;
  name_en: string;
  name_he: string;
  book: 'bereishit' | 'shemot' | 'vayikra' | 'bamidbar' | 'devarim';
}

// Event (праздник/событие)
export interface Event {
  id: string;
  name_ru: string;
  name_en: string;
  name_he: string;
  description_ru?: string;
  description_en?: string;
  description_he?: string;
  event_type: EventType;
  hebrew_month?: number;
  hebrew_day?: number;
  is_annual: boolean;
  is_active: boolean;
  created_by?: string;
  created_at: string;
}

// Issue (выпуск PDF)
export interface Issue {
  id: string;
  publication_id: string;
  title: string;
  description?: string;
  issue_number?: string;
  
  // Григорианская дата
  gregorian_date?: string;
  
  // Еврейская дата (все поля)
  hebrew_day?: number;
  hebrew_month?: number;
  hebrew_year?: number;
  hebrew_date_display?: string;
  
  // Привязки (могут быть одновременно!)
  parsha_id?: number;
  event_id?: string;
  
  // Файл
  pdf_url: string;
  pdf_filename?: string;
  file_size?: number;  // макс 10 МБ
  page_count?: number;
  thumbnail_url?: string;
  
  // Автор загрузки
  uploaded_by: string;
  
  // Статистика
  download_count: number;
  view_count: number;
  
  // Метаданные
  created_at: string;
  updated_at: string;
  is_active: boolean;
  
  // Joined data
  publication?: Publication;
  parsha?: Parsha;
  event?: Event;
  uploader?: Profile;
}

// WordPress Import (для миграции)
export interface WPImport {
  id: number;
  wp_post_id?: number;
  wp_title?: string;
  wp_author?: string;
  wp_date?: string;
  wp_pdf_url?: string;
  wp_pdf_filename?: string;
  detected_publication?: string;
  detected_parsha?: string;
  detected_event?: string;
  detected_language?: string;
  detected_issue_number?: string;
  is_processed: boolean;
  assigned_publication_id?: string;
  assigned_issue_id?: string;
  imported_at: string;
  processed_at?: string;
  notes?: string;
}

// Subscription
export interface Subscription {
  id: string;
  user_id: string;
  publication_id: string;
  delivery_type: DeliveryType;
  created_at: string;
  is_active: boolean;
  publication?: Publication;
}

// Favorite
export interface FavoritePublication {
  id: string;
  user_id: string;
  publication_id: string;
  created_at: string;
  publication?: Publication;
}

export interface FavoriteIssue {
  id: string;
  user_id: string;
  issue_id: string;
  created_at: string;
  issue?: Issue;
}

// Leaderboard Entry
export interface LeaderboardEntry {
  id: string;
  display_name?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  upload_count: number;
  total_downloads: number;
}

// Hebrew Date info
export interface HebrewDateInfo {
  hebrew: string;        // "10 Shvat 5786"
  hebrewFormatted: string; // "י׳ שבט תשפ״ו"
  gregorian: string;     // "2026-01-28"
  parsha?: Parsha;       // Текущая недельная глава
  isShabbat: boolean;
  upcomingShabbat: string;
}

// Translations
export interface Translations {
  [key: string]: {
    ru: string;
    en: string;
    he: string;
  };
}

// Form data for creating publication
export interface CreatePublicationForm {
  title_ru: string;
  title_en?: string;
  title_he?: string;
  description_ru?: string;
  description_en?: string;
  description_he?: string;
  frequency: Frequency;
  primary_language: Language;
  whatsapp_link?: string;
  telegram_link?: string;
  website_url?: string;
  email?: string;
  cover_image?: File;
}

// Form data for uploading issue
export interface UploadIssueForm {
  publication_id: string;
  title: string;
  description?: string;
  issue_number?: string;
  hebrew_date?: string;
  gregorian_date?: string;
  parsha_id?: number;
  event_id?: string;
  pdf_file: File;
}

// Filter options
export interface FilterOptions {
  sort: 'newest' | 'oldest' | 'alphabetical' | 'popular';
  parsha_id?: number;
  event_id?: string;
  language?: Language;
  publication_id?: string;
  year?: number;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  count?: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}
