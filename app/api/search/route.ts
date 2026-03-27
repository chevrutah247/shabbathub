import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim()
  if (!q) return NextResponse.json({ results: [], total: 0 })

  const limit = Math.min(parseInt(req.nextUrl.searchParams.get('limit') || '50'), 100)
  const offset = parseInt(req.nextUrl.searchParams.get('offset') || '0')

  try {
    // Get total count
    const { data: countData } = await supabase.rpc('search_issues_count', { query: q })
    const total = typeof countData === 'number' ? countData : 0

    // Get ranked results
    const { data, error } = await supabase.rpc('search_issues', {
      query: q,
      result_limit: limit,
      result_offset: offset,
    })

    if (error) {
      console.error('Search error:', error)
      return NextResponse.json({ results: [], total: 0, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ results: data || [], total })
  } catch (err) {
    console.error('Search error:', err)
    return NextResponse.json({ results: [], total: 0 }, { status: 500 })
  }
}
