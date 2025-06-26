import { supabase } from "./supabase"

export type UserRole = "admin" | "teacher" | "student" | "franchise"

export interface AuthUser {
  id: number
  username: string
  role: UserRole
}

export async function loginUser(username: string, password: string, role: UserRole): Promise<AuthUser | null> {
  try {
    const { data, error } = await supabase
      .from(
        role === "admin" ? "admin" : role === "teacher" ? "teachers" : role === "student" ? "students" : "franchise",
      )
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single()

    if (error || !data) {
      return null
    }

    // Removed the status check for franchise users here.
    // Franchise users can now log in regardless of their status (pending, approved, rejected).
    // Their dashboard will display their current status.

    return {
      id: data.id,
      username: data.username,
      role,
    }
  } catch (error) {
    console.error("Login error:", error)
    return null
  }
}

export async function registerStudent(studentData: {
  name: string
  phone: string
  username: string
  password: string
  address: string
  qualification: string
}): Promise<{ success: boolean; message: string }> {
  try {
    // Check if username already exists
    const { data: existingUser } = await supabase
      .from("students")
      .select("username")
      .eq("username", studentData.username)
      .single()

    if (existingUser) {
      return { success: false, message: "Username already exists. Please choose a different username." }
    }

    // Generate unique student ID
    const { data: lastStudent } = await supabase
      .from("students")
      .select("student_id")
      .order("id", { ascending: false })
      .limit(1)
      .single()

    let nextId = 10 // Start from S10
    if (lastStudent?.student_id) {
      const lastIdNumber = Number.parseInt(lastStudent.student_id.replace("S", ""))
      nextId = lastIdNumber + 1
    }

    const student_id = `S${nextId}`

    const { error } = await supabase.from("students").insert([
      {
        ...studentData,
        student_id,
        courses: [],
      },
    ])

    if (error) {
      return { success: false, message: "Registration failed. Please try again." }
    }

    return { success: true, message: "Registration successful!" }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, message: "An error occurred during registration." }
  }
}

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
    // Check if username already exists
    const { data: existingUser } = await supabase
      .from("franchise")
      .select("username")
      .eq("username", franchiseData.username)
      .single()

    if (existingUser) {
      return { success: false, message: "Username already exists. Please choose a different username." }
    }

    // Check if email already exists
    const { data: existingEmail } = await supabase
      .from("franchise")
      .select("email")
      .eq("email", franchiseData.email)
      .single()

    if (existingEmail) {
      return { success: false, message: "Email already registered. Please use a different email." }
    }

    const { error } = await supabase.from("franchise").insert([
      {
        ...franchiseData,
        status: "pending", // Set initial status to pending
      },
    ])

    if (error) {
      return { success: false, message: "Registration failed. Please try again." }
    }

    return { success: true, message: "Registration successful! Your account is pending approval." }
  } catch (error) {
    console.error("Franchise registration error:", error)
    return { success: false, message: "An error occurred during registration." }
  }
}
