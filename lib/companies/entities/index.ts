export type Company = {
  id: string;
  numeric_id?: number | null;
  name: string;
  comment: string | null;
  form: "individual" | "legal_entity";
  address: string | null;
  inn: string;
  kpp: string | null;
  ogrn: string | null;
  bik: string | null;
  bank_account: string | null;
  bank_corr_account: string | null;
  status: "pending" | "approved" | "rejected";
  price_type_id: string | null;
};

export type PriceType = {
  id: string;
  name: string;
  is_default: boolean;
  sort_order?: number;
};

export type ContactPerson = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  company_id: string;
  last_name?: string | null;
  first_name: string;
  middle_name?: string | null;
  phone?: string | null;
  city: string;
  inn?: string | null;
  passport?: string | null;
  shipping_option_id?: string | null;
  payment_option_id?: string | null;
};

export type CompanyMembership = {
  user_id: string;
  company_id: string;
  role: "owner" | "employee";
  created_at: string;
};

export type SuggestedCompany = {
  name: string;
  type: string;
  inn: string;
  kpp?: string | null;
  ogrn?: string | null;
  address?: string | null;
};
