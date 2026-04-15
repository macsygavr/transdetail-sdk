import {
  UseQueryOptions,
  queryOptions as createQueryOptions,
} from "@tanstack/react-query";
import { EntityList, Query } from "../../common/entities";
import { APIClientOptions } from "../../common/api";
import { fetchMaterial, fetchMaterialsList } from "../api";
import { Material, MaterialFilter } from "../entities";

export function useMaterialsListQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params?: {
      query?: Query<MaterialFilter>;
    };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<Material>>,
      "queryKey" | "queryFn"
    >;
  } = {},
) {
  const { query } = params ?? {};

  return createQueryOptions({
    staleTime: Infinity,
    ...queryOptions,
    queryKey: ["materials", "list", query],
    queryFn: () => fetchMaterialsList({ client: clientOptions, query }),
  });
}

export function useMaterialQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: {
      id: string;
    };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<UseQueryOptions<Material>, "queryKey" | "queryFn">;
  },
) {
  const { id } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["materials", id],
    queryFn: () => fetchMaterial({ client: clientOptions, id }),
  });
}
