import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { useAPIClientOptions } from "../../common/hooks/client";
import {
  deleteMedia,
  uploadMedia,
  renderWatermark,
  setMediaMetadata,
  RenderWatermarkRequest,
  SetObjectMetadata,
  UploadMediaResponse,
} from "../api";

export function useUploadMediaMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<UploadMediaResponse, Error, File>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["media", "upload"],
    mutationFn: (file: File) =>
      uploadMedia({
        client: client,
        file: file,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["media"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useDeleteMediaMutation(
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
    mutationKey: ["media", "delete"],
    mutationFn: (id: string) =>
      deleteMedia({
        client: client,
        id: id,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["media"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useRenderWatermarkMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<void, Error, RenderWatermarkRequest>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["media", "render-watermark"],
    mutationFn: (data: RenderWatermarkRequest) =>
      renderWatermark({
        client: client,
        data: data,
      }),
  });
}

export function useSetMediaMetadataMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<void, Error, { id: string; data: SetObjectMetadata }>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["media", "set-metadata"],
    mutationFn: ({ id, data }) =>
      setMediaMetadata({
        client: client,
        id: id,
        data: data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["media"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
