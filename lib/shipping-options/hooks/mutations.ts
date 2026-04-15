import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { EntityCreated } from "../../common/entities";
import {
  createShippingOption,
  updateShippingOption,
  deleteShippingOption,
  bulkUpsertShippingOptions,
  UpsertShippingOptionRequest,
  BulkUpsertShippingOptionsRequest,
  BulkUpsertShippingOptionsResponse,
} from "../api";
import { useAPIClientOptions } from "../../common/hooks/client";

export function useCreateShippingOptionMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<EntityCreated, Error, UpsertShippingOptionRequest>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["shipping-options", "create"],
    mutationFn: (data) =>
      createShippingOption({
        client: client,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["shipping-options"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useUpdateShippingOptionMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        void,
        Error,
        { id: string; data: UpsertShippingOptionRequest }
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["shipping-options", "update"],
    mutationFn: ({ id, data }) =>
      updateShippingOption({
        client: client,
        id: id,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["shipping-options"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useDeleteShippingOptionMutation(
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
    mutationKey: ["shipping-options", "delete"],
    mutationFn: (id) =>
      deleteShippingOption({
        client: client,
        id: id,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["shipping-options"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useBulkUpsertShippingOptionsMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        BulkUpsertShippingOptionsResponse,
        Error,
        BulkUpsertShippingOptionsRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["shipping-options", "bulk-upsert"],
    mutationFn: (data) =>
      bulkUpsertShippingOptions({
        client: client,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["shipping-options"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
