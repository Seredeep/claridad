import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ClaridadLogo } from "@/components/claridad-logo"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
         <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40 shadow-xl">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                 <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
                         <Link href="/" className="flex items-center gap-2 group">
               <div className="transition-transform duration-200 group-hover:scale-105">
                 <ClaridadLogo size="sm" />
               </div>
               <span className="text-xl font-bold text-foreground tracking-[-0.04em]">CLARIDAD</span>
             </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <Button 
              asChild 
              variant="outline" 
              size="sm"
              className="border-border/40 hover:border-border/60 transition-all duration-200 hover:shadow-sm"
            >
              <Link href="https://demo.claridad.ar" target="_blank" rel="noopener noreferrer">
                Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 