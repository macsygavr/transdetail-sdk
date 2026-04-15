export type PaymentOption = {
  id: string;
  name: Record<string, string>;
  icon: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
};
