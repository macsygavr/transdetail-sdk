export type Property = {
  id: string;
  name: { [lang: string]: string };
  description: { [lang: string]: string };
  key: string;
  definition: Record<string, unknown>;
  sort_order: number;
  group_id: string | null;
};

export type PropertyGroup = {
  id: string;
  name: { [lang: string]: string };
  description: { [lang: string]: string };
};
