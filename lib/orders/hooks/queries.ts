import {
  UseQueryOptions,
  queryOptions as createQueryOptions,
} from "@tanstack/react-query";
import { APIClientOptions } from "../../common/api";
import { EntityList } from "../../common/entities";
import {
  fetchOrder,
  fetchOrderByNumericId,
  FetchOrderParams,
  fetchOrdersList,
  fetchOrderStatus,
  fetchOrderStatusesList,
  OrderFilter,
} from "../api";
import { Order, OrderStatus } from "../entities";

export function useOrdersListQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params?: { filter?: OrderFilter };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<Order>>,
      "queryKey" | "queryFn"
    >;
  } = {},
) {
  const filter = params?.filter ?? {};

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["orders", "list", filter],
    queryFn: () => fetchOrdersList({ client: clientOptions, query: filter }),
  });
}

export function useOrderQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { id: string; fetchParams?: FetchOrderParams };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<UseQueryOptions<Order>, "queryKey" | "queryFn">;
  },
) {
  const { id, fetchParams } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["orders", id, fetchParams],
    queryFn: () => fetchOrder({ client: clientOptions, id, params: fetchParams }),
  });
}

export function useOrderByNumericIdQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { numericId: number; fetchParams?: FetchOrderParams };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<UseQueryOptions<Order>, "queryKey" | "queryFn">;
  },
) {
  const { numericId, fetchParams } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["orders", "numeric", numericId, fetchParams],
    queryFn: () =>
      fetchOrderByNumericId({
        client: clientOptions,
        numericId,
        params: fetchParams,
      }),
    enabled: !!numericId,
  });
}

export function useOrderStatusesListQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params?: { is_default?: boolean | null; limit?: number; offset?: number };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<OrderStatus>>,
      "queryKey" | "queryFn"
    >;
  } = {},
) {
  return createQueryOptions({
    staleTime: Infinity,
    ...queryOptions,
    queryKey: ["order-statuses", "list", params],
    queryFn: () =>
      fetchOrderStatusesList({
        client: clientOptions,
        is_default: params?.is_default,
        limit: params?.limit,
        offset: params?.offset,
      }),
  });
}

export function useOrderStatusQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { id: string };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<OrderStatus>,
      "queryKey" | "queryFn"
    >;
  },
) {
  const { id } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["order-statuses", id],
    queryFn: () => fetchOrderStatus({ client: clientOptions, id }),
  });
}
