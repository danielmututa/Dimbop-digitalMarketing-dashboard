import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Mountain, Search, ShoppingCart, User, ChevronDown } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="w-full bg-white dark:bg-gray-950 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Top Bar: Logo, Search, User/Cart */}
        <div className="flex items-center gap-4">
          <Link href="#" className="flex items-center justify-center gap-2 text-lg font-bold">
            <Mountain className="h-6 w-6" />
            <span>BestShop</span>
          </Link>
          <div className="relative flex-1 max-w-md hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search product..."
              className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1">
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">Account</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Login</DropdownMenuItem>
              <DropdownMenuItem>Register</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
        </div>
      </div>
      {/* Bottom Bar: Navigation Links */}
      <nav className="bg-gray-100 dark:bg-gray-900 px-4 py-2 border-t border-b">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Home
            </Link>
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Collection
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Shop
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              About Us
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Contact Us
            </Link>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1">
                <span className="hidden sm:inline">All Categories</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Smartphones</DropdownMenuItem>
              <DropdownMenuItem>Laptops</DropdownMenuItem>
              <DropdownMenuItem>Headphones</DropdownMenuItem>
              <DropdownMenuItem>Cameras</DropdownMenuItem>
              <DropdownMenuItem>Accessories</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  )
}
