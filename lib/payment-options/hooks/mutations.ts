import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { EntityCreated } from "../../common/entities";
import {
  createPaymentOption,
  updatePaymentOption,
  deletePaymentOption,
  bulkUpsertPaymentOptions,
  UpsertPaymentOptionRequest,
  BulkUpsertPaymentOptionsRequest,
  BulkUpsertPaymentOptionsResponse,
} from "../api";
import { useAPIClientOptions } from "../../common/hooks/client";

export function useCreatePaymentOptionMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<EntityCreated, Error, UpsertPaymentOptionRequest>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["payment-options", "create"],
    mutationFn: (data) =>
      createPaymentOption({
        client: client,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["payment-options"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useUpdatePaymentOptionMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        void,
        Error,
        { id: string; data: UpsertPaymentOptionRequest }
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["payment-options", "update"],
    mutationFn: ({ id, data }) =>
      updatePaymentOption({
        client: client,
        id: id,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["payment-options"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useDeletePaymentOptionMutation(
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
    mutationKey: ["payment-options", "delete"],
    mutationFn: (id) =>
      deletePaymentOption({
        client: client,
        id: id,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["payment-options"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useBulkUpsertPaymentOptionsMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        BulkUpsertPaymentOptionsResponse,
        Error,
        BulkUpsertPaymentOptionsRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["payment-options", "bulk-upsert"],
    mutationFn: (data) =>
      bulkUpsertPaymentOptions({
        client: client,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["payment-options"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
