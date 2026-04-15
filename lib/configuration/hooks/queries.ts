import {
  UseQueryOptions,
  queryOptions as createQueryOptions,
} from "@tanstack/react-query";
import { APIClientOptions } from "../../common/api";
import { ConfigurationSettingEntry } from "../entities";
import { getSettings } from "../api";

export function useConfigurationSettingsQueryOptions(
  {
    clientOptions,
    queryOptions,
  }: {
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<Record<string, ConfigurationSettingEntry>>,
      "queryKey" | "queryFn"
    >;
  } = {},
) {
  return createQueryOptions({
    ...queryOptions,
    queryKey: ["settings"],
    queryFn: () => getSettings({ client: clientOptions }),
  });
}
