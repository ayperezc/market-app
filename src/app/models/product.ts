import { ProductCategory } from "./product-category"

export interface Product {
  id: number,
  title: string,
  price: number,
  description: string,
  category: ProductCategory,
  images: string[]
}
