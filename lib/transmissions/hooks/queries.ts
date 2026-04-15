import {
  UseQueryOptions,
  queryOptions as createQueryOptions,
} from "@tanstack/react-query";
import { APIClientOptions } from "../../common/api";
import { EntityList, Query } from "../../common/entities";
import {
  fetchTransmission,
  fetchTransmissionsList,
  queryTransmissions,
  TransmissionFilter,
  TransmissionQueryParams,
} from "../api";
import { Transmission } from "../entities";

export function useTransmissionsListQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params?: {
      parentId?: string | null;
      include_inactive?: boolean;
    };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<Transmission>>,
      "queryKey" | "queryFn"
    >;
  } = {},
) {
  const { parentId, include_inactive = false } = params ?? {};

  return createQueryOptions({
    staleTime: Infinity,
    ...queryOptions,
    queryKey: ["transmissions", "list", { parentId, include_inactive }],
    queryFn: () =>
      fetchTransmissionsList({
        client: clientOptions,
        parentId,
        include_inactive,
      }),
  });
}

export function useTransmissionQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: {
      id: string;
    };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<Transmission>,
      "queryKey" | "queryFn"
    >;
  },
) {
  const { id } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["transmissions", id],
    queryFn: () => fetchTransmission({ client: clientOptions, id }),
  });
}

export function useTransmissionsQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: {
      query: Query<TransmissionFilter>;
      searchParams: TransmissionQueryParams;
    };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<Transmission>>,
      "queryKey" | "queryFn"
    >;
  },
) {
  const { query, searchParams } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["transmissions", "query", query, searchParams],
    queryFn: () =>
      queryTransmissions({
        client: clientOptions,
        query,
        params: searchParams,
      }),
  });
}
