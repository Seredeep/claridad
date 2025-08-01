import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { ClaridadLogo } from "@/components/claridad-logo"

export default function MessagePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md text-center space-y-6">
        <ClaridadLogo size="lg" className="mx-auto" />

        <CheckCircle className="h-16 w-16 text-[#FF9B17] mx-auto" />

        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2 kiona-font">Welcome to CLARIDAD!</h1>
          <p className="text-muted-foreground mb-6">Join our waitlist to get early access when we launch.</p>
        </div>

        <Button asChild className="w-full bg-[#FF9B17] hover:bg-[#FF9B17]/90 text-white">
          <Link href="/">Join Waitlist</Link>
        </Button>
      </div>
    </div>
  )
}
