import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { adminLogout } from "@/app/actions/admin"

export function AdminHeader() {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Claridad Admin Panel</h1>
          </div>
          <form action={adminLogout}>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}
