import {
  UseQueryOptions,
  queryOptions as createQueryOptions,
} from "@tanstack/react-query";
import { APIClientOptions } from "../../common/api";
import { EntityList } from "../../common/entities";
import { ShippingOption, ShippingMethod } from "../entities";
import { listShippingOptions, getShippingOption } from "../api";

export function useShippingOptionsListQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params?: {
      method?: ShippingMethod | null;
      include_inactive?: boolean;
    };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<ShippingOption>>,
      "queryKey" | "queryFn"
    >;
  } = {},
) {
  const { method, include_inactive = false } = params ?? {};

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["shipping-options", "list", { method, include_inactive }],
    queryFn: () =>
      listShippingOptions({ client: clientOptions, method, include_inactive }),
  });
}

export function useShippingOptionQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { id: string };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<ShippingOption>,
      "queryKey" | "queryFn"
    >;
  },
) {
  const { id } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["shipping-options", id],
    queryFn: () => getShippingOption({ client: clientOptions, id }),
  });
}
