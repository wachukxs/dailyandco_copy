'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image?: string
}

interface ProductFormProps {
  product?: Product | null
  onClose: () => void
}

export default function ProductForm({ product, onClose }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('url')

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        image: product.image || '',
      })
    }
  }, [product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = product
        ? `/api/products/${product.id}`
        : '/api/products'
      const method = product ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          image: formData.image || undefined,
        }),
      })

      if (response.ok) {
        onClose()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save product')
      }
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Failed to save product')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // Show preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', selectedFile)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      setFormData({ ...formData, image: data.url })
      setSelectedFile(null)
      alert('Image uploaded successfully!')
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-wine-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-wine-900">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="text-wine-400 hover:text-wine-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-wine-200 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-wine-500"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-wine-200 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-wine-500"
              placeholder="Enter product description"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-wine-200 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-wine-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>
            <div className="mb-4">
              <div className="flex space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => setUploadMethod('file')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    uploadMethod === 'file'
                      ? 'bg-wine-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMethod('url')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    uploadMethod === 'url'
                      ? 'bg-wine-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Image URL
                </button>
              </div>

              {uploadMethod === 'file' ? (
                <div>
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-wine-200 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-wine-500"
                  />
                  {selectedFile && (
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="px-4 py-2 bg-wine-700 text-white rounded-lg font-medium hover:bg-wine-800 transition disabled:opacity-50"
                      >
                        {isUploading ? 'Uploading...' : 'Upload to Cloudinary'}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-wine-200 rounded-lg focus:ring-2 focus:ring-wine-500 focus:border-wine-500"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Enter a URL to an image. You can use image hosting services like Imgur, Cloudinary, etc.
                  </p>
                </div>
              )}
            </div>
          </div>

          {formData.image && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview
              </label>
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          )}

          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-wine-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-wine-300 text-wine-700 rounded-lg font-semibold hover:bg-wine-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-wine-900 text-white rounded-lg font-semibold hover:bg-wine-950 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

