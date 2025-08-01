import { redirect } from "next/navigation"
import { getAllUsersAction } from "@/app/actions/admin"
import { cookies } from "next/headers"
import { AdminPanel } from "@/components/admin/admin-panel"

export default async function AdminPage() {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get("admin-auth")?.value === "true"

  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  const users = await getAllUsersAction()

  return <AdminPanel users={users} />
}
