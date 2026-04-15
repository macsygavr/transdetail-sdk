import { APIClientOptions, fetchWithMiddlewares } from "../../common/api";
import {
  CreateMenuResult,
  ListMenusResult,
  Menu,
  UpsertMenuRequest,
} from "../entities";

export async function fetchMenusList(options: {
  client?: APIClientOptions;
  params?: {
    include_inactive?: boolean;
  };
}): Promise<ListMenusResult> {
  const params = new URLSearchParams();

  if (options.params?.include_inactive !== undefined) {
    params.set(
      "include_inactive",
      String(options.params.include_inactive),
    );
  }

  const qs = params.toString();
  const url = `${options?.client?.baseURL ?? ""}/api/v1/menus${qs ? `?${qs}` : ""}`;
  const response = await fetchWithMiddlewares(
    url,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch menus list");
  }

  return (await response.json()) as ListMenusResult;
}

export async function fetchMenuById(options: {
  client?: APIClientOptions;
  params: {
    menu_id: string;
  };
}): Promise<Menu> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/menus/${options.params.menu_id}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch menu by ID");
  }

  return (await response.json()) as Menu;
}

export async function createMenu(options: {
  client?: APIClientOptions;
  params: {
    data: UpsertMenuRequest;
  };
}): Promise<CreateMenuResult> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/menus`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options.params.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to create menu");
  }

  return (await response.json()) as CreateMenuResult;
}

export async function updateMenu(options: {
  client?: APIClientOptions;
  params: {
    menu_id: string;
    data: UpsertMenuRequest;
  };
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/menus/${options.params.menu_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options.params.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update menu");
  }
}

export async function deleteMenu(options: {
  client?: APIClientOptions;
  params: {
    menu_id: string;
  };
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/menus/${options.params.menu_id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete menu");
  }
}
