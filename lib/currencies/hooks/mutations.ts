import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useAPIClientOptions } from "../../common/hooks/client";
import {
  createCurrency,
  deleteCurrency,
  updateCurrency,
  bulkUpsertCurrencies,
  UpsertCurrencyRequest,
  BulkUpsertCurrencyRequest,
  BulkUpsertResponse,
} from "../api";

export function useCurrencyCreateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof createCurrency>>,
        Error,
        UpsertCurrencyRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["currencies", "create"],
    mutationFn: (params) =>
      createCurrency({
        client,
        data: params,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["currencies"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useCurrencyUpdateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof updateCurrency>>,
        Error,
        { id: string; data: UpsertCurrencyRequest }
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["currencies", "update"],
    mutationFn: ({ id, data }) =>
      updateCurrency({
        client,
        id,
        data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["currencies"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useCurrencyDeleteMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof deleteCurrency>>,
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
    mutationKey: ["currencies", "delete"],
    mutationFn: (id) =>
      deleteCurrency({
        client,
        id,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["currencies"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useBulkUpsertCurrenciesMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<BulkUpsertResponse, Error, BulkUpsertCurrencyRequest>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["currencies", "bulk-upsert"],
    mutationFn: (params) =>
      bulkUpsertCurrencies({
        client,
        data: params,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["currencies"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
