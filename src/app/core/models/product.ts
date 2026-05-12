//
export interface ProductPrice {
  current: number;
  currency: string;
  beforeDiscount: number;
  discountPercentage: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  image: string;
}

export interface ProductRating {
  userId: string;
  value: number;
  createdAt: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: ProductPrice;
  category: ProductCategory;
  thumbnail: string;
  images: string[];
  stock: number;
  rating: number;
  brand: string;
  warranty: number;
  issueDate: string;
  ratings?: ProductRating[];
}

export interface ProductsResponse {
  total: number;
  limit: number;
  page: number;
  skip: number;
  products: Product[];
}

export interface ProductSearchParams {
  page_size?: number;
  page_index?: number;
  keywords?: string;
  category_id?: string;
  brand?: string;
  rating?: number;
  price_min?: number;
  price_max?: number;
  sort_by?: 'rating' | 'price' | 'issue_date' | 'title';
  sort_direction?: 'asc' | 'desc';
}
