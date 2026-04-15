import { APIClientOptions, fetchWithMiddlewares } from "../../common/api";
import { EntityCreated, EntityList } from "../../common/entities";
import { ShippingOption, ShippingMethod } from "../entities";

export type UpsertShippingOptionRequest = {
  id?: string;
  name: Record<string, string>;
  icon: string;
  method: ShippingMethod;
  is_active: boolean;
  sort_order: number;
};

export type BulkUpsertShippingOptionsRequest = {
  options: UpsertShippingOptionRequest[];
};

export type BulkUpsertShippingOptionsResponse = {
  ids: string[];
};

export async function listShippingOptions(options: {
  client?: APIClientOptions;
  method?: ShippingMethod | null;
  include_inactive?: boolean;
}): Promise<EntityList<ShippingOption>> {
  const params = new URLSearchParams();

  if (options.method) {
    params.set("method", options.method);
  }

  params.set("include_inactive", String(options.include_inactive ?? false));

  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/shipping-options?${params.toString()}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to list shipping options");
  }

  return response.json();
}

export async function createShippingOption(options: {
  client?: APIClientOptions;
  data: UpsertShippingOptionRequest;
}): Promise<EntityCreated> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/shipping-options`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to create shipping option");
  }

  return response.json();
}

export async function getShippingOption(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<ShippingOption> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/shipping-options/${options.id}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to get shipping option");
  }

  return response.json();
}

export async function updateShippingOption(options: {
  client?: APIClientOptions;
  id: string;
  data: UpsertShippingOptionRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/shipping-options/${options.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update shipping option");
  }
}

export async function deleteShippingOption(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/shipping-options/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete shipping option");
  }
}

export async function bulkUpsertShippingOptions(options: {
  client?: APIClientOptions;
  data: BulkUpsertShippingOptionsRequest;
}): Promise<BulkUpsertShippingOptionsResponse> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/shipping-options/bulk`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to bulk upsert shipping options");
  }

  return response.json();
}
