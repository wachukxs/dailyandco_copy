import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ProductGrid from '@/components/ProductGrid'
import Header from '@/components/Header'
import { getProducts } from '@/lib/products'

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-wine-700 hover:text-wine-900 mb-8 transition font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-wine-900 mb-12">All Products</h1>
          <ProductGrid products={products} />
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

