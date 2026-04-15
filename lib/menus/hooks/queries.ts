import {
  UseQueryOptions,
  queryOptions as createQueryOptions,
} from "@tanstack/react-query";
import { APIClientOptions } from "../../common/api";
import { fetchMenuById, fetchMenusList } from "../api";
import { ListMenusResult, Menu } from "../entities";

export function useMenusListQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params?: { include_inactive?: boolean };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<ListMenusResult>,
      "queryKey" | "queryFn"
    >;
  } = {},
) {
  const { include_inactive } = params ?? {};

  return createQueryOptions({
    staleTime: Infinity,
    ...queryOptions,
    queryKey: ["menus", "list", { include_inactive }],
    queryFn: () =>
      fetchMenusList({
        client: clientOptions,
        params: { include_inactive },
      }),
  });
}

export function useMenuQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { id: string };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<UseQueryOptions<Menu>, "queryKey" | "queryFn">;
  },
) {
  const { id } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["menus", "detail", id],
    queryFn: () =>
      fetchMenuById({
        client: clientOptions,
        params: { menu_id: id },
      }),
  });
}
