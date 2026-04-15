import { APIClientOptions, fetchWithMiddlewares } from "../../common/api";
import {
  Page,
  CreatePageResult,
  UpsertPageRequest,
  ListPagesResult,
} from "../entities";

export async function fetchPagesList(options: {
  client?: APIClientOptions;
  is_published?: boolean;
}): Promise<ListPagesResult> {
  const params = new URLSearchParams();

  if (options.is_published !== undefined) {
    params.set("is_published", String(options.is_published));
  }

  const url = `${options?.client?.baseURL ?? ""}/api/v1/pages?${params.toString()}`;
  const response = await fetchWithMiddlewares(
    url,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch pages list");
  }

  return (await response.json()) as ListPagesResult;
}

export async function fetchPageById(options: {
  client?: APIClientOptions;
  page_id: string;
  is_published?: boolean;
}): Promise<Page> {
  const params = new URLSearchParams();

  if (options.is_published !== undefined) {
    params.set("is_published", String(options.is_published));
  }

  const qs = params.toString();
  const url = `${options?.client?.baseURL ?? ""}/api/v1/pages/id/${options.page_id}${qs ? `?${qs}` : ""}`;
  const response = await fetchWithMiddlewares(
    url,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch page by ID");
  }

  return (await response.json()) as Page;
}

export async function fetchPageBySlug(options: {
  client?: APIClientOptions;
  page_slug: string;
  is_published?: boolean;
}): Promise<Page> {
  const params = new URLSearchParams();

  if (options.is_published !== undefined) {
    params.set("is_published", String(options.is_published));
  }

  const qs = params.toString();
  const url = `${options?.client?.baseURL ?? ""}/api/v1/pages/slug/${encodeURIComponent(options.page_slug)}${qs ? `?${qs}` : ""}`;
  const response = await fetchWithMiddlewares(
    url,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch page by slug");
  }

  return (await response.json()) as Page;
}

export async function createPage(options: {
  client?: APIClientOptions;
  data: UpsertPageRequest;
}): Promise<CreatePageResult> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/pages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to create page");
  }

  return (await response.json()) as CreatePageResult;
}

export async function updatePage(options: {
  client?: APIClientOptions;
  page_id: string;
  data: UpsertPageRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/pages/id/${options.page_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update page");
  }
}

export async function deletePage(options: {
  client?: APIClientOptions;
  page_id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/pages/id/${options.page_id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete page");
  }
}
