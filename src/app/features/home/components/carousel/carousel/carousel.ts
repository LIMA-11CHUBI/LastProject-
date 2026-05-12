import { Component,OnInit, OnDestroy, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../../../core/models/product';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css'
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() products: Product[] = [];
  currentIndex = signal(0);
  private interval: any;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    this.interval = setInterval(() => {
      this.next();
    }, 3000);
  }

  stopAutoPlay(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  next(): void {
    this.currentIndex.update((i) =>
      i === this.products.length - 1 ? 0 : i + 1
    );
  }

  prev(): void {
    this.currentIndex.update((i) =>
      i === 0 ? this.products.length - 1 : i - 1
    );
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}