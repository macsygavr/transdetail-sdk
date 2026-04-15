import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useAPIClientOptions } from "../../common/hooks/client";
import { createCategory, updateCategory, deleteCategory } from "../api";
import { UpsertCategoryRequest } from "../api";
import { EntityCreated } from "../../common/entities";

export function useCategoryCreateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<EntityCreated, Error, UpsertCategoryRequest>,
      "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationFn: (data) =>
      createCategory({
        client: client,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useCategoryUpdateMutation(
  {
    params,
    mutationOptions,
  }: {
    params: { id: string };
    mutationOptions?: Omit<
      UseMutationOptions<void, Error, UpsertCategoryRequest>,
      "mutationFn"
    >;
  },
) {
  const { id } = params;
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationFn: (data: UpsertCategoryRequest) =>
      updateCategory({
        client: client,
        id: id,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useCategoryDeleteMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<UseMutationOptions<void, Error, string>, "mutationFn">;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationFn: (id) =>
      deleteCategory({
        client: client,
        id: id,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
