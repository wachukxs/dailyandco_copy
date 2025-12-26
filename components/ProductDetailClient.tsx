'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, ArrowLeft, Plus, Minus } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { openInstagramDM } from '@/lib/instagram'
import InstagramModal from '@/components/InstagramModal'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image?: string
}

interface ProductDetailClientProps {
  product: Product
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [showInstagramModal, setShowInstagramModal] = useState(false)
  const [instagramData, setInstagramData] = useState<{ message: string; username: string } | null>(null)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
    alert(`Added ${quantity} item(s) to cart!`)
  }

  const handleBuyNow = async () => {
    const data = await openInstagramDM({
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    })
    setInstagramData(data)
    setShowInstagramModal(true)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <>
      <Link 
        href="/products" 
        className="inline-flex items-center text-wine-700 hover:text-wine-900 mb-8 transition font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square relative bg-wine-50 rounded-lg overflow-hidden border border-wine-100">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-wine-400">
              No Image
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-wine-900 mb-4">{product.name}</h1>
          <div className="mb-6">
            <p className="text-lg text-gray-600 mb-1">
              Unit Price: <span className="font-semibold">€{product.price.toFixed(2)}</span>
            </p>
            <p className="text-3xl font-semibold text-wine-700">
              Total: €{(product.price * quantity).toFixed(2)}
            </p>
          </div>
          <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>
          
          <div className="flex items-center space-x-4 mb-8">
            <span className="text-sm text-gray-700">Quantity:</span>
            <div className="flex items-center border border-wine-200 rounded-lg">
              <button 
                onClick={decreaseQuantity}
                className="p-2 hover:bg-wine-50 transition text-wine-700"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 text-wine-900 min-w-[3rem] text-center">{quantity}</span>
              <button 
                onClick={increaseQuantity}
                className="p-2 hover:bg-wine-50 transition text-wine-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-wine-900 text-white py-4 px-6 rounded-lg font-semibold hover:bg-wine-950 transition mb-4"
          >
            Add to Cart
          </button>
          <button 
            onClick={handleBuyNow}
            className="w-full border-2 border-wine-900 text-wine-900 py-4 px-6 rounded-lg font-semibold hover:bg-wine-50 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
      
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
    </>
  )
}

