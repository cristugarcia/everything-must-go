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

  price: number;
  minimumPrice: number;
  originalPrice: number;

  purchaseYear?: number;

  condition: string;

  location?: string;

  publicDescription?: string;
  privateNotes?: string;

  images: string[];

  publishedAt?: string;
  soldAt?: string;
}