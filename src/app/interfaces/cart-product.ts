import { Product } from "../models/product";

export interface CartProduct extends Product {
  quantity: number;
}
