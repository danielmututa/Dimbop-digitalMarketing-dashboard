"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Home, ShoppingCart, User, Settings, LogOut } from "lucide-react"
import { useAuthStore } from "@/context/userContext"
import { useNavigate } from "react-router-dom"

interface UserLayoutProps {
  children: React.ReactNode
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  if (!user) {
    return <div>Loading user data...</div> // Or redirect to login
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">User Dashboard</h2>
          <p className="text-sm text-gray-600">Welcome, {user.username}!</p>
        </div>
        <Separator />
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/user-dashboard")}>
            <Home className="mr-2 h-4 w-4" /> Home
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/account")}>
            <User className="mr-2 h-4 w-4" /> Account
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/orders")}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Orders
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/settings")}>
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </nav>
        <div className="pt-6">
          <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard Overview</CardTitle>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </main>
    </div>
  )
}

export default UserLayout
