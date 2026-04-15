export type MenuItem = {
  name: Record<string, string>;
  url: string;
  is_active: boolean;
};

export type Menu = {
  id: string | null;
  created_at: string | null;
  updated_at: string | null;
  name: Record<string, string>;
  position: string;
  sort_order: number;
  is_active: boolean;
  items: MenuItem[];
};

export type ListMenusResult = {
  items: Menu[];
};

export type CreateMenuResult = {
  id: string;
};

export type UpsertMenuRequest = {
  id?: string;
  name: Record<string, string>;
  position: string;
  sort_order?: number;
  is_active?: boolean;
  items: MenuItem[];
};
