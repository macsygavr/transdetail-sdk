import { APIClientOptions, fetchWithMiddlewares } from "../../common/api";
import { EntityCreated, EntityList, Query } from "../../common/entities";
import { Material, MaterialFilter } from "../entities";

export type UpsertMaterialRequest = {
  id?: string;
  name: { [lang: string]: string };
  description?: { [lang: string]: string };
  images: string[];
};

export type BulkUpsertMaterialsRequest = {
  items: UpsertMaterialRequest[];
};

export type BulkUpsertResponse = {
  ids: string[];
};

export async function fetchMaterialsList(options: {
  client?: APIClientOptions;
  query?: Query<MaterialFilter>;
}): Promise<EntityList<Material>> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/materials/query`,
    {
      method: "POST",
      body: JSON.stringify(options.query),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch materials");
  }

  return response.json();
}

export async function fetchMaterial(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<Material> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/materials/${options.id}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch material");
  }

  return response.json();
}

export async function createMaterial(options: {
  client?: APIClientOptions;
  data: UpsertMaterialRequest;
}): Promise<EntityCreated> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/materials`,
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
    throw new Error("Failed to create material");
  }

  return response.json();
}

export async function updateMaterial(options: {
  client?: APIClientOptions;
  id: string;
  data: UpsertMaterialRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/materials/${options.id}`,
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
    throw new Error("Failed to update material");
  }
}

export async function deleteMaterial(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/materials/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete material");
  }
}

export async function bulkUpsertMaterials(options: {
  client?: APIClientOptions;
  data: BulkUpsertMaterialsRequest;
}): Promise<BulkUpsertResponse> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/materials/bulk`,
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
    throw new Error("Failed to bulk upsert materials");
  }

  return response.json();
}
