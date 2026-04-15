import { APIClientOptions, fetchWithMiddlewares } from "../../common/api";
import { EntityCreated, EntityList, Query } from "../../common/entities";
import { Transmission } from "../entities";

export type UpsertTransmissionRequest = {
  id?: string;
  name: { [lang: string]: string };
  description: { [lang: string]: string };
  parent_id?: string;
  sort_order: number;
  search_terms?: string;
  is_active?: boolean;
  image?: string | null;
  parts_map?: string | null;
  parts?: TransmissionPartRequest[] | null;
};

export type TransmissionPartRequest = {
  id?: string;
  code: string;
  products: string[];
};

export type BulkUpsertTransmissionsRequest = {
  items: UpsertTransmissionRequest[];
};

export type BulkUpsertTransmissionsResponse = {
  upserted: number;
  failed: number;
  results: any[];
};

export type TransmissionFilter = {
  name?: string;
  search_terms?: string;
  keywords?: string;
};

export type TransmissionQueryParams = {
  limit?: number;
  offset?: number;
  count?: boolean;
  include_inactive?: boolean;
  include_parts?: boolean;
};

export async function fetchTransmissionsList(options: {
  client?: APIClientOptions;
  parentId?: string | null;
  include_inactive?: boolean;
}) {
  const params = new URLSearchParams();
  if (options.parentId === null) {
    params.set("parent_id", "-");
  } else if (options.parentId !== undefined) {
    params.set("parent_id", String(options.parentId));
  }
  params.set("include_inactive", String(options.include_inactive ?? false));

  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/transmissions?${params.toString()}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch transmissions");
  }

  return (await response.json()) as EntityList<Transmission>;
}

export async function queryTransmissions(options: {
  client?: APIClientOptions;
  query: Query<TransmissionFilter>;
  params: TransmissionQueryParams;
}): Promise<EntityList<Transmission>> {
  const queryParams = new URLSearchParams();
  if (options.params.limit !== undefined)
    queryParams.append("limit", options.params.limit.toString());
  if (options.params.offset !== undefined)
    queryParams.append("offset", options.params.offset.toString());
  if (options.params.count !== undefined)
    queryParams.append("count", options.params.count.toString());
  if (options.params.include_inactive !== undefined)
    queryParams.append(
      "include_inactive",
      options.params.include_inactive.toString(),
    );
  if (options.params.include_parts !== undefined)
    queryParams.append(
      "include_parts",
      options.params.include_parts.toString(),
    );

  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/transmissions/query?${queryParams.toString()}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.query),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to query transmissions");
  }

  return response.json();
}

export async function fetchTransmission(options: {
  client?: APIClientOptions;
  id: string;
}) {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/transmissions/${options.id}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch transmission");
  }

  return (await response.json()) as Transmission;
}

export async function createTransmission(options: {
  client?: APIClientOptions;
  data: UpsertTransmissionRequest;
}) {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/transmissions`,
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
    throw new Error("Failed to create transmission");
  }

  return (await response.json()) as EntityCreated;
}

export async function updateTransmission(options: {
  client?: APIClientOptions;
  id: string;
  data: UpsertTransmissionRequest;
}) {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/transmissions/${options.id}`,
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
    throw new Error("Failed to update transmission");
  }
}

export async function deleteTransmission(options: {
  client?: APIClientOptions;
  id: string;
}) {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/transmissions/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete transmission");
  }
}

export async function bulkUpsertTransmissions(options: {
  client?: APIClientOptions;
  data: BulkUpsertTransmissionsRequest;
}): Promise<BulkUpsertTransmissionsResponse> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/transmissions/bulk`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to bulk upsert transmissions");
  }

  return response.json();
}
