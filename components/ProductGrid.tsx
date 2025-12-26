import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: number
  name: string
  price: number
  image?: string
  description?: string
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products available yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="group"
        >
          <div className="bg-white rounded-lg overflow-hidden border border-wine-100 hover:border-wine-300 hover:shadow-xl transition-all duration-300">
            <div className="aspect-square relative bg-wine-50 overflow-hidden">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-wine-400">
                  No Image
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-wine-900 mb-2 line-clamp-2 group-hover:text-wine-950 transition">
                {product.name}
              </h3>
              <p className="text-lg font-bold text-wine-700">
                €{product.price.toFixed(2)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

