import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../../core/services/cart';
import { Cart } from '../../../../core/models/cart';
import { CartItemComponent } from '../../components/cart-item/cart-item/cart-item';
import { CartSummaryComponent } from '../../components/cart-summary/cart-summary/cart-summary';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent, CartSummaryComponent],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent implements OnInit {
  cart = signal<Cart | null>(null);
  isLoading = signal(false);

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.isLoading.set(true);
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cart.set(cart);
        this.isLoading.set(false);
      },
      error: () => {
        this.cart.set(null);
        this.isLoading.set(false);
      },
    });
  }

  onUpdateQuantity(event: { id: string; quantity: number }): void {
    this.cartService.updateCart(event).subscribe({
      next: (cart) => this.cart.set(cart),
    });
  }

  onDeleteItem(id: string): void {
    this.cartService.deleteCartItem({ id }).subscribe({
      next: (cart) => this.cart.set(cart),
    });
  }

  onClearCart(): void {
    this.cartService.clearCart().subscribe({
      next: () => this.cart.set(null),
    });
  }

  onCheckout(): void {
    this.cartService.checkout().subscribe({
      next: () => {
        this.cart.set(null);
        this.router.navigate(['/']);
      },
    });
  }
  goShopping(): void {
  this.router.navigate(['/']);
}
}
