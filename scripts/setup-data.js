// Data Setup Script
// This script initializes the data directory and waitlist.json file

const fs = require("fs").promises
const path = require("path")

async function setupData() {
  try {
    const dataDir = path.join(process.cwd(), "data")
    const waitlistFile = path.join(dataDir, "waitlist.json")

    // Create data directory if it doesn't exist
    try {
      await fs.access(dataDir)
      console.log("Data directory already exists")
    } catch {
      await fs.mkdir(dataDir, { recursive: true })
      console.log("Created data directory")
    }

    // Create waitlist.json if it doesn't exist
    try {
      await fs.access(waitlistFile)
      console.log("Waitlist file already exists")
    } catch {
      await fs.writeFile(waitlistFile, JSON.stringify([], null, 2))
      console.log("Created waitlist.json file")
    }

    console.log("Data setup complete!")
  } catch (error) {
    console.error("Error setting up data:", error)
  }
}

setupData()
