import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useAPIClientOptions } from "../../common/hooks/client";
import {
  createWarehouse,
  deleteWarehouse,
  updateWarehouse,
  bulkUpsertWarehouses,
  UpsertWarehouseRequest,
  BulkUpdateRequest,
  BulkUpsertResponse,
} from "../api";

export function useWarehouseCreateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof createWarehouse>>,
        Error,
        UpsertWarehouseRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["warehouses", "create"],
    mutationFn: (data) =>
      createWarehouse({
        client: client,
        data: data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({
        queryKey: ["warehouses"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useWarehouseUpdateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof updateWarehouse>>,
        Error,
        { id: string; data: UpsertWarehouseRequest }
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["warehouses", "update"],
    mutationFn: ({ id, data }) =>
      updateWarehouse({
        client: client,
        id: id,
        data: data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({
        queryKey: ["warehouses"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useWarehouseDeleteMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof deleteWarehouse>>,
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
    mutationKey: ["warehouses", "delete"],
    mutationFn: (id: string) =>
      deleteWarehouse({
        client: client,
        id: id,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({
        queryKey: ["warehouses"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useBulkUpsertWarehousesMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<BulkUpsertResponse, Error, BulkUpdateRequest>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["warehouses", "bulk-upsert"],
    mutationFn: (data) =>
      bulkUpsertWarehouses({
        client: client,
        data: data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({
        queryKey: ["warehouses"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
