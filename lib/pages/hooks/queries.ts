import {
  UseQueryOptions,
  queryOptions as createQueryOptions,
} from "@tanstack/react-query";
import { APIClientOptions } from "../../common/api";
import { fetchPagesList, fetchPageById, fetchPageBySlug } from "../api";
import { ListPagesResult, Page } from "../entities";

export function usePagesListQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params?: { is_published?: boolean };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<ListPagesResult>,
      "queryKey" | "queryFn"
    >;
  } = {},
) {
  const { is_published } = params ?? {};

  return createQueryOptions({
    staleTime: Infinity,
    ...queryOptions,
    queryKey: ["pages", "list", { is_published }],
    queryFn: () => fetchPagesList({ client: clientOptions, is_published }),
  });
}

export function usePageQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { id: string; is_published?: boolean };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<UseQueryOptions<Page>, "queryKey" | "queryFn">;
  },
) {
  const { id, is_published } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["pages", "detail", id, { is_published }],
    queryFn: () =>
      fetchPageById({ client: clientOptions, page_id: id, is_published }),
  });
}

export function usePageBySlugQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { slug: string; is_published?: boolean };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<UseQueryOptions<Page>, "queryKey" | "queryFn">;
  },
) {
  const { slug, is_published } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["pages", "slug", slug, { is_published }],
    queryFn: () =>
      fetchPageBySlug({ client: clientOptions, page_slug: slug, is_published }),
  });
}
