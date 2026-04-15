import { APIClientOptions, fetchWithMiddlewares } from "../../common/api";
import { ConfigurationSettingEntry } from "../entities";

export type SetSettingRequest = {
  is_public: boolean;
  value: any;
};

export async function getSettings(options: {
  client?: APIClientOptions;
}): Promise<Record<string, ConfigurationSettingEntry>> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/configuration`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to get settings");
  }

  return response.json();
}

export async function updateSettings(options: {
  client?: APIClientOptions;
  data: Record<string, SetSettingRequest | null>;
}): Promise<Record<string, ConfigurationSettingEntry>> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/configuration`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update settings");
  }

  return response.json();
}
