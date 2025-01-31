import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductStore {
  private products$ = new BehaviorSubject<Product[]>([]);

  getProducts() {
    return this.products$.asObservable();
  }

  set products(products: Product[]) {
    this.products$.next(products);
  }
}
