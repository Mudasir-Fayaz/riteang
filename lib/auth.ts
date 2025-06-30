import { supabase } from "./supabase"

/* -------------------------------------------------------------------------- */
/*                               Type Definitions                             */
/* -------------------------------------------------------------------------- */

export type UserRole = "admin" | "teacher" | "student" | "franchise"

export interface AuthUser {
  id: number
  /** username or email shown in the UI */
  username: string
  /** role decides which dashboard to render */
  role: UserRole
  /** only for franchise users (pending / approved / rejected) */
  status?: string
}

/* -------------------------------------------------------------------------- */
/*                              LocalStorage Keys                             */
/* -------------------------------------------------------------------------- */

const USER_STORAGE_KEY = "rite_education_user"

/* -------------------------------------------------------------------------- */
/*                          Client-Side Session Helpers                       */
/* -------------------------------------------------------------------------- */

/** Persist an authenticated user in `localStorage`. */
export function storeUser(user: AuthUser): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  }
}

/** Retrieve the currently stored user (or `null`). */
export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem(USER_STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

/** Remove user data from `localStorage`. */
export function clearStoredUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_STORAGE_KEY)
  }
}

/* -------------------------------------------------------------------------- */
/*                              Auth / Register API                           */
/* -------------------------------------------------------------------------- */

/**
 * Log a user in by role; returns the `AuthUser` on success or `null` on failure.
 * Also stores the user in localStorage for client-side session persistence.
 */
export async function loginUser(username: string, password: string, role: UserRole): Promise<AuthUser | null> {
  try {
    const table =
      role === "admin" ? "admin" : role === "teacher" ? "teachers" : role === "student" ? "students" : "franchise"

    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single()

    if (error || !data) return null

    const user: AuthUser = {
      id: data.id,
      username: data.username,
      role,
      status: role === "franchise" ? data.status : undefined,
    }

    storeUser(user)
    return user
  } catch (err) {
    console.error("Login error:", err)
    return null
  }
}

/* ----------------------------- Student Sign-Up ---------------------------- */

/**
 * Register a new student.
 * Returns `{ success, message }` describing the outcome.
 */
export async function registerStudent(studentData: {
  name: string
  phone: string
  username: string
  password: string
  address: string
  qualification: string
}): Promise<{ success: boolean; message: string }> {
  try {
    /* Check for duplicate username */
    const { data: existing } = await supabase
      .from("students")
      .select("username")
      .eq("username", studentData.username)
      .maybeSingle()

    if (existing) return { success: false, message: "Username already exists. Please choose a different username." }

    /* Generate next student ID (S10, S11, …) */
    const { data: last } = await supabase
      .from("students")
      .select("student_id")
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle()

    const nextNumber =
      last?.student_id && /^S\d+$/.test(last.student_id) ? Number.parseInt(last.student_id.slice(1)) + 1 : 10
    const student_id = `S${nextNumber}`

    const { error } = await supabase.from("students").insert([
      {
        ...studentData,
        student_id,
        courses: [],
      },
    ])

    if (error) throw error

    return { success: true, message: "Registration successful!" }
  } catch (err) {
    console.error("Student registration error:", err)
    return { success: false, message: "An error occurred during registration." }
  }
}

/* ---------------------------- Franchise Sign-Up --------------------------- */

/**
 * Register a new franchise.
 * Returns `{ success, message }` describing the outcome.
 */
export async function registerFranchise(franchiseData: {
  name: string
  phone: string
  email: string
  qualification: string
  address: string
  username: string
  password: string
}): Promise<{ success: boolean; message: string }> {
  try {
    /* Duplicate username? */
    const { data: existingUser } = await supabase
      .from("franchise")
      .select("username")
      .eq("username", franchiseData.username)
      .maybeSingle()
    if (existingUser) return { success: false, message: "Username already exists. Please choose a different username." }

    /* Duplicate email? */
    const { data: existingEmail } = await supabase
      .from("franchise")
      .select("email")
      .eq("email", franchiseData.email)
      .maybeSingle()
    if (existingEmail) return { success: false, message: "Email already registered. Please use a different email." }

    const { error } = await supabase.from("franchise").insert([
      {
        ...franchiseData,
        status: "pending", // new franchises await admin approval
      },
    ])

    if (error) throw error

    return {
      success: true,
      message: "Registration successful! Your account is pending approval.",
    }
  } catch (err) {
    console.error("Franchise registration error:", err)
    return { success: false, message: "An error occurred during registration." }
  }
}
