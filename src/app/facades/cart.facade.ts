import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartStore } from '../stores/cart.store';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartFacade {
  constructor(
    private cartStore: CartStore
  ) {}

  getCartProducts(){
    return this.cartStore.getCartProducts();
  }

  addProduct(product: Product){
    this.cartStore.addProduct(product);
    alert(product.title + " has been added!");
  }

  deleteProduct(productId: number){
    this.cartStore.deleteProduct(productId);
  }

  getProductQuantity() {
    return this.cartStore.getCartProducts().pipe(map((prods) => (
      prods.reduce((acc, current) => acc + current.quantity, 0)
    )));
  }

  isProductInCart(productId: number){
    return this.cartStore.getCartProductsSnapshot().some(p => p.id === productId);
  }
}
