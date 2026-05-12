import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from '../../../../../core/models/cart';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-summary.html',
  styleUrl: './cart-summary.css',
})
export class CartSummaryComponent {
  @Input() cart!: Cart;
  @Output() checkout = new EventEmitter<void>();
}
