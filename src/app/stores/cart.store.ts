import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartProduct } from '../interfaces/cart-product';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartStore {
  private cartProducts$ = new BehaviorSubject<CartProduct[]>([]);

  getCartProducts() {
    return this.cartProducts$.asObservable();
  }

  getCartProductsSnapshot() {
    return this.cartProducts$.getValue();
  }

  addProduct(product: Product) {
    const currentProducts = this.cartProducts$.getValue();
    const productIndex = currentProducts.findIndex(cp => cp.id === product.id);
    const alreadyInCart = productIndex !== -1

    if (alreadyInCart) {
      currentProducts[productIndex].quantity++;
    } else {
      currentProducts.push({ ...product, quantity: 1 });
    }

    this.cartProducts$.next(currentProducts);
  }

  deleteProduct(productId: number) {
    const currentProducts = this.cartProducts$.getValue();
    const filteredProducts = currentProducts.filter(cp => cp.id !== productId);

    this.cartProducts$.next(filteredProducts);
  }
}
