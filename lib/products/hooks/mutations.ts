import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useAPIClientOptions } from "../../common/hooks/client";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  createProductTag,
  updateProductTag,
  deleteProductTag,
  upsertProductStockAndPrices,
  createProductCollection,
  updateProductCollection,
  deleteProductCollection,
  bulkUpsertProductCollections,
  upsertProductPrice,
  deleteProductPrice,
  UpsertProductRequest,
  ProductCreatedSchema,
  CreateProductTagRequest,
  UpdateProductTagRequest,
  UpsertStockAndPricesRequest,
  UpsertProductCollectionRequest,
  BulkUpsertProductCollectionsRequest,
  UpsertProductPriceRequest,
  bulkUpsertProducts,
  bulkUpsertProductStocks,
  bulkUpsertProductPrices,
  deleteProductStock,
  BulkUpsertProductsRequest,
  BulkUpsertResponse,
  BulkUpsertProductStocksRequest,
  BulkUpsertProductStocksResponse,
  BulkUpsertProductPricesRequest,
  BulkUpsertProductPricesResponse,
  bulkUpsertProductStatuses,
  BulkUpsertProductStatusRequest,
  BulkUpsertProductStatusResponse,
  createProductStatus,
  deleteProductStatus,
  updateProductStatus,
  UpsertProductStatusRequest,
} from "../api";
import { ProductStatus } from "../entities";

// --- Product Mutations ---

export function useProductCreateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<ProductCreatedSchema, Error, UpsertProductRequest>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["products", "create"],
    mutationFn: (data) =>
      createProduct({
        client: client,
        data: data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useProductUpdateMutation(
  {
    params,
    mutationOptions,
  }: {
    params: { id: string };
    mutationOptions?: Omit<
      UseMutationOptions<void, Error, UpsertProductRequest>,
      "mutationKey" | "mutationFn"
    >;
  },
) {
  const { id } = params;
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["products", "update", id],
    mutationFn: (data: UpsertProductRequest) =>
      updateProduct({
        client,
        id,
        data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useProductDeleteMutation(
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
    mutationKey: ["products", "delete"],
    mutationFn: (id: string) =>
      deleteProduct({
        client: client,
        id: id,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useBulkUpsertProductsMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<BulkUpsertResponse, Error, BulkUpsertProductsRequest>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["products", "bulk-upsert"],
    mutationFn: (data) =>
      bulkUpsertProducts({
        client: client,
        data: data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

// --- Product Tag Mutations ---

export function useProductTagCreateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof createProductTag>>,
        Error,
        CreateProductTagRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["product-tags", "create"],
    mutationFn: (data) =>
      createProductTag({
        client: client,
        data: data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["product-tags"] });
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Products might use tags
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useProductTagUpdateMutation(
  {
    params,
    mutationOptions,
  }: {
    params: { id: string };
    mutationOptions?: Omit<
      UseMutationOptions<void, Error, UpdateProductTagRequest>,
      "mutationKey" | "mutationFn"
    >;
  },
) {
  const { id } = params;
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["product-tags", "update", id],
    mutationFn: (data: UpdateProductTagRequest) =>
      updateProductTag({
        client,
        id,
        data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["product-tags"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useProductTagDeleteMutation(
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
    mutationKey: ["product-tags", "delete"],
    mutationFn: (id) =>
      deleteProductTag({
        client: client,
        id: id,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["product-tags"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

// --- Product Stock & Prices Mutations ---

export function useUpsertProductStockAndPricesMutation(
  {
    params,
    mutationOptions,
  }: {
    params: { productId: string; warehouseId: string };
    mutationOptions?: Omit<
      UseMutationOptions<void, Error, UpsertStockAndPricesRequest>,
      "mutationKey" | "mutationFn"
    >;
  },
) {
  const { productId, warehouseId } = params;
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["products-stock", "upsert", productId, warehouseId],
    mutationFn: (data: UpsertStockAndPricesRequest) =>
      upsertProductStockAndPrices({
        client,
        productId,
        warehouseId,
        data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({
        queryKey: ["products-stock", productId, warehouseId],
      });
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useProductStockDeleteMutation(
  {
    params,
    mutationOptions,
  }: {
    params: { productId: string; warehouseId: string };
    mutationOptions?: Omit<
      UseMutationOptions<void, Error, void>,
      "mutationKey" | "mutationFn"
    >;
  },
) {
  const { productId, warehouseId } = params;
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["products-stock", "delete", productId, warehouseId],
    mutationFn: () =>
      deleteProductStock({
        client,
        productId,
        warehouseId,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({
        queryKey: ["products-stock", productId, warehouseId],
      });
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useBulkUpsertProductStocksMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        BulkUpsertProductStocksResponse,
        Error,
        BulkUpsertProductStocksRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["products-stock", "bulk-upsert"],
    mutationFn: (data) =>
      bulkUpsertProductStocks({
        client: client,
        data: data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["products-stock"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

// --- Product Price Mutations ---

export function useUpsertProductPriceMutation(
  {
    params,
    mutationOptions,
  }: {
    params: { productId: string };
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof upsertProductPrice>>,
        Error,
        UpsertProductPriceRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  },
) {
  const { productId } = params;
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["products", productId, "prices", "upsert"],
    mutationFn: (data: UpsertProductPriceRequest) =>
      upsertProductPrice({
        client,
        productId,
        data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({
        queryKey: ["products", productId, "prices"],
      });
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useBulkUpsertProductPricesMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        BulkUpsertProductPricesResponse,
        Error,
        BulkUpsertProductPricesRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["products-prices", "bulk-upsert"],
    mutationFn: (data) =>
      bulkUpsertProductPrices({
        client: client,
        data: data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useDeleteProductPriceMutation(
  {
    params,
    mutationOptions,
  }: {
    params: { productId: string };
    mutationOptions?: Omit<
      UseMutationOptions<void, Error, string>,
      "mutationKey" | "mutationFn"
    >;
  },
) {
  const { productId } = params;
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["products", productId, "prices", "delete"],
    mutationFn: (priceId: string) =>
      deleteProductPrice({
        client,
        productId,
        priceId,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({
        queryKey: ["products", productId, "prices"],
      });
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

// --- Product Collection Mutations ---

export function useProductCollectionCreateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof createProductCollection>>,
        Error,
        UpsertProductCollectionRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["product-collections", "create"],
    mutationFn: (data) =>
      createProductCollection({
        client: client,
        data: data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["product-collections"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useProductCollectionUpdateMutation(
  {
    params,
    mutationOptions,
  }: {
    params: { id: string };
    mutationOptions?: Omit<
      UseMutationOptions<void, Error, UpsertProductCollectionRequest>,
      "mutationKey" | "mutationFn"
    >;
  },
) {
  const { id } = params;
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["product-collections", "update", id],
    mutationFn: (data: UpsertProductCollectionRequest) =>
      updateProductCollection({
        client,
        id,
        data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["product-collections"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useProductCollectionDeleteMutation(
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
    mutationKey: ["product-collections", "delete"],
    mutationFn: (id) =>
      deleteProductCollection({
        client: client,
        id: id,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["product-collections"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useProductCollectionsBulkUpsertMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof bulkUpsertProductCollections>>,
        Error,
        BulkUpsertProductCollectionsRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["product-collections", "bulk-upsert"],
    mutationFn: (data) =>
      bulkUpsertProductCollections({
        client: client,
        data: data,
      }),
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ["product-collections"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useCreateProductStatusMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<ProductStatus, Error, UpsertProductStatusRequest>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["product-statuses", "create"],
    mutationFn: (data) =>
      createProductStatus({
        client: client,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["product-statuses"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useUpdateProductStatusMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        void,
        Error,
        { id: string; data: UpsertProductStatusRequest }
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["product-statuses", "update"],
    mutationFn: ({ id, data }) =>
      updateProductStatus({
        client: client,
        id: id,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["product-statuses"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useDeleteProductStatusMutation(
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
    mutationKey: ["product-statuses", "delete"],
    mutationFn: (id) =>
      deleteProductStatus({
        client: client,
        id: id,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["product-statuses"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useBulkUpsertProductStatusesMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        BulkUpsertProductStatusResponse,
        Error,
        BulkUpsertProductStatusRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["product-statuses", "bulk-upsert"],
    mutationFn: (data) =>
      bulkUpsertProductStatuses({
        client: client,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["product-statuses"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
