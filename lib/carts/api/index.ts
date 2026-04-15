import { APIClientOptions, fetchWithMiddlewares } from "../../common/api";
import { EntityCreated, EntityList } from "../../common/entities";
import { Cart, CartItem } from "../entities";

export type CartExpandOption = "product";

export type CreateCartRequest = {
  name: string;
  company_id?: string;
};

export type UpdateCartRequest = {
  name?: string | null;
  company_id?: string;
};

export type CartItemRequest = {
  product_id: string;
  warehouse_id: string;
  quantity?: number;
};

export type UpsertDeleteCartItemRequest = {
  cart_id: string;
  items: CartItemRequest[];
};

export type SetCurrentCartRequest = {
  company_id: string;
  cart_id: string;
};

export async function fetchCartsList(options?: {
  client?: APIClientOptions;
  expand?: CartExpandOption[];
}): Promise<EntityList<Cart>> {
  const params = new URLSearchParams();
  if (options?.expand) {
    options.expand.forEach((e) => params.append("expand", e));
  }

  const qs = params.toString();
  const url = `${options?.client?.baseURL ?? ""}/api/v1/carts${qs ? `?${qs}` : ""}`;
  const response = await fetchWithMiddlewares(
    url,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch carts");
  }

  return response.json();
}

export async function fetchCart(options: {
  client?: APIClientOptions;
  id: string;
  expand?: CartExpandOption[];
}): Promise<Cart> {
  const params = new URLSearchParams();
  if (options?.expand) {
    options.expand.forEach((e) => params.append("expand", e));
  }

  const qs = params.toString();
  const url = `${options?.client?.baseURL ?? ""}/api/v1/carts/${options.id}${qs ? `?${qs}` : ""}`;
  const response = await fetchWithMiddlewares(
    url,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  return response.json();
}

export async function fetchCurrentCart(options: {
  client?: APIClientOptions;
  company_id: string;
  expand?: CartExpandOption[];
}): Promise<Cart | null> {
  const params = new URLSearchParams({
    company_id: options.company_id,
  });

  if (options?.expand) {
    options.expand.forEach((e) => params.append("expand", e));
  }

  const qs = params.toString();
  const url = `${options?.client?.baseURL ?? ""}/api/v1/carts/current${
    qs ? `?${qs}` : ""
  }`;
  const response = await fetchWithMiddlewares(
    url,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (response.status === 404 || response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch current cart");
  }

  return response.json();
}

export async function createCart(options: {
  client?: APIClientOptions;
  data: CreateCartRequest;
}): Promise<EntityCreated> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/carts`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to create cart");
  }

  return response.json();
}

export async function updateCart(options: {
  client?: APIClientOptions;
  cart_id: string;
  data: UpdateCartRequest;
  expand?: CartExpandOption[];
}): Promise<Cart> {
  const params = new URLSearchParams();
  if (options?.expand) {
    options.expand.forEach((e) => params.append("expand", e));
  }

  const qs = params.toString();
  const url = `${options?.client?.baseURL ?? ""}/api/v1/carts/${options.cart_id}${
    qs ? `?${qs}` : ""
  }`;

  const response = await fetchWithMiddlewares(
    url,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update cart");
  }

  return response.json();
}

export async function setCurrentCart(options: {
  client?: APIClientOptions;
  data: SetCurrentCartRequest;
  expand?: CartExpandOption[];
}): Promise<Cart> {
  const params = new URLSearchParams();
  if (options?.expand) {
    options.expand.forEach((e) => params.append("expand", e));
  }

  const qs = params.toString();
  const url = `${options?.client?.baseURL ?? ""}/api/v1/carts/current${
    qs ? `?${qs}` : ""
  }`;

  const response = await fetchWithMiddlewares(
    url,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to set current cart");
  }

  return response.json();
}

export async function deleteCart(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/carts/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete cart");
  }
}

export async function upsertCartItems(options: {
  client?: APIClientOptions;
  cart_id: string;
  items: CartItemRequest[];
}): Promise<CartItem[]> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/carts/${options.cart_id}/items`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: options.items }),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to upsert cart item");
  }

  return response.json();
}

export async function removeCartItems(options: {
  client?: APIClientOptions;
  cart_id: string;
  items: CartItemRequest[];
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/carts/${options.cart_id}/items`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: options.items }),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to remove cart item");
  }
}
