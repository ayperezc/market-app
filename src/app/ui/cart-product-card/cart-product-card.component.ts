import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { DomSanitizer } from '@angular/platform-browser';
import { CartProduct } from '../../interfaces/cart-product';

@Component({
  selector: 'app-cart-product-card',
  standalone: true,
  templateUrl: './cart-product-card.component.html',
  styleUrl: './cart-product-card.component.css',
  imports: [NgIf]
})
export class CartProductCardComponent {
  @Input() product!: CartProduct;
  @Output() deleteClick = new EventEmitter<number>()

  constructor(private sanitizer: DomSanitizer) {}

  trustedUrl(url: string){
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }

  onDeleteEvent() {
    this.deleteClick.emit(this.product.id);
  }
}
