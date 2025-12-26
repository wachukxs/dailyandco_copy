import { NextRequest, NextResponse } from 'next/server'
import { getProducts, createProduct } from '@/lib/products'

export async function GET() {
  try {
    const products = await getProducts()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, image } = body

    if (!name || !description || price === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const product = await createProduct({
      name,
      description,
      price: parseFloat(price),
      image: image || undefined,
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

