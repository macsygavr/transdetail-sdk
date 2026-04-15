import { APIClientOptions, fetchWithMiddlewares } from "../../common/api";
import { EntityCreated, EntityList } from "../../common/entities";
import { UserFavoritesProduct } from "../entities";

export type UserFavoritesProductListOptions = {
  limit?: number;
  offset?: number;
};

export async function fetchUserFavoritesList(options: {
  client?: APIClientOptions;
  limit?: number;
  offset?: number;
}): Promise<EntityList<UserFavoritesProduct>> {
  const queryParams = new URLSearchParams({
    limit: (options.limit ?? 10).toString(),
    offset: (options.offset ?? 0).toString(),
  });

  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/favorites?${queryParams.toString()}`,
    {
      method: "GET",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user favorites");
  }

  return response.json();
}

export async function createFavoriteProduct(options: {
  client?: APIClientOptions;
  product_id: string;
}): Promise<EntityCreated> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/favorites`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ product_id: options.product_id }),
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to add product to favorites");
  }

  return response.json();
}

export async function deleteFavoriteProduct(options: {
  client?: APIClientOptions;
  product_id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/favorites/${options.product_id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete product from favorites");
  }
}
