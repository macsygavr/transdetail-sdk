import {
  UseQueryOptions,
  queryOptions as createQueryOptions,
} from "@tanstack/react-query";
import { APIClientOptions } from "../../common/api";
import { EntityList } from "../../common/entities";
import { fetchCurrenciesList, fetchCurrency } from "../api";
import { Currency } from "../entities";

export function useCurrenciesListQueryOptions(
  {
    clientOptions,
    queryOptions,
  }: {
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<Currency>>,
      "queryKey" | "queryFn"
    >;
  } = {},
) {
  return createQueryOptions({
    staleTime: Infinity,
    ...queryOptions,
    queryKey: ["currencies", "list"],
    queryFn: () => fetchCurrenciesList({ client: clientOptions }),
  });
}

export function useCurrencyQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { id: string };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<UseQueryOptions<Currency>, "queryKey" | "queryFn">;
  },
) {
  const { id } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["currencies", id],
    queryFn: () => fetchCurrency({ client: clientOptions, id }),
  });
}
