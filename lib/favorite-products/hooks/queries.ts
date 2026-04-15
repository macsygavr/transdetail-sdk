import {
  UseQueryOptions,
  queryOptions as createQueryOptions,
} from "@tanstack/react-query";
import { APIClientOptions } from "../../common/api";
import {
  fetchUserFavoritesList,
  UserFavoritesProductListOptions,
} from "../api";
import { UserFavoritesProduct } from "../entities";
import { EntityList } from "../../common/entities";

export function useUserFavoritesListQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params?: UserFavoritesProductListOptions;
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<UserFavoritesProduct>>,
      "queryKey" | "queryFn"
    >;
  } = {},
) {
  return createQueryOptions({
    staleTime: Infinity,
    ...queryOptions,
    queryKey: ["user-favorites", "list", params],
    queryFn: () =>
      fetchUserFavoritesList({ client: clientOptions, ...params }),
  });
}
