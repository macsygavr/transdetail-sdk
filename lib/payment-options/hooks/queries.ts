import {
  UseQueryOptions,
  queryOptions as createQueryOptions,
} from "@tanstack/react-query";
import { APIClientOptions } from "../../common/api";
import { EntityList } from "../../common/entities";
import { PaymentOption } from "../entities";
import { listPaymentOptions, getPaymentOption } from "../api";

export function usePaymentOptionsListQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params?: { include_inactive?: boolean };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<PaymentOption>>,
      "queryKey" | "queryFn"
    >;
  } = {},
) {
  const { include_inactive = false } = params ?? {};

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["payment-options", "list", { include_inactive }],
    queryFn: () =>
      listPaymentOptions({ client: clientOptions, include_inactive }),
  });
}

export function usePaymentOptionQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { id: string };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<UseQueryOptions<PaymentOption>, "queryKey" | "queryFn">;
  },
) {
  const { id } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["payment-options", id],
    queryFn: () => getPaymentOption({ client: clientOptions, id }),
  });
}
