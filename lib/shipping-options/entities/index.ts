export type ShippingMethod = "self-pickup" | "pickup-point" | "courier";

export type ShippingOption = {
  id: string;
  name: Record<string, string>;
  icon: string;
  method: ShippingMethod;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
};
