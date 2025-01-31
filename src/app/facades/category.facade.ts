import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { FakeStoreService } from '../api/http-requests/fake-store.service';
import { ProductStore } from '../stores/product.store';
import { CategoryStore } from '../stores/category.store';

@Injectable({
  providedIn: 'root',
})
export class CategoryFacade {
  constructor(
    private fakeStoreService: FakeStoreService,
    private categoryStore: CategoryStore
  ) {}

  fetchCategories() {
    this.fakeStoreService.getCategories().pipe(shareReplay(1)).subscribe({
      next: (res) => {
        this.categoryStore.categories = res
      },
      error: (err) => console.log(err),
    });
  }

  getCategories(){
    return this.categoryStore.getCategories();
  }
}
