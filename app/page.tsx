import { WaitlistForm } from "@/components/waitlist-form"
import { ClaridadLogo } from "@/components/claridad-logo"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center px-6 relative pt-8">
      <div className="max-w-lg w-full text-center space-y-2">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex justify-center">
              <div className="transition-transform duration-300 hover:scale-110">
                <ClaridadLogo size="xl" className="mx-auto" />
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-6xl font-bold text-kiona-font tracking-[-0.07em] leading-tight">
                CLARIDAD
              </h1>
              <p className="text-xl text-muted-foreground leading-tight max-w-md mx-auto">
                Real-time crime maps for safer communities worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Waitlist Form */}
        <div className="space-y-6 pt-4">
          <WaitlistForm />
        </div>
      </div>
    </main>
  )
}
