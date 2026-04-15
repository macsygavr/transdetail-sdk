export type Warehouse = {
  id: string;
  name: { [lang: string]: string };
  description: { [lang: string]: string };
  icon?: string;
  currency_id?: string;
};
