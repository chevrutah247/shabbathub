import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim()
  const tags = req.nextUrl.searchParams.get('tags')?.split(',').filter(Boolean)

  if (!q && (!tags || tags.length === 0)) {
    return NextResponse.json({ results: [], total: 0 })
  }

  const limit = Math.min(parseInt(req.nextUrl.searchParams.get('limit') || '50'), 100)
  const offset = parseInt(req.nextUrl.searchParams.get('offset') || '0')

  try {
    // If only tags filter (no text query), use direct DB query
    if (!q && tags && tags.length > 0) {
      const { data, error, count } = await supabase
        .from('issues')
        .select('id, title, pdf_url, thumbnail_url, gregorian_date, publication_id, parsha_id, event_id, issue_number, ai_summary, description, topic_keys', { count: 'exact' })
        .eq('is_active', true)
        .overlaps('topic_keys', tags)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        console.error('Tag filter error:', error)
        return NextResponse.json({ results: [], total: 0, error: error.message }, { status: 500 })
      }
      return NextResponse.json({ results: data || [], total: count || 0 })
    }

    // Full-text search (optionally filtered by tags)
    const { data: countData } = await supabase.rpc('search_issues_count', { query: q! })
    const total = typeof countData === 'number' ? countData : 0

    const { data, error } = await supabase.rpc('search_issues', {
      query: q!,
      result_limit: limit,
      result_offset: offset,
    })

    if (error) {
      console.error('Search error:', error)
      return NextResponse.json({ results: [], total: 0, error: error.message }, { status: 500 })
    }

    // Post-filter by tags if both query and tags provided
    let results = data || []
    let finalTotal = total
    if (tags && tags.length > 0 && results.length > 0) {
      // We need to fetch topic_keys for the matched issues and filter
      const ids = results.map((r: { id: string }) => r.id)
      const { data: withTags } = await supabase
        .from('issues')
        .select('id, topic_keys')
        .in('id', ids)
      const tagMap = new Map((withTags || []).map((t: { id: string; topic_keys: string[] | null }) => [t.id, t.topic_keys || []]))
      results = results.filter((r: { id: string }) => {
        const rTags = tagMap.get(r.id) || []
        return tags.some(t => rTags.includes(t))
      })
      finalTotal = results.length
    }

    return NextResponse.json({ results, total: finalTotal })
  } catch (err) {
    console.error('Search error:', err)
    return NextResponse.json({ results: [], total: 0 }, { status: 500 })
  }
}
