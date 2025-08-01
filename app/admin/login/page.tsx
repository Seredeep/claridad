import { LoginForm } from "@/components/admin/login-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { ClaridadLogo } from "@/components/claridad-logo"

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <ClaridadLogo size="lg" className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground kiona-font">CLARIDAD</h2>
          <p className="text-muted-foreground mt-2">Admin Login</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
