"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { joinWaitlist } from "@/app/actions/waitlist"
import { useState, useTransition } from "react"

const initialState = {
  message: "",
  success: false,
}

export function WaitlistForm() {
  const [state, setState] = useState(initialState)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await joinWaitlist(state, formData)
      setState(result)
    })
  }

  return (
    <div className="space-y-4">
      <form action={handleSubmit} className="space-y-3">
        <div className="space-y-4">
          <Input
            name="email"
            type="email"
            required
            placeholder="Enter your email address"
            className="text-center text-lg py-4 px-6 border border-[#FF9B17]/40 focus:border-2 focus:border-[#FF9B17] focus:ring-[#FF9B17]/20 focus:ring-1 transition-all duration-200 bg-background/80 backdrop-blur-sm shadow-sm"
          />

          {state.message && (
            <div
              className={`text-sm p-4 rounded-lg border transition-all duration-200 ${
                state.success
                  ? "bg-[#FF9B17]/10 text-[#FF9B17] border-[#FF9B17]/20"
                  : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
              }`}
            >
              {state.message}
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#FF9B17] hover:bg-[#FF9B17]/90 text-white py-4 text-lg font-semibold transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        >
          {isPending ? "Verifying..." : "Verify Email"}
                  </Button>
        </form>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Already registered in our app? Verify your email here to join the waitlist.
          </p>
          <p className="text-xs text-muted-foreground/70">
            New users: Register at{" "}
            <a 
              href="https://demo.claridad.ar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#FF9B17] hover:underline"
            >
              demo.claridad.ar
            </a>{" "}
            first, then verify here.
          </p>
        </div>
      </div>
    )
}
