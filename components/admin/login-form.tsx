"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { adminLogin } from "@/app/actions/admin"
import { useFormState } from "react-dom"

const initialState = {
  message: "",
  success: false,
}

export function LoginForm() {
  const [state, formAction] = useFormState(adminLogin, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input id="username" name="username" type="text" required className="mt-1" />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required className="mt-1" />
      </div>

      {state.message && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800">
          {state.message}
        </div>
      )}

      <Button type="submit" className="w-full bg-[#FF9B17] hover:bg-[#FF9B17]/90 text-white">
        Sign In
      </Button>
    </form>
  )
}
