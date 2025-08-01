const { MongoClient } = require('mongodb')

async function addTestUser() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
  const client = new MongoClient(uri)
  
  try {
    await client.connect()
    const db = client.db('demo')
    const collection = db.collection('waitlist')
    
    const testUser = {
      firstName: 'Test',
      lastName: 'User',
      email: 'mensaje@gmail.com',
      location: 'Test Location',
      interest: 'Safety',
      feedback: 'Test feedback',
      enabled: false,
      createdAt: new Date()
    }
    
    // Check if user already exists
    const existingUser = await collection.findOne({ email: testUser.email.toLowerCase() })
    
    if (existingUser) {
      console.log('User already exists:', existingUser.email)
    } else {
      const result = await collection.insertOne(testUser)
      console.log('Test user added successfully:', result.insertedId)
    }
    
  } catch (error) {
    console.error('Error adding test user:', error)
  } finally {
    await client.close()
  }
}

addTestUser() 