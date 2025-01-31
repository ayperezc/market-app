import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import { ProductCategory } from '../models/product-category';

@Injectable({
  providedIn: 'root',
})
export class CategoryStore {
  private categories$ = new BehaviorSubject<ProductCategory[]>([]);

  getCategories() {
    return this.categories$.asObservable();
  }

  set categories(categories: ProductCategory[]) {
    this.categories$.next(categories);
  }
}
