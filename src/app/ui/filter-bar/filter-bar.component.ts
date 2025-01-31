import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectOption } from '../../interfaces/select-option';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css',
  imports: [ReactiveFormsModule, NgIf, NgFor]
})
export class FilterBarComponent {
  @Input() textFilter!: FormControl;
  @Input() categoryFilter!: FormControl;
  @Input() categoryOptions: SelectOption[] | null = null;
}
