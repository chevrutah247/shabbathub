// Centralized Supabase API functions for ShabbatHub
import { supabase } from './supabase';
import { Issue, Publication, Parsha, Event, FilterOptions, PaginatedResponse } from './types';

// ============================================
// ISSUES (выпуски PDF)
// ============================================

export async function getLatestIssues(limit: number = 6) {
  const { data, error } = await supabase
    .from('issues')
    .select(`
      *,
      publication:publications(*),
      parsha:parshiot(*),
      event:events(*)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching latest issues:', error);
    return [];
  }
  return data as Issue[];
}

export async function getIssues(options: {
  page?: number;
  pageSize?: number;
  search?: string;
  publicationId?: string;
  parshaId?: number;
  eventId?: string;
  language?: string;
  sort?: string;
} = {}) {
  const {
    page = 1,
    pageSize = 20,
    search,
    publicationId,
    parshaId,
    eventId,
    language,
    sort = 'date-desc',
  } = options;

  let query = supabase
    .from('issues')
    .select(`
      *,
      publication:publications(*),
      parsha:parshiot(*),
      event:events(*)
    `, { count: 'exact' })
    .eq('is_active', true);

  // Filters
  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
  }
  if (publicationId) {
    query = query.eq('publication_id', publicationId);
  }
  if (parshaId) {
    query = query.eq('parsha_id', parshaId);
  }
  if (eventId) {
    query = query.eq('event_id', eventId);
  }
  if (language) {
    query = query.eq('publication.primary_language', language);
  }

  // Sorting
  switch (sort) {
    case 'date-asc':
      query = query.order('gregorian_date', { ascending: true, nullsFirst: false });
      break;
    case 'title':
      query = query.order('title', { ascending: true });
      break;
    case 'popular':
      query = query.order('download_count', { ascending: false });
      break;
    case 'date-desc':
    default:
      query = query.order('gregorian_date', { ascending: false, nullsFirst: false });
      break;
  }

  // Pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching issues:', error);
    return { data: [], count: 0, page, pageSize, totalPages: 0, totalCount: 0 };
  }

  const totalCount = count || 0;
  return {
    data: data as Issue[],
    count: data?.length || 0,
    page,
    pageSize,
    totalPages: Math.ceil(totalCount / pageSize),
    totalCount,
  };
}

export async function getIssueById(id: string) {
  const { data, error } = await supabase
    .from('issues')
    .select(`
      *,
      publication:publications(*),
      parsha:parshiot(*),
      event:events(*),
      uploader:profiles(id, display_name, first_name, last_name, avatar_url)
    `)
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Error fetching issue:', error);
    return null;
  }

  // Increment view count (fire and forget)
  supabase
    .from('issues')
    .update({ view_count: (data.view_count || 0) + 1 })
    .eq('id', id)
    .then(() => {});

  return data as Issue;
}

// ============================================
// PUBLICATIONS (серии газет)
// ============================================

export async function getPublications() {
  const { data, error } = await supabase
    .from('publications')
    .select('*')
    .eq('is_active', true)
    .order('title_ru');

  if (error) {
    console.error('Error fetching publications:', error);
    return [];
  }
  return data as Publication[];
}

export async function getPublicationById(id: string) {
  const { data, error } = await supabase
    .from('publications')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Error fetching publication:', error);
    return null;
  }
  return data as Publication;
}

// ============================================
// PARSHIOT (недельные главы)
// ============================================

export async function getParshiot() {
  const { data, error } = await supabase
    .from('parshiot')
    .select('*')
    .order('order_num');

  if (error) {
    console.error('Error fetching parshiot:', error);
    return [];
  }
  return data as Parsha[];
}

// ============================================
// EVENTS (праздники)
// ============================================

export async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .order('name_ru');

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  return data as Event[];
}

// ============================================
// SEARCH
// ============================================

export async function searchIssues(query: string, limit: number = 20) {
  const { data, error } = await supabase
    .from('issues')
    .select(`
      *,
      publication:publications(*),
      parsha:parshiot(*),
      event:events(*)
    `)
    .eq('is_active', true)
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order('gregorian_date', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error searching issues:', error);
    return [];
  }
  return data as Issue[];
}

// ============================================
// STATS (для главной страницы)
// ============================================

export async function getSiteStats() {
  const { count: issueCount } = await supabase
    .from('issues')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  const { count: pubCount } = await supabase
    .from('publications')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  return {
    totalIssues: issueCount || 0,
    totalPublications: pubCount || 0,
  };
}
