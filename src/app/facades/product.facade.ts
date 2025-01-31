import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { FakeStoreService } from '../api/http-requests/fake-store.service';
import { ProductStore } from '../stores/product.store';

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  size = 10;
  constructor(
    private fakeStoreService: FakeStoreService,
    private productStore: ProductStore
  ) {}

  fetchProducts(title: string, categoryId: number | null) {
    this.fakeStoreService.getProducts(title, categoryId).pipe(shareReplay(1)).subscribe({
      next: (products) => {
        this.productStore.products = products;
      },
      error: (err) => console.log(err),
    });
  }

  getProducts(){
    return this.productStore.getProducts();
  }

  getPaginatedProducts(page: number){

    const start = page + (this.size * page);
    const end = start + this.size
    return this.productStore.getProducts().pipe(
      map((prods) => prods.slice(start, end))
    );
  }

  canGoToTheNext(page: number){
    return this.productStore.getProducts().pipe(
      map((prods) => prods.length > (page + 2) * this.size)
    );
  }
}
