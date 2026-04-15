import {
  UseQueryOptions,
  queryOptions as createQueryOptions,
} from "@tanstack/react-query";
import { APIClientOptions } from "../../common/api";
import { EntityList } from "../../common/entities";
import {
  fetchCart,
  fetchCartsList,
  fetchCurrentCart,
  CartExpandOption,
} from "../api";
import { Cart } from "../entities";

export function useCartsListQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params?: { expand?: CartExpandOption[] };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<Cart>>,
      "queryKey" | "queryFn"
    >;
  } = {},
) {
  return createQueryOptions({
    staleTime: Infinity,
    ...queryOptions,
    queryKey: ["carts", "list", params],
    queryFn: () =>
      fetchCartsList({ client: clientOptions, expand: params?.expand }),
  });
}

export function useCartQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { id: string; fetchParams?: { expand?: CartExpandOption[] } };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<UseQueryOptions<Cart>, "queryKey" | "queryFn">;
  },
) {
  const { id, fetchParams } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["carts", id, fetchParams],
    queryFn: () =>
      fetchCart({ client: clientOptions, id, expand: fetchParams?.expand }),
  });
}

export function useCurrentCartQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params?: { company_id?: string | null; expand?: CartExpandOption[] };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<UseQueryOptions<Cart | null>, "queryKey" | "queryFn">;
  } = {},
) {
  const { company_id, expand } = params ?? {};

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["carts", "current", { company_id, expand }],
    queryFn: () =>
      fetchCurrentCart({
        client: clientOptions,
        company_id: company_id!,
        expand: expand,
      }),
    enabled: !!company_id,
  });
}
