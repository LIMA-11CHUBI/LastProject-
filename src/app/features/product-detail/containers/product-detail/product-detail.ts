import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product';
import { CartService } from '../../../../core/services/cart';
import { AuthService } from '../../../../core/services/auth';
import { Product } from '../../../../core/models/product';
import { ProductInfoComponent } from '../../components/product-info/product-info/product-info';
import { ProductRatingComponent } from '../../components/product-rating/product-rating/product-rating';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ProductInfoComponent, ProductRatingComponent],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetailComponent implements OnInit {
  product = signal<Product | null>(null);
  isLoading = signal(false);
  isAddingToCart = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(id);
    }
  }

  loadProduct(id: string): void {
    this.isLoading.set(true);
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product.set(product);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.router.navigate(['/']);
      },
    });
  }

  addToCart(): void {
    if (!this.authService.currentUser()) {
      this.router.navigate(['/auth']);
      return;
    }
    const product = this.product();
    if (!product) return;

    this.isAddingToCart.set(true);
    this.cartService.createCart({ id: product._id, quantity: 1 }).subscribe({
      next: () => this.isAddingToCart.set(false),
      error: () => {
        this.cartService.updateCart({ id: product._id, quantity: 1 }).subscribe({
          next: () => this.isAddingToCart.set(false),
          error: () => this.isAddingToCart.set(false),
        });
      },
    });
  }

  onRate(rate: number): void {
    const product = this.product();
    if (!product) return;
    this.productService.rateProduct(product._id, rate).subscribe({
      next: (updated) => this.product.set(updated),
    });
  }
}
