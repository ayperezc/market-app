import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { Product } from '../../models/product';
import { DomSanitizer } from '@angular/platform-browser';
import { CartFacade } from '../../facades/cart.facade';
import { CartProductCardComponent } from "../../ui/cart-product-card/cart-product-card.component";
import { CartProduct } from '../../interfaces/cart-product';
import { productsToCsv } from '../../utils/productsToCsv';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    CartProductCardComponent
],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  products$ = this.cartFacade.getCartProducts();

  constructor(
    private matDialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: Product,
    private sanitizer: DomSanitizer,
    private cartFacade: CartFacade
  ) {}

  deleteProduct(id: number){
    this.cartFacade.deleteProduct(id)
  }

  trustedUrl(url: string){
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }

  exportToCsv(products: CartProduct[]){
    productsToCsv(products);
  }
}
