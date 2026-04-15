import type { Product } from "../../products/entities";

export type CartItem = {
  product_id: string;
  quantity: number;
  warehouse_id: string;
  cart_id: string;
  product?: Product | null;
};

export type Cart = {
  id: string;
  user_id: string;
  company_id?: string;
  name: string;
  created_at: string;
  updated_at: string;
  items: CartItem[];
};
