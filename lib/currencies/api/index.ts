import { APIClientOptions, fetchWithMiddlewares } from "../../common/api";
import { EntityCreated, EntityList } from "../../common/entities";
import { Currency } from "../entities";

export type UpsertCurrencyRequest = {
  id?: string;
  name: string;
  code: string;
};

export type BulkUpsertCurrencyRequest = {
  items: UpsertCurrencyRequest[];
};

export type BulkUpsertResponse = {
  ids: string[];
};

export async function fetchCurrenciesList(options: {
  client?: APIClientOptions;
}): Promise<EntityList<Currency>> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/currencies`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch currencies");
  }

  return response.json();
}

export async function fetchCurrency(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<Currency> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/currencies/${options.id}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch currency");
  }

  return response.json();
}

export async function createCurrency(options: {
  client?: APIClientOptions;
  data: UpsertCurrencyRequest;
}): Promise<EntityCreated> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/currencies`,
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
    throw new Error("Failed to create currency");
  }

  return response.json();
}

export async function updateCurrency(options: {
  client?: APIClientOptions;
  id: string;
  data: UpsertCurrencyRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/currencies/${options.id}`,
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
    throw new Error("Failed to update currency");
  }
}

export async function deleteCurrency(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/currencies/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete currency");
  }
}

export async function bulkUpsertCurrencies(options: {
  client?: APIClientOptions;
  data: BulkUpsertCurrencyRequest;
}): Promise<BulkUpsertResponse> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/currencies/bulk`,
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
    throw new Error("Failed to bulk upsert currencies");
  }

  return response.json();
}
