import {
  UseQueryOptions,
  queryOptions as createQueryOptions,
} from "@tanstack/react-query";
import { APIClientOptions } from "../../common/api";
import { fetchCategoriesList, fetchCategory } from "../api";
import { Category } from "../entities";
import { EntityList } from "../../common/entities";

export function useCategoriesListQueryOptions(
  {
    params = {},
    clientOptions,
    queryOptions,
  }: {
    params?: { parent_id?: string | null; include_inactive?: boolean };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<Category>>,
      "queryKey" | "queryFn"
    >;
  } = {},
) {
  const { parent_id, include_inactive = false } = params;
  return createQueryOptions({
    staleTime: Infinity,
    ...queryOptions,
    queryKey: ["categories", "list", { parent_id, include_inactive }],
    queryFn: () =>
      fetchCategoriesList({
        client: clientOptions,
        parent_id,
        include_inactive,
      }),
  });
}

export function useCategoryQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { id: string };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<UseQueryOptions<Category>, "queryKey" | "queryFn">;
  },
) {
  const { id } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["categories", id],
    queryFn: () => fetchCategory({ client: clientOptions, id }),
  });
}
