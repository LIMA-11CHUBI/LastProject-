import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../core/services/product';
import { Product, ProductSearchParams } from '../../../../core/models/product';
import { Category } from '../../../../core/models/category';
import { FiltersComponent} from '../../components/filters/filters/filters';
import {  CarouselComponent } from '../../components/carousel/carousel/carousel';
import { ProductListComponent } from '../../components/product-list/product-list/product-list';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination/pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FiltersComponent,
    CarouselComponent,
    ProductListComponent,
    PaginationComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  products = signal<Product[]>([]);
  popularProducts = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  brands = signal<string[]>([]);
  currentPage = signal(1);
  totalPages = signal(1);
  pageSize = 10;
  isLoading = signal(false);
  searchParams = signal<ProductSearchParams>({});
  showCarousel = signal(true);

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadBrands();
    this.loadPopularProducts();
    this.route.queryParams.subscribe((params) => {
      this.searchParams.set({ ...this.searchParams(), keywords: params['keywords'] });
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.isLoading.set(true);
    const params: ProductSearchParams = {
      ...this.searchParams(),
      page_index: this.currentPage(),
      page_size: this.pageSize,
    };
    this.productService.searchProducts(params).subscribe({
      next: (res) => {
        this.products.set(res.products);
        this.totalPages.set(Math.ceil(res.total / this.pageSize));
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  loadPopularProducts(): void {
    this.productService.getAllProducts(1, 4).subscribe({
      next: (res) => this.popularProducts.set(res.products),
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => this.categories.set(categories),
    });
  }

  loadBrands(): void {
    this.productService.getBrands().subscribe({
      next: (brands) => this.brands.set(brands),
    });
  }

  onFilterChange(params: ProductSearchParams): void {
    this.searchParams.set(params);
    this.currentPage.set(1);
    this.showCarousel.set(false);
    this.loadProducts();
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.showCarousel.set(false);
    this.loadProducts();
  }
}