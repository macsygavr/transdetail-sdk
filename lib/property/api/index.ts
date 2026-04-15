import { APIClientOptions, fetchWithMiddlewares } from "../../common/api";
import { EntityCreated, EntityList } from "../../common/entities";
import { Property, PropertyGroup } from "../entities";

export type UpsertPropertyRequest = {
  id?: string;
  name: { [lang: string]: string };
  description: { [lang: string]: string };
  key: string;
  definition: Record<string, unknown>;
  sort_order?: number;
  group_id?: string | null;
};

export type UpsertPropertyGroupRequest = {
  id?: string;
  name: { [lang: string]: string };
  description: { [lang: string]: string };
};

export type BulkUpsertPropertiesRequest = {
  items: UpsertPropertyRequest[];
};

export type BulkUpsertPropertyGroupsRequest = {
  items: UpsertPropertyGroupRequest[];
};

export type BulkUpsertResponse = {
  ids: string[];
};

export async function listProperties(options?: {
  client?: APIClientOptions;
}): Promise<EntityList<Property>> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/property`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to list properties");
  }

  return response.json();
}

export async function getProperty(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<Property> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/property/${options.id}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to get property");
  }

  return response.json();
}

export async function createProperty(options: {
  client?: APIClientOptions;
  data: UpsertPropertyRequest;
}): Promise<EntityCreated> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/property`,
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
    throw new Error("Failed to create property");
  }

  return response.json();
}

export async function updateProperty(options: {
  client?: APIClientOptions;
  id: string;
  data: UpsertPropertyRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/property/${options.id}`,
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
    throw new Error("Failed to update property");
  }
}

export async function deleteProperty(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/property/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete property");
  }
}

export async function bulkUpsertProperties(options: {
  client?: APIClientOptions;
  data: BulkUpsertPropertiesRequest;
}): Promise<BulkUpsertResponse> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/property/bulk`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to bulk upsert properties");
  }

  return response.json();
}

// Property Groups

export async function listPropertyGroups(options: {
  client?: APIClientOptions;
  name?: string | null;
  limit?: number;
  offset?: number;
}): Promise<EntityList<PropertyGroup>> {
  const params = new URLSearchParams({
    limit: (options.limit ?? 10).toString(),
    offset: (options.offset ?? 0).toString(),
  });

  if (options.name) {
    params.set("name", options.name);
  }

  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/property-groups/?${params.toString()}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to list property groups");
  }

  return response.json();
}

export async function createPropertyGroup(options: {
  client?: APIClientOptions;
  data: UpsertPropertyGroupRequest;
}): Promise<EntityCreated> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/property-groups/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to create property group");
  }

  return response.json();
}

export async function getPropertyGroup(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<PropertyGroup> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/property-groups/${options.id}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to get property group");
  }

  return response.json();
}

export async function updatePropertyGroup(options: {
  client?: APIClientOptions;
  id: string;
  data: UpsertPropertyGroupRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/property-groups/${options.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update property group");
  }
}

export async function deletePropertyGroup(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/property-groups/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete property group");
  }
}

export async function bulkUpsertPropertyGroups(options: {
  client?: APIClientOptions;
  data: BulkUpsertPropertyGroupsRequest;
}): Promise<BulkUpsertResponse> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/property-groups/bulk`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to bulk upsert property groups");
  }

  return response.json();
}
