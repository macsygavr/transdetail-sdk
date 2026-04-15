import { APIClientOptions, fetchWithMiddlewares } from "../../common/api";
import {
  BroadcastMessage,
  CreateBroadcastMessageResponse,
  ListBroadcastMessagesResponse,
} from "../entities";

export type UpsertBroadcastMessageRequest = {
  id?: string | null;
  title?: string | null;
  content?: string | null;
  sort_order: number;
};

export async function listBroadcastMessages(options: {
  client?: APIClientOptions;
  unread?: boolean | null;
  limit?: number;
  offset?: number;
}): Promise<ListBroadcastMessagesResponse> {
  const params = new URLSearchParams();

  if (options.unread !== undefined && options.unread !== null) {
    params.set("unread", options.unread.toString());
  }
  if (options.limit !== undefined) {
    params.set("limit", options.limit.toString());
  }
  if (options.offset !== undefined) {
    params.set("offset", options.offset.toString());
  }

  const url = `${options?.client?.baseURL ?? ""}/api/v1/broadcast-messages${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const response = await fetchWithMiddlewares(
    url,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to list broadcast messages");
  }

  return (await response.json()) as ListBroadcastMessagesResponse;
}

export async function fetchBroadcastMessage(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<BroadcastMessage> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/broadcast-messages/${options.id}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch broadcast message");
  }

  return (await response.json()) as BroadcastMessage;
}

export async function createBroadcastMessage(options: {
  client?: APIClientOptions;
  data: UpsertBroadcastMessageRequest;
}): Promise<CreateBroadcastMessageResponse> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/broadcast-messages`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to create broadcast message");
  }

  return (await response.json()) as CreateBroadcastMessageResponse;
}

export async function updateBroadcastMessage(options: {
  client?: APIClientOptions;
  id: string;
  data: UpsertBroadcastMessageRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/broadcast-messages/${options.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update broadcast message");
  }
}

export async function deleteBroadcastMessage(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/broadcast-messages/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete broadcast message");
  }
}

export async function markMessageAsRead(options: {
  client?: APIClientOptions;
  messageId: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/broadcast-messages/${options.messageId}/read`,
    {
      method: "POST",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to mark message as read");
  }
}
