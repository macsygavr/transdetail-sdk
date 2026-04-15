export type PageContent = Record<string, any>;

export type Page = {
  id: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  slug: string;
  title?: string | null;
  content: PageContent;
};

export type ListPagesResult = {
  items: Page[];
};

export type CreatePageResult = {
  id: string;
};

export type UpsertPageRequest = {
  id?: string;
  published_at?: string | null;
  slug: string;
  title?: string | null;
  content: PageContent;
};
