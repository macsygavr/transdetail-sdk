import {
  UseQueryOptions,
  queryOptions as createQueryOptions,
} from "@tanstack/react-query";
import { APIClientOptions } from "../../common/api";
import { EntityList } from "../../common/entities";
import { getMediaMetadata, listMedia } from "../api";

export function useListMediaQueryOptions(
  {
    clientOptions,
    queryOptions,
  }: {
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<string>>,
      "queryKey" | "queryFn"
    >;
  } = {},
) {
  return createQueryOptions({
    ...queryOptions,
    queryKey: ["media", "list"],
    queryFn: () => listMedia({ client: clientOptions }),
  });
}

export function useMediaMetadataQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { id: string };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<Record<string, unknown>>,
      "queryKey" | "queryFn"
    >;
  },
) {
  const { id } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["media", id],
    queryFn: () => getMediaMetadata({ client: clientOptions, id }),
  });
}
