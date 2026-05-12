import { Component, Input, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../core/models/product';
import { CartService } from '../../../../core/services/cart';
import { AuthService } from '../../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;

  isAddingToCart = signal(false);
  isFavorite = signal(false);

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.isFavorite.set(favorites.includes(this.product._id));
  }

  addToCart(event: Event): void {
    event.stopPropagation();
    if (!this.authService.currentUser()) {
      this.router.navigate(['/auth']);
      return;
    }
    this.isAddingToCart.set(true);
    this.cartService.createCart({ id: this.product._id, quantity: 1 }).subscribe({
      next: () => this.isAddingToCart.set(false),
      error: () => {
        this.cartService.updateCart({ id: this.product._id, quantity: 1 }).subscribe({
          next: () => this.isAddingToCart.set(false),
          error: () => this.isAddingToCart.set(false),
        });
      },
    });
  }

  toggleFavorite(event: Event): void {
    event.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (this.isFavorite()) {
      const updated = favorites.filter((id: string) => id !== this.product._id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      this.isFavorite.set(false);
    } else {
      favorites.push(this.product._id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.isFavorite.set(true);
    }
  }
}