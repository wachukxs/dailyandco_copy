import Link from 'next/link'
import ProductGrid from '@/components/ProductGrid'
import Header from '@/components/Header'
import { getProducts } from '@/lib/products'

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-wine-50 via-white to-wine-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-wine-900 mb-6">
              Welcome to DAilY & Co.
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Discover our curated collection of beautiful products
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-wine-900">Our Products</h2>
            <Link 
              href="/products" 
              className="text-wine-700 hover:text-wine-900 transition underline font-medium"
            >
              View All
            </Link>
          </div>
          <ProductGrid products={products.slice(0, 8)} />
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

