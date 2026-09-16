import React, { useState } from 'react'
import type { Product, ProductFormData, FormErrors } from './types'

const INITIAL_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Mechanical Keyboard', price: 89.99, inStock: true, onSale: true },
  { id: 'p2', name: 'Wireless Ergonomic Mouse', price: 49.99, inStock: true, onSale: false },
  { id: 'p3', name: 'Ultra-Wide Monitor 34"', price: 399.99, inStock: false, onSale: true },
  { id: 'p4', name: 'Noise-Canceling Headphones', price: 179.99, inStock: true, onSale: true },
  { id: 'p5', name: 'USB-C Multiport Hub', price: 29.99, inStock: false, onSale: false },
]

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS)
  const [inStockOnly, setInStockOnly] = useState<boolean>(false)
  const [formData, setFormData] = useState<ProductFormData>({ name: '', price: '' })
  const [errors, setErrors] = useState<FormErrors>({})

  const displayedProducts = products.filter((product) =>
    inStockOnly ? product.inStock : true
  )

  const saleCount = displayedProducts.filter((product) => product.onSale).length

  const validate = (data: ProductFormData): FormErrors => {
    const nextErrors: FormErrors = {}
    if (!data.name.trim()) {
      nextErrors.name = 'Product name is required.'
    }
    const parsedPrice = Number(data.price)
    if (!data.price.trim()) {
      nextErrors.price = 'Price is required.'
    } else if (isNaN(parsedPrice) || parsedPrice <= 0) {
      nextErrors.price = 'Price must be a valid number greater than 0.'
    }
    return nextErrors
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validate(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    const newProduct: Product = {
      id: crypto.randomUUID(),
      name: formData.name.trim(),
      price: Number(formData.price),
      inStock: true,
      onSale: false,
    }

    setProducts((prev) => [newProduct, ...prev])
    setFormData({ name: '', price: '' })
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-5xl space-y-8">
        
        <header className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Product Catalog</h1>
          <p className="mt-1 text-sm text-slate-600">Interactive product list with live state filtering and validated entry.</p>
        </header>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Add New Product</h2>
          
          <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="product-name" className="block text-xs font-medium text-slate-700">
                Product Name
              </label>
              <input
                id="product-name"
                type="text"
                placeholder="e.g. Wireless Earbuds"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm outline-none transition focus:ring-2 ${
                  errors.name
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                    : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-100'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs font-medium text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="product-price" className="block text-xs font-medium text-slate-700">
                Price (USD)
              </label>
              <input
                id="product-price"
                type="text"
                placeholder="e.g. 29.99"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm outline-none transition focus:ring-2 ${
                  errors.price
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                    : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-100'
                }`}
              />
              {errors.price && (
                <p className="mt-1 text-xs font-medium text-red-600">{errors.price}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Add Product
              </button>
            </div>
          </form>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-700">
                {displayedProducts.length} {displayedProducts.length === 1 ? 'product' : 'products'}
              </span>
              
              {saleCount > 0 && (
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                  {saleCount} on sale
                </span>
              )}
            </div>

            <label className="flex cursor-pointer select-none items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>In stock only</span>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-slate-900">{product.name}</h3>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        product.inStock
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {product.inStock ? 'In stock' : 'Sold out'}
                    </span>
                  </div>

                  <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">ID: {product.id}</span>
                  {product.onSale && (
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                      Sale Deal
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
