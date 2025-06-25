import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Student {
  id: string
  name: string
  email: string
  department: string
  semester: number
  enrollment_number: string
  created_at: string
}

export interface Mark {
  id: string
  student_id: string
  subject: string
  marks: number
  max_marks: number
  exam_date: string
  exam_type: 'midterm' | 'final' | 'assignment' | 'quiz'
  created_at: string
}

export interface Attendance {
  id: string
  student_id: string
  date: string
  status: 'present' | 'absent' | 'late'
  subject: string
  created_at: string
}

export interface Assignment {
  id: string
  student_id: string
  title: string
  subject: string
  due_date: string
  status: 'pending' | 'submitted' | 'late' | 'graded'
  score?: number
  created_at: string
}

export interface UserProfile {
  id: string
  email: string
  role: 'student' | 'staff' | 'admin'
  name: string
  department?: string
  created_at: string
}