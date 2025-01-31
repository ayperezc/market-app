import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  standalone: true,
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
  imports: [ReactiveFormsModule, NgIf]
})
export class PaginatorComponent {
  @Input() page = 0;
  @Input() canGoToTheNext = true;

  @Output() pageChange = new EventEmitter<number>();

  next(){
    this.page++;
    this.pageChange.emit(this.page);
  }

  previous(){
    this.page--;
    this.pageChange.emit(this.page);

  }
}
