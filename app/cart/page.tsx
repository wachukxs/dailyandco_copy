'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, ArrowLeft, Plus, Minus, Trash2, Instagram } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { openInstagramDMCart } from '@/lib/instagram'
import InstagramModal from '@/components/InstagramModal'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotal } = useCart()
  const [showInstagramModal, setShowInstagramModal] = useState(false)
  const [instagramData, setInstagramData] = useState<{ message: string; username: string } | null>(null)

  const handleBuyNow = async () => {
    if (items.length === 0) {
      alert('Your cart is empty!')
      return
    }
    const data = await openInstagramDMCart(
      items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      getTotal()
    )
    setInstagramData(data)
    setShowInstagramModal(true)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
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
              <Link href="/cart" className="p-2 text-gray-700 hover:text-wine-900 transition relative">
                <ShoppingBag className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </header>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              href="/products" 
              className="inline-flex items-center text-wine-700 hover:text-wine-900 mb-8 transition font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-wine-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-wine-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Add some products to get started!</p>
              <Link
                href="/products"
                className="inline-block bg-wine-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-wine-950 transition"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-wine-950 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-lg font-semibold mb-2">DAilY & Co.</p>
              <p className="text-sm text-wine-200">© 2024 DAilY & Co. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
            <Link href="/cart" className="p-2 text-gray-700 hover:text-wine-900 transition relative">
              <ShoppingBag className="w-6 h-6" />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 bg-wine-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/products" 
            className="inline-flex items-center text-wine-700 hover:text-wine-900 mb-8 transition font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>

          <h1 className="text-4xl font-bold text-wine-900 mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-wine-100 rounded-lg p-6 flex items-center space-x-4"
                >
                  {item.image ? (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-wine-50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-lg bg-wine-100 flex items-center justify-center text-wine-400 text-xs">
                      No Image
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-wine-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      €{item.price.toFixed(2)} each
                    </p>
                    <p className="text-wine-700 font-semibold">
                      Total: €{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center border border-wine-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-wine-50 transition text-wine-700"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 text-wine-900 min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-wine-50 transition text-wine-700"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition"
                      title="Remove"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-wine-50 border border-wine-100 rounded-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-wine-900 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>€{getTotal().toFixed(2)}</span>
                  </div>
                  <div className="border-t border-wine-200 pt-4">
                    <div className="flex justify-between text-wine-900 font-bold text-lg">
                      <span>Total</span>
                      <span>€{getTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-wine-900 text-white py-4 px-6 rounded-lg font-semibold hover:bg-wine-950 transition mb-4 flex items-center justify-center space-x-2"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Buy Now via Instagram</span>
                </button>
                <button
                  onClick={clearCart}
                  className="w-full border border-wine-300 text-wine-700 py-3 px-6 rounded-lg font-semibold hover:bg-wine-100 transition"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-wine-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">DAilY & Co.</p>
            <p className="text-sm text-wine-200">© 2024 DAilY & Co. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showInstagramModal && instagramData && (
        <InstagramModal
          message={instagramData.message}
          username={instagramData.username}
          onClose={() => {
            setShowInstagramModal(false)
            setInstagramData(null)
          }}
        />
      )}
    </div>
  )
}

