export type MediaObject = {
  id: string;
  variants: Record<string, MediaObjectVariant>;
  alt?: string | null;
  hash: string;
  file_extension: string;
  created_at?: string | null;
  updated_at?: string | null;
};

export type MediaObjectVariant = {
  objectname: string;
  width?: number | null;
  height?: number | null;
};

export type Media = {
  id: string;
};
