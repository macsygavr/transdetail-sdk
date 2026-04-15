import {
  UseQueryOptions,
  queryOptions as createQueryOptions,
} from "@tanstack/react-query";
import { APIClientOptions } from "../../common/api";
import { EntityList } from "../../common/entities";
import { fetchWarehouse, fetchWarehousesList } from "../api";
import { Warehouse } from "../entities";

export function useWarehousesListQueryOptions(
  {
    clientOptions,
    queryOptions,
  }: {
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<Warehouse>>,
      "queryKey" | "queryFn"
    >;
  } = {},
) {
  return createQueryOptions({
    staleTime: Infinity,
    ...queryOptions,
    queryKey: ["warehouses", "list"],
    queryFn: () =>
      fetchWarehousesList({
        client: clientOptions,
      }),
  });
}

export function useWarehouseQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { id: string };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<UseQueryOptions<Warehouse>, "queryKey" | "queryFn">;
  },
) {
  const { id } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["warehouses", "detail", id],
    queryFn: () =>
      fetchWarehouse({
        client: clientOptions,
        id: id,
      }),
  });
}
