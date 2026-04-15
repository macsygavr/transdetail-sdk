import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useAPIClientOptions } from "../../common/hooks/client";
import {
  createBroadcastMessage,
  updateBroadcastMessage,
  deleteBroadcastMessage,
  markMessageAsRead,
  UpsertBroadcastMessageRequest,
} from "../api";
import { CreateBroadcastMessageResponse } from "../entities";

export function useCreateBroadcastMessageMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<
      CreateBroadcastMessageResponse,
      Error,
      UpsertBroadcastMessageRequest
    >,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["broadcast-messages", "create"],
    mutationFn: (params) =>
      createBroadcastMessage({
        client: client,
        data: params,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["broadcast-messages"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useUpdateBroadcastMessageMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<
      void,
      Error,
      { id: string; data: UpsertBroadcastMessageRequest }
    >,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["broadcast-messages", "update"],
    mutationFn: ({ id, data }) =>
      updateBroadcastMessage({
        client: client,
        id: id,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["broadcast-messages"] });
      queryClient.invalidateQueries({
        queryKey: ["broadcast-messages", "detail", variables.id],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useDeleteBroadcastMessageMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<void, Error, string>,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["broadcast-messages", "delete"],
    mutationFn: (id) =>
      deleteBroadcastMessage({
        client: client,
        id: id,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["broadcast-messages"] });
      queryClient.removeQueries({
        queryKey: ["broadcast-messages", "detail", variables],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useMarkMessageAsReadMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<void, Error, string>,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["broadcast-messages", "read"],
    mutationFn: (messageId) =>
      markMessageAsRead({
        client: client,
        messageId: messageId,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["broadcast-messages"] });
      queryClient.invalidateQueries({
        queryKey: ["broadcast-messages", "unread"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
