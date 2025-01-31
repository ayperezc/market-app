import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from '../../pages/cart/cart.component';
import { CartFacade } from '../../facades/cart.facade';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [NgIf, AsyncPipe]
})
export class HeaderComponent {
  productQuantity$ = this.cartFacade.getProductQuantity();

  constructor(
    private matDialog: MatDialog,
    private cartFacade: CartFacade
  ){}

  openCartModal(){
    this.matDialog.open<CartComponent>(CartComponent, { width: '97.5%', maxWidth: '700px'})
  }
}
