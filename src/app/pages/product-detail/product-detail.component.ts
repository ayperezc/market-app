import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { Product } from '../../models/product';
import { DomSanitizer } from '@angular/platform-browser';
import { CartFacade } from '../../facades/cart.facade';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  constructor(
    private matDialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: Product,
    private sanitizer: DomSanitizer,
    private cartFacade: CartFacade
  ) {}

  addProduct(){
    this.cartFacade.addProduct(this.data);
  }

  deleteProduct(){
    this.cartFacade.deleteProduct(this.data.id);
  }

  showDelete(){
    return this.cartFacade.isProductInCart(this.data.id);
  }

  close(){
    this.matDialogRef.close()
  }

  trustedUrl(url: string){
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }
}
