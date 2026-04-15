import { APIClientOptions, fetchWithMiddlewares } from "../../common/api";
import { EntityCreated, EntityList } from "../../common/entities";
import { Category } from "../entities";

export type UpsertCategoryRequest = {
  slug: string;
  name: { [lang: string]: string };
  description: { [lang: string]: string };
  icon?: string;
  parent_id?: string;
  sort_order: number;
  is_active: boolean;
  is_popular: boolean;
};

export async function fetchCategoriesList(options: {
  client?: APIClientOptions;
  parent_id?: string | null;
  include_inactive?: boolean;
}): Promise<EntityList<Category>> {
  const params = new URLSearchParams();
  if (options.parent_id === null) {
    params.set("parent_id", "-");
  } else if (options.parent_id !== undefined) {
    params.set("parent_id", String(options.parent_id));
  }
  params.set("include_inactive", String(options.include_inactive ?? false));

  const url = `${options?.client?.baseURL ?? ""}/api/v1/categories?${params.toString()}`;
  const response = await fetchWithMiddlewares(
    url,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return (await response.json()) as EntityList<Category>;
}

export async function fetchCategory(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<Category> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/categories/${options.id}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }

  return (await response.json()) as Category;
}

export async function createCategory(options: {
  client?: APIClientOptions;
  data: UpsertCategoryRequest;
}): Promise<EntityCreated> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/categories`,
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
    throw new Error("Failed to create category");
  }

  return (await response.json()) as EntityCreated;
}

export async function updateCategory(options: {
  client?: APIClientOptions;
  id: string;
  data: UpsertCategoryRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/categories/${options.id}`,
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
    throw new Error("Failed to update category");
  }
}

export async function deleteCategory(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/categories/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete category");
  }
}
