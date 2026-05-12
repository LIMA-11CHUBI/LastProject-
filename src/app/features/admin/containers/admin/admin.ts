import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth';
import { ProductService } from '../../../../core/services/product';
import { User } from '../../../../core/models/auth';
import { Product } from '../../../../core/models/product';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class AdminComponent implements OnInit {
  activeTab = signal<'users' | 'products'>('users');
  products = signal<Product[]>([]);
  isLoading = signal(false);
  searchId = signal('');
  foundUser = signal<User | null>(null);
  showProductForm = signal(false);
  editingProduct = signal<Product | null>(null);

  productForm: FormGroup;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      brand: ['', Validators.required],
      description: ['', Validators.required],
      stock: [1, Validators.required],
      warranty: [1, Validators.required],
      issueDate: ['', Validators.required],
      thumbnail: ['', Validators.required],
      images: ['', Validators.required],
      price: this.fb.group({
        current: [0, Validators.required],
        beforeDiscount: [0, Validators.required],
        discountPercentage: [0],
        currency: ['USD', Validators.required],
      }),
      category: this.fb.group({
        name: ['', Validators.required],
        image: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.productService.getAllProducts(1, 100).subscribe({
      next: (res) => {
        this.products.set(res.products);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  searchUser(): void {
    if (!this.searchId()) return;
    this.isLoading.set(true);
    this.authService.getUserById(this.searchId()).subscribe({
      next: (user) => {
        this.foundUser.set(user);
        this.isLoading.set(false);
      },
      error: () => {
        this.foundUser.set(null);
        this.isLoading.set(false);
      },
    });
  }

  startEditProduct(product: Product): void {
    this.editingProduct.set(product);
    this.showProductForm.set(true);
    this.productForm.patchValue({
      title: product.title,
      brand: product.brand,
      description: product.description,
      stock: product.stock,
      warranty: product.warranty,
      issueDate: product.issueDate,
      thumbnail: product.thumbnail,
      images: product.images.join(','),
      price: {
        current: product.price.current,
        beforeDiscount: product.price.beforeDiscount,
        discountPercentage: product.price.discountPercentage,
        currency: product.price.currency,
      },
      category: {
        name: product.category.name,
        image: product.category.image,
      },
    });
  }

  onSubmitProduct(): void {
    if (this.productForm.invalid) return;
    const editing = this.editingProduct();
    const value = {
      ...this.productForm.value,
      images: this.productForm.value.images.split(',').map((i: string) => i.trim()),
    };

    if (editing) {
      this.productService.updateProduct(editing._id, value).subscribe({
        next: () => {
          this.showProductForm.set(false);
          this.editingProduct.set(null);
          this.loadProducts();
        },
      });
    } else {
      this.productService.addProduct(value).subscribe({
        next: () => {
          this.showProductForm.set(false);
          this.loadProducts();
        },
      });
    }
  }

  deleteAllProducts(): void {
    if (confirm('დარწმუნებული ხარ? ყველა პროდუქტი წაიშლება!')) {
      this.productService.deleteAllProducts().subscribe({
        next: () => this.loadProducts(),
      });
    }
  }

  cancelProductForm(): void {
    this.showProductForm.set(false);
    this.editingProduct.set(null);
    this.productForm.reset();
  }
}