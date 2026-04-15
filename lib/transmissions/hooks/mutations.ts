import { useAPIClientOptions } from "../../common/hooks/client";
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  createTransmission,
  updateTransmission,
  deleteTransmission,
  bulkUpsertTransmissions,
  UpsertTransmissionRequest,
  BulkUpsertTransmissionsRequest,
  BulkUpsertTransmissionsResponse,
} from "../api";
import { EntityCreated } from "../../common/entities";

export function useTransmissionCreateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<EntityCreated, Error, UpsertTransmissionRequest>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["transmissions", "create"],
    mutationFn: (data) =>
      createTransmission({
        client,
        data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({
        queryKey: ["transmissions"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useTransmissionUpdateMutation(
  {
    params,
    mutationOptions,
  }: {
    params: {
      id: string;
    };
    mutationOptions?: Omit<
      UseMutationOptions<void, Error, UpsertTransmissionRequest>,
      "mutationKey" | "mutationFn"
    >;
  },
) {
  const { id } = params;
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["transmissions", "update", id],
    mutationFn: (data: UpsertTransmissionRequest) =>
      updateTransmission({
        client,
        id,
        data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({
        queryKey: ["transmissions"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useTransmissionDeleteMutation(
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
    mutationKey: ["transmissions", "delete"],
    mutationFn: (id: string) =>
      deleteTransmission({
        client,
        id,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["transmissions"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useBulkUpsertTransmissionsMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        BulkUpsertTransmissionsResponse,
        Error,
        BulkUpsertTransmissionsRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["transmissions", "bulk-upsert"],
    mutationFn: (data) =>
      bulkUpsertTransmissions({
        client,
        data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({
        queryKey: ["transmissions"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
