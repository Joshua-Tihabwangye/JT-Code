"use client"

import { useState } from "react"
import { Search, ShoppingBag, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-bold tracking-tight">B&G</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Search */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input placeholder="Search products..." className="pl-10 bg-muted/50 border-border" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => router.push('/auth')}>
              <User size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </Button>
          </div>

        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-4">
              
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Shop
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Collections
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
              </a>
              <div className="pt-4">
                <Input placeholder="Search products..." className="bg-muted/50 border-border" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
