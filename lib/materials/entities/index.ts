export type Material = {
  id: string;
  name: { [lang: string]: string };
  description: { [lang: string]: string };
  images: string[];
};

export type MaterialFilter = {
  name?: string;
};
