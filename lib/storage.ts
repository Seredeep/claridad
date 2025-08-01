import { promises as fs } from "fs"
import path from "path"

export interface WaitlistUser {
  id: string
  firstName: string
  lastName: string
  email: string
  location: string
  interest: string
  feedback: string
  status: "pending" | "approved" | "rejected"
  createdAt: Date
  updatedAt?: Date
}

const DATA_FILE = path.join(process.cwd(), "data", "waitlist.json")

async function ensureDataDir() {
  const dataDir = path.dirname(DATA_FILE)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

async function readData(): Promise<WaitlistUser[]> {
  try {
    await ensureDataDir()
    const data = await fs.readFile(DATA_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writeData(users: WaitlistUser[]): Promise<void> {
  await ensureDataDir()
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2))
}

export async function getAllUsers(): Promise<WaitlistUser[]> {
  return await readData()
}

export async function addUser(userData: Omit<WaitlistUser, "id" | "createdAt">): Promise<WaitlistUser> {
  const users = await readData()

  // Check if email already exists
  const existingUser = users.find((user) => user.email === userData.email)
  if (existingUser) {
    throw new Error("Email already exists")
  }

  const newUser: WaitlistUser = {
    ...userData,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
  }

  users.push(newUser)
  await writeData(users)
  return newUser
}

export async function updateUserStatus(id: string, status: WaitlistUser["status"]): Promise<void> {
  const users = await readData()
  const userIndex = users.findIndex((user) => user.id === id)

  if (userIndex === -1) {
    throw new Error("User not found")
  }

  users[userIndex].status = status
  users[userIndex].updatedAt = new Date()
  await writeData(users)
}
