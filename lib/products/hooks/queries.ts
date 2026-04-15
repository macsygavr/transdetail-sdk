import {
  UseQueryOptions,
  queryOptions as createQueryOptions,
} from "@tanstack/react-query";
import { APIClientOptions } from "../../common/api";
import { EntityList, Query } from "../../common/entities";
import {
  Product,
  ProductCollection,
  ProductPrice,
  ProductStatus,
  ProductTag,
} from "../entities";
import {
  fetchProduct,
  fetchProductByNumericId,
  fetchProductBySlug,
  fetchProductsList,
  fetchProductTag,
  fetchProductTagsList,
  fetchProductStockAndPrices,
  fetchProductCollection,
  fetchProductCollectionsList,
  listProductPrices,
  FetchProductParams,
  ProductFilter,
  ProductQueryParams,
  ProductTagQueryOptions,
  ProductCollectionFilter,
  ProductCollectionQueryOptions,
  listProductStock,
  searchProducts,
  ProductSearchOptions,
  ProductSearchResults,
  fetchDefaultProductStatus,
  fetchProductStatus,
  fetchProductStatusesList,
} from "../api";

export function useProductListQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { filter: Query<ProductFilter>; listParams: ProductQueryParams };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<Product>>,
      "queryKey" | "queryFn"
    >;
  },
) {
  const { filter, listParams } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["products", "query", filter, listParams],
    queryFn: () =>
      fetchProductsList({
        client: clientOptions,
        query: filter,
        params: listParams,
      }),
  });
}

export function useProductSearchQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { searchParams: ProductSearchOptions };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<ProductSearchResults>,
      "queryKey" | "queryFn"
    >;
  },
) {
  const { searchParams } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["products", "search", searchParams],
    queryFn: () =>
      searchProducts({ client: clientOptions, options: searchParams }),
  });
}

export function useProductQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { id: string; fetchParams?: FetchProductParams };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<UseQueryOptions<Product>, "queryKey" | "queryFn">;
  },
) {
  const { id, fetchParams } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["products", id, fetchParams],
    queryFn: () =>
      fetchProduct({ client: clientOptions, id, params: fetchParams }),
  });
}

export function useProductBySlugQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { slug: string; fetchParams?: FetchProductParams };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<UseQueryOptions<Product>, "queryKey" | "queryFn">;
  },
) {
  const { slug, fetchParams } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["products", "slug", slug, fetchParams],
    queryFn: () =>
      fetchProductBySlug({
        client: clientOptions,
        slug,
        params: fetchParams,
      }),
  });
}

export function useProductByNumericIdQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { numericId: number; fetchParams?: FetchProductParams };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<UseQueryOptions<Product>, "queryKey" | "queryFn">;
  },
) {
  const { numericId, fetchParams } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["products", "numeric", numericId, fetchParams],
    queryFn: () =>
      fetchProductByNumericId({
        client: clientOptions,
        numeric_id: numericId,
        params: fetchParams,
      }),
  });
}

export function useProductTagListQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: ProductTagQueryOptions;
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<ProductTag>>,
      "queryKey" | "queryFn"
    >;
  },
) {
  return createQueryOptions({
    ...queryOptions,
    queryKey: ["product-tags", "list", params],
    queryFn: () =>
      fetchProductTagsList({ client: clientOptions, options: params }),
  });
}

export function useProductTagQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { id: string };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<UseQueryOptions<ProductTag>, "queryKey" | "queryFn">;
  },
) {
  const { id } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["product-tags", id],
    queryFn: () => fetchProductTag({ client: clientOptions, id }),
  });
}

export function useProductStockAndPricesQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { productId: string; warehouseId: string };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<Awaited<ReturnType<typeof fetchProductStockAndPrices>>>,
      "queryKey" | "queryFn"
    >;
  },
) {
  const { productId, warehouseId } = params;

  return createQueryOptions({
    staleTime: Infinity,
    ...queryOptions,
    queryKey: ["products-stock", productId, warehouseId],
    queryFn: () =>
      fetchProductStockAndPrices({
        client: clientOptions,
        productId,
        warehouseId,
      }),
  });
}

export function useProductStockListQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { productId: string };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<Awaited<ReturnType<typeof listProductStock>>>,
      "queryKey" | "queryFn"
    >;
  },
) {
  const { productId } = params;

  return createQueryOptions({
    staleTime: Infinity,
    ...queryOptions,
    queryKey: ["products-stock", "list", productId],
    queryFn: () => listProductStock({ client: clientOptions, productId }),
  });
}

export function useListProductPricesQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { productId: string };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<ProductPrice>>,
      "queryKey" | "queryFn"
    >;
  },
) {
  const { productId } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["products", productId, "prices"],
    queryFn: () => listProductPrices({ client: clientOptions, productId }),
  });
}

export function useProductCollectionsListQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: {
      query: Query<ProductCollectionFilter>;
      listParams: ProductCollectionQueryOptions;
    };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<ProductCollection>>,
      "queryKey" | "queryFn"
    >;
  },
) {
  const { query, listParams } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["product-collections", "query", query, listParams],
    queryFn: () =>
      fetchProductCollectionsList({
        client: clientOptions,
        query,
        options: listParams,
      }),
  });
}

export function useProductCollectionQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { id: string };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<ProductCollection>,
      "queryKey" | "queryFn"
    >;
  },
) {
  const { id } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["product-collections", id],
    queryFn: () => fetchProductCollection({ client: clientOptions, id }),
  });
}

export function useProductStatusesListQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params?: { limit?: number; offset?: number };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<EntityList<ProductStatus>>,
      "queryKey" | "queryFn"
    >;
  } = {},
) {
  const { limit = 100, offset = 0 } = params ?? {};

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["product-statuses", "list", { limit, offset }],
    queryFn: () =>
      fetchProductStatusesList({ client: clientOptions, limit, offset }),
  });
}

export function useProductStatusQueryOptions(
  {
    params,
    clientOptions,
    queryOptions,
  }: {
    params: { id: string };
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<ProductStatus>,
      "queryKey" | "queryFn"
    >;
  },
) {
  const { id } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["product-statuses", id],
    queryFn: () => fetchProductStatus({ client: clientOptions, id }),
  });
}

export function useDefaultProductStatusQueryOptions(
  {
    clientOptions,
    queryOptions,
  }: {
    clientOptions?: APIClientOptions;
    queryOptions?: Omit<
      UseQueryOptions<ProductStatus>,
      "queryKey" | "queryFn"
    >;
  } = {},
) {
  return createQueryOptions({
    ...queryOptions,
    queryKey: ["product-statuses", "default"],
    queryFn: () => fetchDefaultProductStatus({ client: clientOptions }),
  });
}
