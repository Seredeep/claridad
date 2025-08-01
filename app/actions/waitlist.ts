"use server"

import { findUserByEmail, verifyUserEmail, addUserToWaitlist } from "@/lib/mongodb"
import { revalidatePath } from "next/cache"

export async function joinWaitlist(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email") as string

    // Validate email
    if (!email) {
      return {
        message: "Please enter your email address.",
        success: false,
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        message: "Please enter a valid email address.",
        success: false,
      }
    }

    // Check if user already exists in MongoDB
    const existingUser = await findUserByEmail(email)

    if (existingUser) {
      // User exists, check if enabled
      if (!existingUser.enabled) {
        // Activate the user
        await verifyUserEmail(email)
        revalidatePath("/admin")
        return {
          message: "🎉 Email verified! You're now on our waitlist.",
          success: true,
        }
      } else {
        // User is already active - cannot deactivate from waitlist
        return {
          message: "You're already on our active waitlist!",
          success: false,
        }
      }
    } else {
      // User not found - they need to register in the app first
      return {
        message: "Email not found. Please register in our app first at demo.claridad.ar, then verify your email here.",
        success: false,
      }
    }
  } catch (error) {
    console.error("Error joining waitlist:", error)

    return {
      message: "Something went wrong. Please try again.",
      success: false,
    }
  }
}
