import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { useAPIClientOptions } from "../../common/hooks/client";
import {
  createMaterial,
  deleteMaterial,
  updateMaterial,
  bulkUpsertMaterials,
  UpsertMaterialRequest,
  BulkUpsertMaterialsRequest,
  BulkUpsertResponse,
} from "../api";

export function useMaterialCreateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof createMaterial>>,
        Error,
        UpsertMaterialRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["materials", "create"],
    mutationFn: (params) =>
      createMaterial({
        client: client,
        data: params,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({
        queryKey: ["materials"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useMaterialUpdateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof updateMaterial>>,
        Error,
        { id: string; data: UpsertMaterialRequest }
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["materials", "update"],
    mutationFn: ({ id, data }) =>
      updateMaterial({
        client: client,
        id: id,
        data: data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({
        queryKey: ["materials"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useMaterialDeleteMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof deleteMaterial>>,
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
    mutationKey: ["materials", "delete"],
    mutationFn: (id: string) =>
      deleteMaterial({
        client: client,
        id: id,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["materials"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useBulkUpsertMaterialsMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<BulkUpsertResponse, Error, BulkUpsertMaterialsRequest>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["materials", "bulk-upsert"],
    mutationFn: (params) =>
      bulkUpsertMaterials({
        client: client,
        data: params,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({
        queryKey: ["materials"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
