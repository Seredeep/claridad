import { checkEmailStatus, forceUpdateEmailStatus, fixLocomotoraEmail } from "@/app/actions/admin"

export default async function DebugPage() {
  const emailStatus = await checkEmailStatus("locomotora@gmail.com")
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Email Status</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Current Status:</h2>
        <pre className="bg-gray-100 p-4 rounded mb-4">
          {JSON.stringify(emailStatus, null, 2)}
        </pre>
      </div>

      <div className="space-y-4">
        <form action={async () => {
          'use server'
          const result = await forceUpdateEmailStatus("locomotora@gmail.com")
          console.log("Force update result:", result)
        }}>
          <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Force Update Email Status
          </button>
        </form>

        <form action={async () => {
          'use server'
          const result = await fixLocomotoraEmail()
          console.log("Fix locomotora result:", result)
        }}>
          <button 
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Fix Locomotora Email (Specific)
          </button>
        </form>
      </div>

      <div className="mt-4">
        <a 
          href="/admin" 
          className="text-blue-500 hover:underline"
        >
          Go to Admin Panel
        </a>
      </div>
    </div>
  )
} 