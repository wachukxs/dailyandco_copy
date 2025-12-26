import { getProduct, getProducts } from '@/lib/products'
import { notFound } from 'next/navigation'
import ProductDetailClient from '@/components/ProductDetailClient'
import Header from '@/components/Header'

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(parseInt(params.id))

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Product Detail */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductDetailClient product={product} />
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

