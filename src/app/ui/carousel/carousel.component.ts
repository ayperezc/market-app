import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-carousel',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  @Input() products!: Product[];
  selectedProduct = 0

  prev(){
    if(this.selectedProduct > 0) this.selectedProduct--;
  }

  next(){
    if(this.selectedProduct < this.products.length - 1){
      this.selectedProduct++;
    }
  }
}
