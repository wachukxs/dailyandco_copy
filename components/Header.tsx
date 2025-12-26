'use client'

import Link from 'next/link'
import { ShoppingBag, Menu } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

export default function Header() {
  const { getItemCount } = useCart()
  const itemCount = getItemCount()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-wine-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-wine-900">
            DAilY & Co.
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-wine-900 transition font-medium">
              Shop
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-wine-900 transition font-medium">
              Admin
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="p-2 text-gray-700 hover:text-wine-900 transition relative">
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-wine-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button className="md:hidden p-2 text-gray-700">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

