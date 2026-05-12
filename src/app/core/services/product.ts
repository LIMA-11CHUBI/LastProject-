import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Product,
  ProductsResponse,
  ProductSearchParams,
} from '../models/product';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly API = 'https://api.everrest.educata.dev';

  constructor(private http: HttpClient) {}

  getAllProducts(pageIndex = 1, pageSize = 10): Observable<ProductsResponse> {
    const params = new HttpParams()
      .set('page_index', pageIndex)
      .set('page_size', pageSize);
    return this.http.get<ProductsResponse>(`${this.API}/shop/products/all`, { params });
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.API}/shop/products/id/${id}`);
  }

  searchProducts(searchParams: ProductSearchParams): Observable<ProductsResponse> {
    let params = new HttpParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params = params.set(key, value);
      }
    });
    return this.http.get<ProductsResponse>(`${this.API}/shop/products/search`, { params });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.API}/shop/products/categories`);
  }

  getProductsByCategory(categoryId: string, pageIndex = 1, pageSize = 10): Observable<ProductsResponse> {
    const params = new HttpParams()
      .set('page_index', pageIndex)
      .set('page_size', pageSize);
    return this.http.get<ProductsResponse>(`${this.API}/shop/products/category/${categoryId}`, { params });
  }

  getBrands(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API}/shop/products/brands`);
  }

  getProductsByBrand(brandName: string, pageIndex = 1, pageSize = 10): Observable<ProductsResponse> {
    const params = new HttpParams()
      .set('page_index', pageIndex)
      .set('page_size', pageSize);
    return this.http.get<ProductsResponse>(`${this.API}/shop/products/brand/${brandName}`, { params });
  }

  rateProduct(productId: string, rate: number): Observable<Product> {
    return this.http.post<Product>(`${this.API}/shop/products/rate`, { productId, rate });
  }
  //for admin 
updateProduct(id: string, dto: any): Observable<Product> {
  return this.http.patch<Product>(`${this.API}/shop/products/id/${id}`, dto);
}

addProduct(dto: any): Observable<Product> {
  return this.http.post<Product>(`${this.API}/shop/products`, dto);
}

deleteAllProducts(): Observable<void> {
  return this.http.delete<void>(`${this.API}/shop/products/all`);
}
}



