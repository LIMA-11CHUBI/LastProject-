import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Cart,
  AddToCartDto,
  DeleteCartItemDto,
  CartCheckoutResponse,
  CartClearResponse,
} from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly API = 'https://api.everrest.educata.dev';

  constructor(private http: HttpClient) {}

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.API}/shop/cart`);
  }

  createCart(dto: AddToCartDto): Observable<Cart> {
    return this.http.post<Cart>(`${this.API}/shop/cart/product`, dto);
  }

  updateCart(dto: AddToCartDto): Observable<Cart> {
    return this.http.patch<Cart>(`${this.API}/shop/cart/product`, dto);
  }

  deleteCartItem(dto: DeleteCartItemDto): Observable<Cart> {
    return this.http.delete<Cart>(`${this.API}/shop/cart/product`, { body: dto });
  }

  clearCart(): Observable<CartClearResponse> {
    return this.http.delete<CartClearResponse>(`${this.API}/shop/cart`);
  }

  checkout(): Observable<CartCheckoutResponse> {
    return this.http.post<CartCheckoutResponse>(`${this.API}/shop/cart/checkout`, {});
  }
}