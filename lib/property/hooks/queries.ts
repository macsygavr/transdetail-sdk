import {
  UseQueryOptions,
  queryOptions as createQueryOptions,
} from "@tanstack/react-query";
import { APIClientOptions } from "../../common/api";
import { EntityList } from "../../common/entities";
import {
  getProperty,
  getPropertyGroup,
  listProperties,
  listPropertyGroups,
} from "../api";
import { Property, PropertyGroup } from "../entities";

export function useListPropertiesQueryOptions(
  {
    clientOptions,
    queryOptions,
  }: {
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<Property>>,
      "queryKey" | "queryFn"
    >;
  } = {},
) {
  return createQueryOptions({
    staleTime: Infinity,
    ...queryOptions,
    queryKey: ["properties", "list"],
    queryFn: () => listProperties({ client: clientOptions }),
  });
}

export function usePropertyQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { id: string };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<UseQueryOptions<Property>, "queryKey" | "queryFn">;
  },
) {
  const { id } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["properties", "detail", id],
    queryFn: () => getProperty({ client: clientOptions, id }),
  });
}

export function usePropertyGroupsListQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params?: {
      name?: string | null;
      limit?: number;
      offset?: number;
    };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<PropertyGroup>>,
      "queryKey" | "queryFn"
    >;
  } = {},
) {
  const { name, limit = 10, offset = 0 } = params ?? {};

  return createQueryOptions({
    staleTime: Infinity,
    ...queryOptions,
    queryKey: ["property-groups", "list", { name, limit, offset }],
    queryFn: () =>
      listPropertyGroups({ client: clientOptions, name, limit, offset }),
  });
}

export function usePropertyGroupQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { id: string };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<PropertyGroup>,
      "queryKey" | "queryFn"
    >;
  },
) {
  const { id } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["property-groups", "detail", id],
    queryFn: () => getPropertyGroup({ client: clientOptions, id }),
  });
}
