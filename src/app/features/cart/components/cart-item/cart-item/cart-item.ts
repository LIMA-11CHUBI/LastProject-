import { Component, Input, Output, EventEmitter, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartProduct } from '../../../../../core/models/cart';
import { Product } from '../../../../../core/models/product';
import { ProductService } from '../../../../../core/services/product';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItemComponent implements OnInit {
  @Input() item!: CartProduct;
  @Output() updateQuantity = new EventEmitter<{ id: string; quantity: number }>();
  @Output() deleteItem = new EventEmitter<string>();

  product = signal<Product | null>(null);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProductById(this.item.productId).subscribe({
      next: (product) => this.product.set(product),
    });
  }

  increase(): void {
    this.updateQuantity.emit({ id: this.item.productId, quantity: this.item.quantity + 1 });
  }

  decrease(): void {
    if (this.item.quantity > 1) {
      this.updateQuantity.emit({ id: this.item.productId, quantity: this.item.quantity - 1 });
    }
  }

  delete(): void {
    this.deleteItem.emit(this.item.productId);
  }
}
