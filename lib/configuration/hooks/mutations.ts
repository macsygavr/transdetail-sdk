import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { ConfigurationSettingEntry } from "../entities";
import { updateSettings, SetSettingRequest } from "../api";
import { useAPIClientOptions } from "../../common/hooks/client";

export function useUpdateConfigurationSettingsMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Record<string, ConfigurationSettingEntry>,
        Error,
        Record<string, SetSettingRequest | null>
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["settings", "update"],
    mutationFn: (data) =>
      updateSettings({
        client: client,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
