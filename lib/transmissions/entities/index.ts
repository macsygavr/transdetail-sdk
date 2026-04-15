export type Transmission = {
  id: string;
  name: { [lang: string]: string };
  description: { [lang: string]: string };
  parent_id?: string;
  sort_order: number;
  search_terms: string | null;
  is_active: boolean;
  image: string | null;
  parts_map?: string | null;
  parts: TransmissionPart[] | null;
  created_at: string | null;
  updated_at: string | null;
};

export type TransmissionPart = {
  id: string;
  transmission_id: string | null;
  code: string;
  products: string[] | null;
  created_at: string | null;
  updated_at: string | null;
};
