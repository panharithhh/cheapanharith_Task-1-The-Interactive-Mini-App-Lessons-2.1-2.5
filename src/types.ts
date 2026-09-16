export interface Product {
  id: string
  name: string
  price: number
  inStock: boolean
  onSale: boolean
}

export interface ProductFormData {
  name: string
  price: string
}

export interface FormErrors {
  name?: string
  price?: string
}
