"use server"

import { getDatabase } from "@/lib/mongodb"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function adminLogin(prevState: any, formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  if (username === "admin" && password === "claridad2024") {
    const cookieStore = await cookies()
    cookieStore.set("admin-auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
    })

    redirect("/admin")
  }

  return {
    message: "Invalid credentials",
    success: false,
  }
}

export async function adminLogout() {
  const cookieStore = await cookies()
  cookieStore.delete("admin-auth")
  redirect("/admin/login")
}

export async function toggleUserEnabled(userId: string, currentEnabled: boolean) {
  try {
    const db = await getDatabase()
    const collection = db.collection('waitlist')
    
    // Convert string ID to ObjectId if needed
    const { ObjectId } = require('mongodb')
    const objectId = ObjectId.isValid(userId) ? new ObjectId(userId) : userId
    
    const newEnabledStatus = !currentEnabled
    
    await collection.updateOne(
      { _id: objectId },
      { 
        $set: { 
          enabled: newEnabledStatus,
          updatedAt: new Date()
        }
      }
    )
    
    revalidatePath("/admin")
    return { success: true, newEnabled: newEnabledStatus }
  } catch (error) {
    console.error("Error toggling user enabled status:", error)
    return { success: false, error: "Database error" }
  }
}

export async function getAllUsersAction() {
  try {
    const db = await getDatabase()
    const collection = db.collection('waitlist')
    
    const users = await collection.find({}).sort({ createdAt: -1 }).toArray()
    
    // Convert MongoDB objects to plain JavaScript objects
    const plainUsers = users.map(user => ({
      _id: user._id.toString(),
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      location: user.location || "",
      interest: user.interest || "",
      feedback: user.feedback || "",
      enabled: user.enabled || false,
      createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
      updatedAt: user.updatedAt ? new Date(user.updatedAt) : undefined,
    }))
    
    return plainUsers
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

// Temporary function to check specific email status
export async function checkEmailStatus(email: string) {
  try {
    const db = await getDatabase()
    const collection = db.collection('waitlist')
    
    const user = await collection.findOne({ email: email.toLowerCase() })
    
    if (user) {
      return {
        found: true,
        email: user.email,
        enabled: user.enabled,
        _id: user._id.toString()
      }
    } else {
      return { found: false }
    }
  } catch (error) {
    console.error("Error checking email status:", error)
    return { found: false, error: "Database error" }
  }
}

// Function to force update email status
export async function forceUpdateEmailStatus(email: string) {
  try {
    const db = await getDatabase()
    const collection = db.collection('waitlist')
    
    const result = await collection.updateOne(
      { email: email.toLowerCase() },
      { 
        $set: { 
          enabled: true,
          updatedAt: new Date()
        }
      }
    )
    
    revalidatePath("/admin")
    return { 
      success: true, 
      modifiedCount: result.modifiedCount,
      matchedCount: result.matchedCount
    }
  } catch (error) {
    console.error("Error force updating email status:", error)
    return { success: false, error: "Database error" }
  }
}

// Function to fix specific email status
export async function fixLocomotoraEmail() {
  try {
    const db = await getDatabase()
    const collection = db.collection('waitlist')
    
    const result = await collection.updateOne(
      { email: "locomotora@gmail.com" },
      { 
        $set: { 
          enabled: true,
          updatedAt: new Date()
        }
      }
    )
    
    revalidatePath("/admin")
    return { 
      success: true, 
      modifiedCount: result.modifiedCount,
      matchedCount: result.matchedCount
    }
  } catch (error) {
    console.error("Error fixing locomotora email:", error)
    return { success: false, error: "Database error" }
  }
}
