import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Types
export interface Admin {
  id: number
  username: string
  password: string
  created_at: string
}

export interface Teacher {
  id: number
  username: string
  password: string
  created_at: string
}

export interface Course {
  id: number
  title: string
  description: string
  duration: string
  fee: number
  paid: boolean
  certification_given: boolean
  teacher: number
  created_at: string
}

export interface Student {
  id: number
  student_id: string // Add this new field
  name: string
  phone: string
  username: string
  password: string
  address: string
  qualification: string
  courses: CourseEnrollment[]
  created_at: string
}

export interface CourseEnrollment {
  course_title: string
  join_date: string
  paid: boolean
  approved: boolean
  completed: boolean
}

export interface Certificate {
  id: number
  certificate_id: string
  student_name: string
  course_title: string
  course_duration: string
  course_completion_date: string
  created_at: string
}

export interface Notification {
  id: number
  notification_title: string
  notification_description: string
  created_at: string
}

export interface Examination {
  id: number
  exam_title: string
  exam_description: string
  exam_date: string
  created_at: string
}

export interface Franchise {
  id: number
  name: string
  phone: string
  email: string
  qualification: string
  address: string
  username: string
  password: string
  status: "pending" | "approved" | "rejected"
  created_at: string
}

export interface Job {
  id: number
  title: string
  description: string
  qualification_required: string | null
  certificates_required: string[] | null
  status: "active" | "completed" | "closed"
  applicants: { student_id: string; application_date: string }[]
  created_at: string
}
