import type { User } from "../../auth/entities";
import type { ContactPerson } from "../../companies/entities";
import type { Company } from "../../companies/entities";
import { Product } from "../../products/entities";

export type OrderStatus = {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  color: string;
  is_default: boolean;
  sort_order: number;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  price_per_item: number;
  total_price: number;
  warehouse_id: string;
  price_type_id: string;
};

export type CompaniesForm = "individual" | "legal_entity";

export type Order = {
  id: string;
  user_id: string;
  company_id: string;
  numeric_id?: number | null;
  contact_person_id?: string | null;
  contact_person?: ContactPerson | null;
  user?: User | null;
  company?: Company | null;
  status_id: string | null;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
  total_price: number;
};
