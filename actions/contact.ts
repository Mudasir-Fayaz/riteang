"use server"

import { supabase } from "@/lib/supabase"
import { type Contact } from "@/lib/supabase" // Import the Contact type

export async function submitContactForm(formData: FormData) {
  const fullname = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const message = formData.get("message") as string

  if (!fullname || !email || !message) {
    return { success: false, message: "Name, email, and message are required." }
  }

  try {
    const { error } = await supabase.from('contacts').insert([{
      fullname,
      email,
      phone: phone || null, // Store as null if phone is empty
      message
    }] as Contact[]); // Cast to Contact[] to ensure type safety

    if (error) {
      console.error("Error saving contact message:", error);
      return { success: false, message: "Failed to send message. Please try again." };
    }

    console.log("Contact form submission received and saved:", { fullname, email, phone, message })

    return { success: true, message: "Your message has been sent successfully!" }
  } catch (error) {
    console.error("An unexpected error occurred during contact form submission:", error)
    return { success: false, message: "An unexpected error occurred." }
  }
}
