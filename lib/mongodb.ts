import { MongoClient, Db } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export interface WaitlistUser {
  _id?: string
  firstName: string
  lastName: string
  email: string
  location: string
  interest: string
  feedback: string
  enabled: boolean
  createdAt: Date
  updatedAt?: Date
}

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise
  return client.db('demo')
}

export async function findUserByEmail(email: string): Promise<WaitlistUser | null> {
  const db = await getDatabase()
  const collection = db.collection('waitlist')
  
  const user = await collection.findOne({ email: email.toLowerCase() })
  return user as WaitlistUser | null
}

export async function updateUserEnabled(email: string, enabled: boolean): Promise<void> {
  const db = await getDatabase()
  const collection = db.collection('waitlist')
  
  await collection.updateOne(
    { email: email.toLowerCase() },
    { 
      $set: { 
        enabled: enabled,
        updatedAt: new Date()
      }
    }
  )
}

export async function verifyUserEmail(email: string): Promise<void> {
  const db = await getDatabase()
  const collection = db.collection('waitlist')
  
  await collection.updateOne(
    { email: email.toLowerCase() },
    { 
      $set: { 
        enabled: true,
        updatedAt: new Date()
      }
    }
  )
}

export async function addUserToWaitlist(userData: Omit<WaitlistUser, '_id' | 'createdAt' | 'enabled'>): Promise<WaitlistUser> {
  const db = await getDatabase()
  const collection = db.collection('waitlist')
  
  const newUser = {
    ...userData,
    email: userData.email.toLowerCase(),
    enabled: true,
    createdAt: new Date(),
  }
  
  const result = await collection.insertOne(newUser)
  return { ...newUser, _id: result.insertedId.toString() } as WaitlistUser
} 