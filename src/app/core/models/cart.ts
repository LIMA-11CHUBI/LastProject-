//
export interface CartPrice {
  current: number;
  beforeDiscount: number;
}

export interface CartTotal {
  price: CartPrice;
  quantity: number;
  products: number;
}

export interface CartProduct {
  quantity: number;
  pricePerQuantity: number;
  beforeDiscountPrice: number;
  productId: string;
}

export interface Cart {
  _id: string;
  userId: string;
  createdAt: string;
  total: CartTotal;
  products: CartProduct[];
}

export interface AddToCartDto {
  id: string;
  quantity: number;
}

export interface DeleteCartItemDto {
  id: string;
}

export interface CartCheckoutResponse {
  success: boolean;
  message: string;
}

export interface CartClearResponse {
  success: boolean;
}