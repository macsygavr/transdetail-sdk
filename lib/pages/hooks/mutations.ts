import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

import { createPage, deletePage, updatePage } from "../api";
import { UpsertPageRequest } from "../entities";
import { useAPIClientOptions } from "../../common/hooks/client";

export function useCreatePageMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof createPage>>,
        Error,
        UpsertPageRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["pages", "create"],
    mutationFn: (data) =>
      createPage({
        client: client,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useUpdatePageMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof updatePage>>,
        Error,
        { page_id: string; data: UpsertPageRequest }
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["pages", "update"],
    mutationFn: ({ page_id, data }) =>
      updatePage({
        client: client,
        page_id: page_id,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useDeletePageMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<Awaited<ReturnType<typeof deletePage>>, Error, string>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["pages", "delete"],
    mutationFn: (page_id) =>
      deletePage({
        client: client,
        page_id: page_id,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
