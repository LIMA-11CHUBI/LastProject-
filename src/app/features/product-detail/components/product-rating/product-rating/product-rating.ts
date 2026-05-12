import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-rating.html',
  styleUrl: './product-rating.css',
})
export class ProductRatingComponent {
  @Input() rating = 0;
  @Input() isLoggedIn = false;
  @Output() rate = new EventEmitter<number>();

  hoveredStar = signal(0);
  selectedStar = signal(0);
  stars = [1, 2, 3, 4, 5];

  onHover(star: number): void {
    this.hoveredStar.set(star);
  }

  onLeave(): void {
    this.hoveredStar.set(0);
  }

  onRate(star: number): void {
    if (!this.isLoggedIn) return;
    this.selectedStar.set(star);
    this.rate.emit(star);
  }
}
