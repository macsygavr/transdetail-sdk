import { APIClientOptions, fetchWithMiddlewares } from "../../common/api";
import { EntityCreated, EntityList } from "../../common/entities";
import { PaymentOption } from "../entities";

export type UpsertPaymentOptionRequest = {
  id?: string;
  name: Record<string, string>;
  icon: string;
  is_active: boolean;
  sort_order: number;
};

export type BulkUpsertPaymentOptionsRequest = {
  options: UpsertPaymentOptionRequest[];
};

export type BulkUpsertPaymentOptionsResponse = {
  ids: string[];
};

export async function listPaymentOptions(options: {
  client?: APIClientOptions;
  include_inactive?: boolean;
}): Promise<EntityList<PaymentOption>> {
  const params = new URLSearchParams();
  params.set("include_inactive", String(options.include_inactive ?? false));

  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/payment-options?${params.toString()}`,
    { credentials: "include" },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to list payment options");
  }

  return response.json();
}

export async function createPaymentOption(options: {
  client?: APIClientOptions;
  data: UpsertPaymentOptionRequest;
}): Promise<EntityCreated> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/payment-options`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to create payment option");
  }

  return response.json();
}

export async function getPaymentOption(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<PaymentOption> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/payment-options/${options.id}`,
    { credentials: "include" },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to get payment option");
  }

  return response.json();
}

export async function updatePaymentOption(options: {
  client?: APIClientOptions;
  id: string;
  data: UpsertPaymentOptionRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/payment-options/${options.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update payment option");
  }
}

export async function deletePaymentOption(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/payment-options/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete payment option");
  }
}

export async function bulkUpsertPaymentOptions(options: {
  client?: APIClientOptions;
  data: BulkUpsertPaymentOptionsRequest;
}): Promise<BulkUpsertPaymentOptionsResponse> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/payment-options/bulk`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to bulk upsert payment options");
  }

  return response.json();
}
