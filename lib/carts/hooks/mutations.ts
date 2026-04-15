import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useAPIClientOptions } from "../../common/hooks/client";
import {
  CartExpandOption,
  createCart,
  deleteCart,
  removeCartItems,
  setCurrentCart,
  updateCart,
  upsertCartItems,
  CreateCartRequest,
  SetCurrentCartRequest,
  UpdateCartRequest,
  UpsertDeleteCartItemRequest,
} from "../api";

export type SetCurrentCartVariables = SetCurrentCartRequest & {
  expand?: CartExpandOption[];
};

export function useCartCreateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof createCart>>,
        Error,
        CreateCartRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["carts", "create"],
    mutationFn: (data) =>
      createCart({
        client: client,
        data: data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useCartUpdateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof updateCart>>,
        Error,
        { cart_id: string } & UpdateCartRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["carts", "update"],
    mutationFn: (data) => {
      const { cart_id, ...updateData } = data;
      return updateCart({
        client: client,
        cart_id: cart_id,
        data: updateData,
      });
    },
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      mutationOptions?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context,
      );
    },
  });
}

export function useCartDeleteMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<Awaited<ReturnType<typeof deleteCart>>, Error, string>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["carts", "delete"],
    mutationFn: (id: string) =>
      deleteCart({
        client: client,
        id: id,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useUpsertCartItemsMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof upsertCartItems>>,
        Error,
        UpsertDeleteCartItemRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["carts", "items", "upsert"],
    mutationFn: (data) => {
      const { cart_id, items } = data;
      return upsertCartItems({
        client: client,
        cart_id: cart_id,
        items: items,
      });
    },
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useRemoveCartItemsMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof removeCartItems>>,
        Error,
        UpsertDeleteCartItemRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["carts", "items", "remove"],
    mutationFn: (data) => {
      const { cart_id, items } = data;
      return removeCartItems({
        client: client,
        cart_id: cart_id,
        items: items,
      });
    },
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useSetCurrentCartMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof setCurrentCart>>,
        Error,
        SetCurrentCartVariables
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["carts", "current", "set"],
    mutationFn: ({ expand, ...data }) =>
      setCurrentCart({
        client: client,
        data: data,
        expand: expand,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
