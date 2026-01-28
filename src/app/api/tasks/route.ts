import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Supabase not configured')
  return createClient(url, key)
}

// GET all tasks
export async function GET(request: NextRequest) {
  const supabase = getSupabase()
  const { searchParams } = new URL(request.url)
  const tag = searchParams.get('tag')
  const status = searchParams.get('status')

  let query = supabase.from('tasks').select('*').order('created_at', { ascending: false })
  
  if (tag) query = query.eq('tag', tag)
  if (status) query = query.eq('status', status)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// POST create new task
export async function POST(request: NextRequest) {
  const supabase = getSupabase()
  const body = await request.json()
  
  const { title, description, tag, status = 'backlog' } = body

  if (!title || !tag) {
    return NextResponse.json(
      { error: 'title and tag are required' },
      { status: 400 }
    )
  }

  const validTags = ['Socials', 'SkillStamp', 'Digital Doula', 'Copy Cat', 'Helix Health']
  if (!validTags.includes(tag)) {
    return NextResponse.json(
      { error: `tag must be one of: ${validTags.join(', ')}` },
      { status: 400 }
    )
  }

  const validStatuses = ['backlog', 'todo', 'in_progress', 'done']
  if (!validStatuses.includes(status)) {
    return NextResponse.json(
      { error: `status must be one of: ${validStatuses.join(', ')}` },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('tasks')
    .insert({
      title,
      description: description || null,
      tag,
      status,
      completed_at: status === 'done' ? new Date().toISOString() : null,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
