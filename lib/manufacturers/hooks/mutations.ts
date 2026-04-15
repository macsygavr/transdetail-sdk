import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useAPIClientOptions } from "../../common/hooks/client";
import {
  createManufacturer,
  deleteManufacturer,
  updateManufacturer,
  UpsertManufacturerRequest,
} from "../api";

export function useManufacturerCreateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof createManufacturer>>,
        Error,
        UpsertManufacturerRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["manufacturers", "create"],
    mutationFn: (data) =>
      createManufacturer({
        client: client,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["manufacturers"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useManufacturerUpdateMutation(
  {
    params,
    mutationOptions,
  }: {
    params: { id: string };
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof updateManufacturer>>,
        Error,
        UpsertManufacturerRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  },
) {
  const { id } = params;
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["manufacturers", "update", id],
    mutationFn: (data) =>
      updateManufacturer({
        client: client,
        id: id,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["manufacturers"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useManufacturerDeleteMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof deleteManufacturer>>,
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
    mutationKey: ["manufacturers", "delete"],
    mutationFn: (id) =>
      deleteManufacturer({
        client: client,
        id: id,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["manufacturers"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
