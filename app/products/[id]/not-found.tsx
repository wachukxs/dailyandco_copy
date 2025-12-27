import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-wine-900 mb-4">Product Not Found</h1>
        <p className="text-gray-700 mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/products"
          className="inline-flex items-center text-wine-700 hover:text-wine-900 transition font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>
      </div>
    </div>
  )
}

