import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, debounceTime, distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { CategoryFacade } from '../../facades/category.facade';
import { ProductFacade } from '../../facades/product.facade';
import { SelectOption } from '../../interfaces/select-option';
import { Product } from '../../models/product';
import { FilterBarComponent } from '../../ui/filter-bar/filter-bar.component';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { HeaderComponent } from '../../ui/header/header.component';
import { PaginatorComponent } from "../../ui/paginator/paginator.component";
import { CarouselComponent } from "../../ui/carousel/carousel.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    ProductCardComponent,
    FilterBarComponent,
    HeaderComponent,
    PaginatorComponent,
    CarouselComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  page = 0;
  products$ = this.productFacade.getPaginatedProducts(this.page);
  canGoTotheNext$ = this.productFacade.canGoToTheNext(this.page);
  categories$: Observable<SelectOption[]> = this.categoryFacade.getCategories()
    .pipe(
      map((categories) => categories.map(category => ({label: category.name, value: category.id})))
    );

  textFilter = new FormControl<string>('');
  categoryFilter = new FormControl<number>(0);

  constructor(
    private productFacade: ProductFacade,
    private categoryFacade: CategoryFacade,
    private matDialog: MatDialog
  ){}

  ngOnInit(){
    this.fetchProducts();
    this.fetchCategories();
    combineLatest([
      this.textFilter.valueChanges.pipe(startWith('')),
      this.categoryFilter.valueChanges.pipe(startWith(0)),
    ]).pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(() => this.fetchProducts());
  }

  goToProduct(product: Product){
    this.matDialog.open<ProductDetailComponent, Product>(
      ProductDetailComponent, { width: '97.5%', maxWidth: '1000px', data: product }
    )
  }

  pageChangeEvent(){
    this.products$ = this.productFacade.getPaginatedProducts(this.page);
    this.canGoTotheNext$ = this.productFacade.canGoToTheNext(this.page);
  }

  fetchProducts(){
    const title = this.textFilter.value ?? ''
    const category = this.categoryFilter.value ?? null
    this.page = 0;
    this.pageChangeEvent()
    this.productFacade.fetchProducts(title, category);
  }

  fetchCategories(){
    this.categoryFacade.fetchCategories()
  }
}
