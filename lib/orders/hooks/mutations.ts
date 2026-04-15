import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useAPIClientOptions } from "../../common/hooks/client";
import {
  completeOrder,
  createOrder,
  createOrderStatus,
  deleteOrderStatus,
  updateOrder,
  updateOrderStatus,
  bulkUpsertOrderStatuses,
  fetchOrderPdf,
  OrderStatusUpdateRequest,
  UpsertOrderStatusRequest,
  CreateOrderRequest,
  BulkUpsertOrderStatusRequest,
  BulkUpsertOrderStatusResponse,
} from "../api";
import { Order } from "../entities";

export function useOrderCreateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<Order, Error, CreateOrderRequest>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["orders", "create"],
    mutationFn: (params) =>
      createOrder({
        client: client,
        data: params,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useOrderUpdateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof updateOrder>>,
        Error,
        {
          id: string;
          data: {
            status_id?: string | null;
            numeric_id?: number | null;
            contact_person_id?: string | null;
          };
        }
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["orders", "update"],
    mutationFn: ({ id, data }) =>
      updateOrder({
        client: client,
        id: id,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useOrderCompleteMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof completeOrder>>,
        Error,
        { id: string; data: { contact_person_id?: string | null } }
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["orders", "complete"],
    mutationFn: ({ id, data }) =>
      completeOrder({
        client: client,
        id: id,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useOrderPdfMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<Blob, Error, string>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["orders", "pdf"],
    mutationFn: (orderId) =>
      fetchOrderPdf({
        client: client,
        orderId: orderId,
      }),
  });
}

export function useOrderStatusCreateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof createOrderStatus>>,
        Error,
        UpsertOrderStatusRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["order-statuses", "create"],
    mutationFn: (data) =>
      createOrderStatus({
        client: client,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["order-statuses"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useOrderStatusUpdateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof updateOrderStatus>>,
        Error,
        { id: string; data: OrderStatusUpdateRequest }
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["order-statuses", "update"],
    mutationFn: ({ id, data }) =>
      updateOrderStatus({
        client: client,
        id: id,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["order-statuses"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useOrderStatusDeleteMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof deleteOrderStatus>>,
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
    mutationKey: ["order-statuses", "delete"],
    mutationFn: (id) =>
      deleteOrderStatus({
        client: client,
        id: id,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["order-statuses"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useBulkUpsertOrderStatusesMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        BulkUpsertOrderStatusResponse,
        Error,
        BulkUpsertOrderStatusRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["order-statuses", "bulk-upsert"],
    mutationFn: (data) =>
      bulkUpsertOrderStatuses({
        client: client,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["order-statuses"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
