import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as unknown as ReturnType<typeof createClient>

export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'done'
export type TaskTag = 'Socials' | 'SkillStamp' | 'Digital Doula' | 'Copy Cat' | 'Helix Health'

export interface Task {
  id: string
  title: string
  description: string | null
  status: TaskStatus
  tag: TaskTag
  created_at: string
  updated_at: string
  completed_at: string | null
}
