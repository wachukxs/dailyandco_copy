import fs from 'fs'
import path from 'path'

export interface Product {
  id: number
  name: string
  description: string
  price: number
  image?: string
  createdAt: string
  updatedAt: string
}

const dataFilePath = path.join(process.cwd(), 'data', 'products.json')

function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

function readProducts(): Product[] {
  ensureDataDirectory()
  if (!fs.existsSync(dataFilePath)) {
    return []
  }
  try {
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error('Error reading products:', error)
    return []
  }
}

function writeProducts(products: Product[]) {
  ensureDataDirectory()
  fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2))
}

export async function getProducts(): Promise<Product[]> {
  return readProducts()
}

export async function getProduct(id: number): Promise<Product | null> {
  const products = readProducts()
  return products.find(p => p.id === id) || null
}

export async function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  const products = readProducts()
  const newProduct: Product = {
    ...product,
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  products.push(newProduct)
  writeProducts(products)
  return newProduct
}

export async function updateProduct(id: number, updates: Partial<Product>): Promise<Product | null> {
  const products = readProducts()
  const index = products.findIndex(p => p.id === id)
  if (index === -1) {
    return null
  }
  products[index] = {
    ...products[index],
    ...updates,
    id,
    updatedAt: new Date().toISOString(),
  }
  writeProducts(products)
  return products[index]
}

export async function deleteProduct(id: number): Promise<boolean> {
  const products = readProducts()
  const filtered = products.filter(p => p.id !== id)
  if (filtered.length === products.length) {
    return false
  }
  writeProducts(filtered)
  return true
}

