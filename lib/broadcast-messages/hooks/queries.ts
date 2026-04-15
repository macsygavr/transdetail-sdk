import {
  UseQueryOptions,
  queryOptions as createQueryOptions,
} from "@tanstack/react-query";
import { APIClientOptions } from "../../common/api";
import { fetchBroadcastMessage, listBroadcastMessages } from "../api";
import { BroadcastMessage, ListBroadcastMessagesResponse } from "../entities";

export function useListBroadcastMessagesQueryOptions({
  params,
  clientOptions,
  queryOptions,
}: {
  params?: {
    unread?: boolean | null;
    limit?: number;
    offset?: number;
  };
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<
    UseQueryOptions<ListBroadcastMessagesResponse>,
    "queryKey" | "queryFn"
  >;
} = {}) {
  const { unread, limit, offset } = params ?? {};

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["broadcast-messages", "list", { unread, limit, offset }],
    queryFn: () =>
      listBroadcastMessages({ client: clientOptions, unread, limit, offset }),
  });
}

export function useBroadcastMessageQueryOptions({
  params,
  clientOptions,
  queryOptions,
}: {
  params: { id: string };
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<
    UseQueryOptions<BroadcastMessage>,
    "queryKey" | "queryFn"
  >;
}) {
  const { id } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["broadcast-messages", "detail", id],
    queryFn: () => fetchBroadcastMessage({ client: clientOptions, id }),
    enabled: !!id,
  });
}

export function useUnreadBroadcastMessagesQueryOptions({
  clientOptions,
  queryOptions,
}: {
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<
    UseQueryOptions<ListBroadcastMessagesResponse>,
    "queryKey" | "queryFn"
  >;
} = {}) {
  return createQueryOptions({
    ...queryOptions,
    queryKey: ["broadcast-messages", "unread"],
    queryFn: () =>
      listBroadcastMessages({ client: clientOptions, unread: true }),
  });
}
