import { APIClientOptions, fetchWithMiddlewares } from "../../common/api";
import { EntityList } from "../../common/entities";

export type UploadMediaResponse = {
  id: string;
};

export type RenderWatermarkRequest = {
  original_image: File;
  watermark: File;
  watermark_width: number;
  watermark_height: number;
  opacity?: number;
  gap?: number;
  angle?: number;
};

export type SetObjectMetadata = {
  alt?: string | null;
};

export async function uploadMedia(options: {
  client?: APIClientOptions;
  file: File;
}): Promise<UploadMediaResponse> {
  const formData = new FormData();
  formData.append("file", options.file);

  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/media/upload`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to upload media");
  }

  return response.json();
}

export async function renderWatermark(options: {
  client?: APIClientOptions;
  data: RenderWatermarkRequest;
}): Promise<void> {
  const formData = new FormData();
  formData.append("original_image", options.data.original_image);
  formData.append("watermark", options.data.watermark);
  formData.append("watermark_width", String(options.data.watermark_width));
  formData.append("watermark_height", String(options.data.watermark_height));

  if (options.data.opacity !== undefined) {
    formData.append("opacity", String(options.data.opacity));
  }

  if (options.data.gap !== undefined) {
    formData.append("gap", String(options.data.gap));
  }

  if (options.data.angle !== undefined) {
    formData.append("angle", String(options.data.angle));
  }

  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/media/render-watermark`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to render watermark");
  }
}

export async function listMedia(options: {
  client?: APIClientOptions;
}): Promise<EntityList<string>> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/media/objects`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to list media");
  }

  return response.json();
}

export async function getMediaMetadata(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<Record<string, unknown>> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/media/objects/${options.id}/metadata`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to get media metadata");
  }

  return response.json();
}

export async function setMediaMetadata(options: {
  client?: APIClientOptions;
  id: string;
  data: SetObjectMetadata;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/media/objects/${options.id}/metadata`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to set media metadata");
  }
}

export async function deleteMedia(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/media/objects/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete media");
  }
}
