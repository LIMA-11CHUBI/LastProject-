import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../../core/services/product';
import { Product } from '../../../../../core/models/product';
import { ProductCardComponent } from '../../../../../shared/components/product-card/product-card/product-card';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class FavoritesComponent implements OnInit {
  favorites = signal<Product[]>([]);
  isLoading = signal(false);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    const ids: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (ids.length === 0) return;

    this.isLoading.set(true);
    const requests = ids.map(id =>
      this.productService.getProductById(id)
    );

    Promise.all(requests.map(r => r.toPromise())).then(products => {
      this.favorites.set(products.filter(Boolean) as Product[]);
      this.isLoading.set(false);
    });
  }
}