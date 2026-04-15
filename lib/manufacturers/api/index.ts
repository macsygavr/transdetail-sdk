import { APIClientOptions, fetchWithMiddlewares } from "../../common/api";
import { EntityCreated, EntityList } from "../../common/entities";
import { Manufacturer } from "../entities";

export type UpsertManufacturerRequest = {
  name: { [lang: string]: string };
  description: { [lang: string]: string };
  icon?: string;
};

export async function fetchManufacturersList(options: {
  client?: APIClientOptions;
}): Promise<EntityList<Manufacturer>> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/manufacturers`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch manufacturers");
  }

  return response.json();
}

export async function fetchManufacturer(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<Manufacturer> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/manufacturers/${options.id}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch manufacturer");
  }

  return response.json();
}

export async function createManufacturer(options: {
  client?: APIClientOptions;
  data: UpsertManufacturerRequest;
}): Promise<EntityCreated> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/manufacturers`,
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
    throw new Error("Failed to create manufacturer");
  }

  return response.json();
}

export async function updateManufacturer(options: {
  client?: APIClientOptions;
  id: string;
  data: UpsertManufacturerRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/manufacturers/${options.id}`,
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
    throw new Error("Failed to update manufacturer");
  }
}

export async function deleteManufacturer(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/manufacturers/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete manufacturer");
  }
}
