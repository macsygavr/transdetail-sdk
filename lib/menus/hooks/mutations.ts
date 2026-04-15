import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useAPIClientOptions } from "../../common/hooks/client";
import { createMenu, deleteMenu, updateMenu } from "../api";
import { CreateMenuResult, UpsertMenuRequest } from "../entities";

export function useCreateMenuMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<CreateMenuResult, Error, UpsertMenuRequest>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["menus", "create"],
    mutationFn: (data) =>
      createMenu({
        client,
        params: { data },
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useUpdateMenuMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof updateMenu>>,
        Error,
        { menu_id: string; data: UpsertMenuRequest }
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["menus", "update"],
    mutationFn: ({ menu_id, data }) =>
      updateMenu({
        client,
        params: { menu_id, data },
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useDeleteMenuMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof deleteMenu>>,
        Error,
        { menu_id: string }
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["menus", "delete"],
    mutationFn: ({ menu_id }) =>
      deleteMenu({
        client,
        params: { menu_id },
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
