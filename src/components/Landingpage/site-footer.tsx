import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Instagram, XIcon } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-purple-dark text-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">TechRevive</h3>
          <p className="text-sm text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis esse non volupt!
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <MapPin className="h-4 w-4" />
            <span>Lucky Street</span>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Navigation</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="#" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Aboutus
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Shop
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Blogs
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Quick Link</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="#" className="hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                FAQS
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Blogarticle
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Account
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Services</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="#" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Whitelist
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Categories
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between text-sm text-gray-300">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>+263-774006306</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>type@gmail.com</span>
          </div>
        </div>
        <div className="flex gap-4">
          <Link href="#" aria-label="Facebook">
            <Facebook className="h-6 w-6 hover:text-gray-100" />
          </Link>
          <Link href="#" aria-label="Instagram">
            <Instagram className="h-6 w-6 hover:text-gray-100" />
          </Link>
          <Link href="#" aria-label="X (Twitter)">
            <XIcon className="h-6 w-6 hover:text-gray-100" />
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-8 text-center text-sm text-gray-300">
        <p>&copy;2025 Zimnext Solutions. All Rights Reserved</p>
      </div>
    </footer>
  )
}
