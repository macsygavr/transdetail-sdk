import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useAPIClientOptions } from "../../common/hooks/client";
import {
  createProperty,
  updateProperty,
  deleteProperty,
  bulkUpsertProperties,
  createPropertyGroup,
  updatePropertyGroup,
  deletePropertyGroup,
  bulkUpsertPropertyGroups,
  UpsertPropertyRequest,
  BulkUpsertPropertiesRequest,
  BulkUpsertResponse,
  UpsertPropertyGroupRequest,
  BulkUpsertPropertyGroupsRequest,
} from "../api";
import { EntityCreated } from "../../common/entities";

export function useCreatePropertyMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof createProperty>>,
        Error,
        UpsertPropertyRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["properties", "create"],
    mutationFn: (data) =>
      createProperty({
        client: client,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useUpdatePropertyMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof updateProperty>>,
        Error,
        { id: string; data: UpsertPropertyRequest }
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["properties", "update"],
    mutationFn: ({ id, data }) =>
      updateProperty({
        client: client,
        id: id,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useDeletePropertyMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof deleteProperty>>,
        Error,
        string
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["properties", "delete"],
    mutationFn: (id) =>
      deleteProperty({
        client: client,
        id: id,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useBulkUpsertPropertiesMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<BulkUpsertResponse, Error, BulkUpsertPropertiesRequest>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["properties", "bulk-upsert"],
    mutationFn: (data) =>
      bulkUpsertProperties({
        client: client,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

// Property Groups Mutations

export function useCreatePropertyGroupMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<EntityCreated, Error, UpsertPropertyGroupRequest>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["property-groups", "create"],
    mutationFn: (data) =>
      createPropertyGroup({
        client: client,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["property-groups"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useUpdatePropertyGroupMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        void,
        Error,
        { id: string; data: UpsertPropertyGroupRequest }
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["property-groups", "update"],
    mutationFn: ({ id, data }) =>
      updatePropertyGroup({
        client: client,
        id: id,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["property-groups"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useDeletePropertyGroupMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<void, Error, string>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["property-groups", "delete"],
    mutationFn: (id) =>
      deletePropertyGroup({
        client: client,
        id: id,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["property-groups"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useBulkUpsertPropertyGroupsMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        BulkUpsertResponse,
        Error,
        BulkUpsertPropertyGroupsRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["property-groups", "bulk-upsert"],
    mutationFn: (data) =>
      bulkUpsertPropertyGroups({
        client: client,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["property-groups"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
