import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../../../../core/models/category';
import { ProductSearchParams } from '../../../../../core/models/product';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filters.html',
  styleUrl: './filters.css'
})
export class FiltersComponent {
  @Input() categories: Category[] = [];
  @Input() brands: string[] = [];
  @Output() filterChange = new EventEmitter<ProductSearchParams>();

  selectedCategory = signal('');
  selectedBrand = signal('');
  selectedSort = signal('');
  selectedDirection = signal('asc');

  applyFilters(): void {
    const params: ProductSearchParams = {};
    if (this.selectedCategory()) params.category_id = this.selectedCategory();
    if (this.selectedBrand()) params.brand = this.selectedBrand();
    if (this.selectedSort()) params.sort_by = this.selectedSort() as any;
    params.sort_direction = this.selectedDirection() as any;
    this.filterChange.emit(params);
  }

  resetFilters(): void {
    this.selectedCategory.set('');
    this.selectedBrand.set('');
    this.selectedSort.set('');
    this.selectedDirection.set('asc');
    this.filterChange.emit({});
  }
}