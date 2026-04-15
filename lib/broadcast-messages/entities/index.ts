export type BroadcastMessage = {
  id: string;
  created_at: string;
  updated_at: string;
  title: string | null;
  content: string | null;
  sort_order: number;
};

export type CreateBroadcastMessageResponse = {
  id: string;
};

export type ListBroadcastMessagesResponse = {
  items: BroadcastMessage[];
  count: number;
};

export type UpsertBroadcastMessageRequest = {
  id?: string | null;
  title?: string | null;
  content?: string | null;
  sort_order: number;
};
