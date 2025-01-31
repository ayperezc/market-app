import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  imports: [NgIf]
})
export class ProductCardComponent {
  @Input() product?: Product;
  @Output() productClick = new EventEmitter<number>()

  constructor(private sanitizer: DomSanitizer) {}

  trustedUrl(url: string){
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }

  onClickEvent(id: number) {
    this.productClick.emit(id);
  }
}
