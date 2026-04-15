import {
  UseQueryOptions,
  queryOptions as createQueryOptions,
} from "@tanstack/react-query";
import { APIClientOptions } from "../../common/api";
import { EntityList } from "../../common/entities";
import { fetchManufacturer, fetchManufacturersList } from "../api";
import { Manufacturer } from "../entities";

export function useManufacturersListQueryOptions(
  {
    clientOptions,
    queryOptions,
  }: {
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<Manufacturer>>,
      "queryKey" | "queryFn"
    >;
  } = {},
) {
  return createQueryOptions({
    staleTime: Infinity,
    ...queryOptions,
    queryKey: ["manufacturers", "list"],
    queryFn: () => fetchManufacturersList({ client: clientOptions }),
  });
}

export function useManufacturerQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { id: string };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<UseQueryOptions<Manufacturer>, "queryKey" | "queryFn">;
  },
) {
  const { id } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["manufacturers", id],
    queryFn: () => fetchManufacturer({ client: clientOptions, id }),
  });
}
