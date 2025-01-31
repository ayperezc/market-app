import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { combineLatest, debounceTime, distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { CategoryFacade } from './facades/category.facade';
import { ProductFacade } from './facades/product.facade';
import { SelectOption } from './interfaces/select-option';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  products$ = this.productFacade.getProducts();
  categories$: Observable<SelectOption[]> = this.categoryFacade.getCategories()
    .pipe(
      map((categories) => categories.map(category => ({label: category.name, value: category.id})))
    );

  textFilter = new FormControl<string>('');
  categoryFilter = new FormControl<number | null>(null);

  constructor(private productFacade: ProductFacade, private categoryFacade: CategoryFacade){}

  ngOnInit(){
    this.fetchProducts();
    this.fetchCategories();
    combineLatest([
      this.textFilter.valueChanges.pipe(startWith('')),
      this.categoryFilter.valueChanges.pipe(startWith(null)),
    ]).pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(() => this.fetchProducts());
  }

  fetchProducts(){
    const title = this.textFilter.value ?? ''
    const category = this.categoryFilter.value ?? null
    this.productFacade.fetchProducts(title, category);
  }

  fetchCategories(){
    this.categoryFacade.fetchCategories()
  }
}
