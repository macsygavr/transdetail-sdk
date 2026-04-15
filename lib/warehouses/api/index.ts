import { APIClientOptions, fetchWithMiddlewares } from "../../common/api";
import { EntityCreated, EntityList } from "../../common/entities";
import { Warehouse } from "../entities";

export type UpsertWarehouseRequest = {
  id?: string;
  name: { [lang: string]: string };
  description: { [lang: string]: string };
  icon?: string;
  currency_id?: string;
};

export type BulkUpdateRequest = {
  items: UpsertWarehouseRequest[];
};

export type BulkUpsertResponse = {
  ids: string[];
};

export async function fetchWarehousesList(options: {
  client?: APIClientOptions;
}): Promise<EntityList<Warehouse>> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/warehouse`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch warehouses");
  }

  return response.json();
}

export async function fetchWarehouse(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<Warehouse> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/warehouse/${options.id}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch warehouse");
  }

  return response.json();
}

export async function createWarehouse(options: {
  client?: APIClientOptions;
  data: UpsertWarehouseRequest;
}): Promise<EntityCreated> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/warehouse`,
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
    throw new Error("Failed to create warehouse");
  }

  return response.json();
}

export async function updateWarehouse(options: {
  client?: APIClientOptions;
  id: string;
  data: UpsertWarehouseRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/warehouse/${options.id}`,
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
    throw new Error("Failed to update warehouse");
  }
}

export async function deleteWarehouse(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/warehouse/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete warehouse");
  }
}

export async function bulkUpsertWarehouses(options: {
  client?: APIClientOptions;
  data: BulkUpdateRequest;
}): Promise<BulkUpsertResponse> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/warehouse/bulk`,
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
    throw new Error("Failed to bulk upsert warehouses");
  }

  return response.json();
}
