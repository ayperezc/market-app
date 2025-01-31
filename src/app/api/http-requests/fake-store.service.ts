import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductsResponse } from '../dtos/products-response.dto';
import { CategoriesResponse } from '../dtos/categories-response.dto';

@Injectable({
  providedIn: 'root',
})
export class FakeStoreService {
  private URL = `${environment.api}`;

  constructor(private readonly http: HttpClient) {}

  getProducts(title: string, categoryId: number | null): Observable<ProductsResponse> {
    let params = new HttpParams();
    if (title !== '') params = params.set('title', title);
    if (categoryId) params = params.set('categoryId', categoryId);

    return this.http.get<ProductsResponse>(`${this.URL}/products`, {
      params,
    });
  }

  getCategories(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(`${this.URL}/categories`);
  }
}
