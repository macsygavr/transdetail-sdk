import { MediaObject } from "../../media/entities";

export type Product = {
  id: string;
  slug?: string | null;
  numeric_id?: number | null;
  name: Record<string, string>;
  description: Record<string, string>;
  technical_description?: Record<string, string>;
  search_terms?: string | null;
  cross_numbers?: CrossNumber[] | null;
  article: string;
  manufacturer_id: string | null;
  category_id: string | null;
  material_id?: string | null;
  transmissions: string[];
  scheme_code?: string | null;
  images: string[];
  images_expanded?: MediaObject[] | null;
  part_number: string | null;
  is_active: boolean;
  kit?: ProductKitItem[];
  alternatives?: string[];
  alternatives_expanded?: Product[] | null;
  kit_expanded?: ExtendedKitItem[];
  prices?: ProductPrice[] | null;
  stock?: ProductStock[] | null;
  tags?: ProductTag[] | null;
  properties?: Record<string, any>;
  weight?: number | null;
  status_id?: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  indexed_at?: string | null;
};

export type ProductSearchHit = {
  id: string;
  slug?: string | null;
  name: Record<string, string>;
  article: string;
  part_number?: string | null;
  cross_numbers?: string[];
};

export type ProductCollection = {
  id: string;
  name: Record<string, string>;
  description?: Record<string, string>;
  icon?: string | null;
  color?: string | null;
  positions: string[];
  sort_order: number;
  is_active: boolean;
  products: Product[];
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
};

export type CrossNumber = {
  manufacturer_id: string;
  number: string;
};

export type ExtendedKitItem = {
  product: Product;
  amount: number;
};

export type ProductKitItem = {
  id: string;
  amount: number;
};

export type ProductTag = {
  id: string;
  name: Record<string, string>;
  color: string | null;
  created_at: string;
  updated_at: string;
};

export type ProductPrice = {
  id: string | null;
  product_id: string;
  price_type_id: string;
  warehouse_id: string;
  price: number;
  old_price: number | null;
  discount_percent: number | null;
  is_default?: boolean;
};

export type ProductStock = {
  id: string | null;
  product_id: string | null;
  warehouse_id: string;
  amount: number;
};

export type ProductStatus = {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  color: string;
  is_default: boolean;
  sort_order: number;
};
