import { APIClientOptions, fetchWithMiddlewares } from "../../common/api";
import { EntityCreated, EntityList } from "../../common/entities";
import { Order, OrderStatus } from "../entities";

export type OrdersExpandOption =
  | "user"
  | "contact_person"
  | "product"
  | "company";

export type UpsertOrderStatusRequest = {
  id?: string;
  name: Record<string, string>;
  description: Record<string, string>;
  color: string;
  is_default?: boolean;
  sort_order: number;
};

export type BulkUpsertOrderStatusRequest = {
  items: UpsertOrderStatusRequest[];
};

export type BulkUpsertOrderStatusResponse = {
  ids: string[];
};

export type CreateOrderRequest = {
  cart_id: string;
  company_id: string;
  contact_person_id?: string | null;
};

export type OrderStatusUpdateRequest = {
  name?: Record<string, string> | null;
  description?: Record<string, string> | null;
  color?: string | null;
  is_default?: boolean | null;
  sort_order?: number | null;
};

export type OrderFilter = {
  user_id?: string;
  company_id?: string;
  status_id?: string;
  limit?: number;
  offset?: number;
  count?: boolean;
  expand?: OrdersExpandOption[];
};

export async function fetchOrdersList(options: {
  client?: APIClientOptions;
  query?: OrderFilter;
}): Promise<EntityList<Order>> {
  const queryParams = new URLSearchParams();
  const query = options.query ?? {};

  Object.keys(query).forEach((key) => {
    const value = query[key as keyof OrderFilter];
    if (value !== undefined && value !== null) {
      if (key === "expand" && Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, String(v)));
      } else if (key === "count" && typeof value === "boolean") {
        queryParams.append(key, value.toString());
      } else {
        queryParams.append(key, String(value));
      }
    }
  });

  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/orders?${queryParams.toString()}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch orders list");
  }

  return response.json();
}

export type FetchOrderParams = {
  expand: OrdersExpandOption[];
};

export async function fetchOrder(options: {
  client?: APIClientOptions;
  id: string;
  params?: FetchOrderParams;
}): Promise<Order> {
  const queryParams = new URLSearchParams();
  if (options.params?.expand) {
    options.params.expand.forEach((item) => queryParams.append("expand", item));
  }

  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/orders/${options.id}` +
      (queryParams.size ? `?${queryParams.toString()}` : ""),
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch order");
  }

  return response.json();
}

export async function fetchOrderByNumericId(options: {
  client?: APIClientOptions;
  numericId: number;
  params?: FetchOrderParams;
}): Promise<Order> {
  const queryParams = new URLSearchParams();
  if (options.params?.expand) {
    options.params.expand.forEach((item) => queryParams.append("expand", item));
  }

  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/orders/${options.numericId}/numeric_id` +
      (queryParams.size ? `?${queryParams.toString()}` : ""),
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch order by numeric ID: ${options.numericId}`,
    );
  }

  return response.json();
}

export async function fetchOrderPdf(options: {
  client?: APIClientOptions;
  orderId: string;
}): Promise<Blob> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/orders/${options.orderId}/details/pdf`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch order PDF for order: ${options.orderId}`);
  }

  return response.blob();
}

export async function createOrder(options: {
  client?: APIClientOptions;
  data: CreateOrderRequest;
}): Promise<Order> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/orders`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return response.json();
}

export async function updateOrder(options: {
  client?: APIClientOptions;
  id: string;
  data: {
    status_id?: string | null;
    numeric_id?: number | null;
    contact_person_id?: string | null;
  };
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/orders/${options.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update order");
  }
}

export async function completeOrder(options: {
  client?: APIClientOptions;
  id: string;
  data: { contact_person_id?: string | null };
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/orders/${options.id}/complete`,
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
    throw new Error("Failed to complete order");
  }
}

export async function fetchOrderStatusesList(options: {
  client?: APIClientOptions;
  is_default?: boolean | null;
  limit?: number;
  offset?: number;
}): Promise<EntityList<OrderStatus>> {
  const params = new URLSearchParams();
  if (options.is_default !== undefined && options.is_default !== null) {
    params.set("is_default", String(options.is_default));
  }
  params.set("limit", String(options.limit ?? 100));
  params.set("offset", String(options.offset ?? 0));

  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/order-statuses?${params.toString()}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch order statuses");
  }

  return response.json();
}

export async function fetchOrderStatus(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<OrderStatus> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/order-statuses/${options.id}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch order status");
  }

  return response.json();
}

export async function createOrderStatus(options: {
  client?: APIClientOptions;
  data: UpsertOrderStatusRequest;
}): Promise<OrderStatus> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/order-statuses`,
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
    throw new Error("Failed to create order status");
  }

  return response.json();
}

export async function updateOrderStatus(options: {
  client?: APIClientOptions;
  id: string;
  data: OrderStatusUpdateRequest;
}): Promise<OrderStatus> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/order-statuses/${options.id}`,
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
    throw new Error("Failed to update order status");
  }

  return response.json();
}

export async function deleteOrderStatus(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/order-statuses/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete order status");
  }
}

export async function bulkUpsertOrderStatuses(options: {
  client?: APIClientOptions;
  data: BulkUpsertOrderStatusRequest;
}): Promise<BulkUpsertOrderStatusResponse> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/order-statuses/bulk`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to bulk upsert order statuses");
  }

  return response.json();
}

export async function getDefaultOrderStatus(options: {
  client?: APIClientOptions;
}): Promise<OrderStatus> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/order-statuses/default`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch default order status");
  }

  return response.json();
}
