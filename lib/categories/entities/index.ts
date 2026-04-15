export type Category = {
  id: string;
  parent_id?: string;
  slug: string;
  name: { [lang: string]: string };
  description: { [lang: string]: string };
  icon?: string;
  sort_order: number;
  is_active: boolean;
  is_popular: boolean;
};
