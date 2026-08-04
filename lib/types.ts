export interface Seller {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  sku: string;

  publish: boolean;
  status: string;

  category: string;
  subcategory: string;

  name: string;
  brand: string;
  model: string;

  quantity: number;

  price: number | null;
  purchaseYear?: number;

  condition: string;

  location?: string;

  publicDescription?: string;
  images: string[];

  seller?: Seller;

  publishedAt?: string;
  soldAt?: string;
}
