import { APIClientOptions, fetchWithMiddlewares } from "../../common/api";
import { EntityCreated, EntityList, Query } from "../../common/entities";
import {
  Product,
  ProductCollection,
  ProductPrice,
  ProductStatus,
  ProductStock,
  ProductTag,
} from "../entities";

// --- Product Types ---

export type ProductCreatedSchema = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type ProductFilter = {
  keywords?: string;
  manufacturer_id?: string;
  category_id?: string;
  transmission_id?: string;
  tag_id?: string;
  favorites_user_id?: string;
};

export type ProductQueryParams = {
  limit?: number;
  offset?: number;
  count?: boolean;
  include_inactive?: boolean;
  warehouse_id?: string;
  expand?: ("images" | "prices" | "stock" | "alternatives" | "kit")[];
  company_id?: string;
};

export type FetchProductParams = {
  expand?: ("images" | "prices" | "stock" | "alternatives" | "kit")[];
  company_id?: string;
};

export type UpsertProductPriceRequest = {
  id?: string | null;
  price_type_id: string;
  warehouse_id: string;
  price: number;
  old_price?: number | null;
};

export type UpsertProductStockRequest = {
  id?: string | null;
  warehouse_id: string;
  amount: number;
};

export type UpsertProductRequest = {
  id?: string | null;
  slug?: string | null;
  numeric_id?: number | null;
  name: Record<string, string>;
  description?: Record<string, string>;
  technical_description?: Record<string, string>;
  manufacturer_id: string | null;
  category_id: string | null;
  material_id?: string | null;
  transmissions?: string[];
  scheme_code?: string | null;
  images?: string[];
  search_terms?: string | null;
  cross_numbers?: { manufacturer_id: string; number: string }[] | null;
  article: string;
  part_number?: string | null;
  is_active?: boolean;
  kit?: { id: string; amount: number }[] | null;
  alternatives?: string[] | null;
  prices?: UpsertProductPriceRequest[] | null;
  stock?: UpsertProductStockRequest[] | null;
  tags?: string[] | null;
  properties?: Record<string, any>;
  weight?: number | null;
  status_id?: string | null;
};

// --- Product Tag Types ---

export type CreateProductTagRequest = {
  name: Record<string, string>;
  color: string;
};

export type UpdateProductTagRequest = {
  id?: string;
  name?: Record<string, string>;
  color?: string;
};

export type ProductTagQueryOptions = {
  limit?: number;
  offset?: number;
};

// --- Product Stock & Prices Types ---

export type ProductStockAndPrices = ProductStock & {
  stock: ProductStock | null;
  prices: ProductPrice[];
};

export type UpsertProductPriceData = {
  price_type_id: string;
  price: number;
  old_price?: number;
};

export type UpsertStockAndPricesRequest = {
  amount: number;
  prices: UpsertProductPriceData[];
};

export type BulkUpsertProductsRequest = {
  items: UpsertProductRequest[];
};

export type BulkUpsertResult = {
  id: string;
  status: "success" | "failure";
  cause?: any;
};

export type BulkUpsertResponse = {
  upserted: number;
  failed: number;
  results: BulkUpsertResult[];
};

export type BulkUpsertProductStocksRequest = {
  items: UpsertProductStockRequest[];
};

export type BulkUpsertProductStocksResult = {
  id: string;
  status: "success" | "failure";
  cause?: any;
  stock_id?: string | null;
};

export type BulkUpsertProductStocksResponse = {
  upserted: number;
  failed: number;
  results: BulkUpsertProductStocksResult[];
};

export type BulkUpsertProductPriceItem = {
  id?: string | null;
  product_id: string;
  price_type_id: string;
  warehouse_id: string;
  price: number;
  old_price?: number | null;
};

export type BulkUpsertProductPricesRequest = {
  items: BulkUpsertProductPriceItem[];
};

export type BulkUpsertProductPricesResult = {
  id: string;
  status: "success" | "failure";
  cause?: any;
  price_id?: string | null;
};

export type BulkUpsertProductPricesResponse = {
  upserted: number;
  failed: number;
  results: BulkUpsertProductPricesResult[];
};

export type ProductSearchOptions = {
  q?: string;
  limit?: number;
  offset?: number;
  language?: string;
  category?: string[];
  transmission?: string[];
  property?: {
    id: string;
    op: "eq" | "gt" | "lt" | "ge" | "le" | "ne";
    value: string | number | null;
  }[];
  company_id?: string;
  expand?: ("images" | "prices" | "stock" | "alternatives" | "kit")[];
  facets?: ("transmission" | "category" | "manufacturer")[];
};

export type ProductSearchResults = {
  items: Product[];
  count: number;
  facets?: {
    category_id?: Record<string, number>;
    transmission_id?: Record<string, number>;
  };
};

// --- Product Collection Types ---

export type UpsertProductCollectionRequest = {
  id?: string;
  name: Record<string, string>;
  description?: Record<string, string>;
  icon?: string | null;
  color?: string | null;
  positions: string[];
  sort_order?: number;
  is_active?: boolean;
  is_deleted?: boolean;
  products?: string[] | null;
};

export type BulkUpsertProductCollectionsRequest = {
  items: UpsertProductCollectionRequest[];
};

export type BulkUpsertProductCollectionsResponse = {
  ids: string[];
};

export type ProductCollectionFilter = {
  positions: string[];
};

export type ProductCollectionQueryOptions = {
  limit?: number;
  offset?: number;
  count?: boolean;
  include_inactive?: boolean;
};

// --- Product Fetch Functions ---

export async function fetchProductsList(options: {
  client?: APIClientOptions;
  query: Query<ProductFilter>;
  params: ProductQueryParams;
}): Promise<EntityList<Product>> {
  const queryParams = new URLSearchParams();
  if (options.params.limit !== undefined) {
    queryParams.append("limit", options.params.limit.toString());
  }
  if (options.params.offset !== undefined) {
    queryParams.append("offset", options.params.offset.toString());
  }
  if (options.params.count !== undefined) {
    queryParams.append("count", options.params.count.toString());
  }
  if (options.params.include_inactive !== undefined) {
    queryParams.append(
      "include_inactive",
      options.params.include_inactive.toString(),
    );
  }
  if (options.params.warehouse_id) {
    queryParams.append("warehouse_id", options.params.warehouse_id);
  }
  if (options.params.company_id) {
    queryParams.append("company_id", options.params.company_id);
  }
  if (options.params.expand) {
    options.params.expand.forEach((e) => queryParams.append("expand", e));
  }

  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/products/query?${queryParams.toString()}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.query),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function fetchProduct(options: {
  client?: APIClientOptions;
  id: string;
  params?: FetchProductParams;
}): Promise<Product> {
  const queryParams = new URLSearchParams();
  if (options.params?.company_id) {
    queryParams.append("company_id", options.params.company_id);
  }
  if (options.params?.expand) {
    options.params.expand.forEach((e) => queryParams.append("expand", e));
  }

  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/products/${options.id}?${queryParams.toString()}`,
    { credentials: "include" },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export async function fetchProductBySlug(options: {
  client?: APIClientOptions;
  slug: string;
  params?: FetchProductParams;
}): Promise<Product> {
  const queryParams = new URLSearchParams();
  if (options.params?.company_id) {
    queryParams.append("company_id", options.params.company_id);
  }
  if (options.params?.expand) {
    options.params.expand.forEach((e) => queryParams.append("expand", e));
  }

  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/products/${options.slug}/slug?${queryParams.toString()}`,
    { credentials: "include" },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product by slug");
  }

  return response.json();
}

export async function fetchProductByNumericId(options: {
  client?: APIClientOptions;
  numeric_id: number;
  params?: FetchProductParams;
}): Promise<Product> {
  const queryParams = new URLSearchParams();
  if (options.params?.company_id) {
    queryParams.append("company_id", options.params.company_id);
  }
  if (options.params?.expand) {
    options.params.expand.forEach((e) => queryParams.append("expand", e));
  }

  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/products/${options.numeric_id}/numeric_id?${queryParams.toString()}`,
    { credentials: "include" },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product by numeric id");
  }

  return response.json();
}

export async function createProduct(options: {
  client?: APIClientOptions;
  data: UpsertProductRequest;
}): Promise<ProductCreatedSchema> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/products`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return response.json();
}

export async function updateProduct(options: {
  client?: APIClientOptions;
  id: string;
  data: UpsertProductRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/products/${options.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update product");
  }
}

export async function deleteProduct(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/products/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
}

export async function bulkUpsertProducts(options: {
  client?: APIClientOptions;
  data: BulkUpsertProductsRequest;
}): Promise<BulkUpsertResponse> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/products/bulk`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to bulk upsert products");
  }

  return response.json();
}

export async function searchProducts(options: {
  client?: APIClientOptions;
  options: ProductSearchOptions;
}): Promise<ProductSearchResults> {
  const queryParams = new URLSearchParams();
  if (options.options.q) {
    queryParams.append("q", options.options.q);
  }
  if (options.options.limit !== undefined) {
    queryParams.append("limit", options.options.limit.toString());
  }
  if (options.options.offset !== undefined) {
    queryParams.append("offset", options.options.offset.toString());
  }
  if (options.options.language) {
    queryParams.append("language", options.options.language);
  }
  if (options.options.category) {
    options.options.category.forEach((c) => queryParams.append("category", c));
  }
  if (options.options.transmission) {
    options.options.transmission.forEach((t) =>
      queryParams.append("transmission", t),
    );
  }
  if (options.options.property) {
    options.options.property.forEach((p) =>
      queryParams.append(
        p.op === "eq" ? `property_${p.id}` : `property_${p.id}_${p.op}`,
        String(p.value),
      ),
    );
  }
  if (options.options.company_id) {
    queryParams.append("company_id", options.options.company_id);
  }
  if (options.options.expand) {
    options.options.expand.forEach((e) => queryParams.append("expand", e));
  }
  if (options.options.facets) {
    options.options.facets.forEach((e) => queryParams.append("facets", e));
  }

  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/products/search?${queryParams.toString()}`,
    { credentials: "include" },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to search products");
  }

  return response.json();
}

// --- Product Tag Fetch Functions ---

export async function createProductTag(options: {
  client?: APIClientOptions;
  data: CreateProductTagRequest;
}): Promise<EntityCreated> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/product-tags`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to create product tag");
  }

  return response.json();
}

export async function fetchProductTagsList(options: {
  client?: APIClientOptions;
  options: ProductTagQueryOptions;
}): Promise<EntityList<ProductTag>> {
  const queryParams = new URLSearchParams(
    options.options as unknown as Record<string, string>,
  );
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/product-tags?${queryParams.toString()}`,
    {
      method: "GET",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product tags");
  }

  return response.json();
}

export async function fetchProductTag(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<ProductTag> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/product-tags/${options.id}`,
    { credentials: "include" },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product tag");
  }

  return response.json();
}

export async function updateProductTag(options: {
  client?: APIClientOptions;
  id: string;
  data: UpdateProductTagRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/product-tags/${options.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update product tag");
  }
}

export async function deleteProductTag(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/product-tags/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete product tag");
  }
}

// --- Product Stock & Prices Fetch Functions ---

export async function fetchProductStockAndPrices(options: {
  client?: APIClientOptions;
  productId: string;
  warehouseId: string;
}): Promise<ProductStockAndPrices> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/products/${options.productId}/stock/warehouses/${options.warehouseId}`,
    { credentials: "include" },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product stock and prices");
  }

  return response.json();
}

export async function upsertProductStockAndPrices(options: {
  client?: APIClientOptions;
  productId: string;
  warehouseId: string;
  data: UpsertStockAndPricesRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/products/${options.productId}/stock/warehouses/${options.warehouseId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update product stock and prices");
  }
}

export async function deleteProductStock(options: {
  client?: APIClientOptions;
  productId: string;
  warehouseId: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/products/${options.productId}/stock/warehouses/${options.warehouseId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete product stock");
  }
}

export async function listProductStock(options: {
  client?: APIClientOptions;
  productId: string;
}): Promise<EntityList<ProductStock>> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/products/${options.productId}/stock`,
    { credentials: "include" },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to list product stock");
  }

  return response.json();
}

export async function bulkUpsertProductStocks(options: {
  client?: APIClientOptions;
  data: BulkUpsertProductStocksRequest;
}): Promise<BulkUpsertProductStocksResponse> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/products/stock/bulk`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to bulk upsert product stocks");
  }

  return response.json();
}

// --- Product Price Fetch Functions (Legacy prices.ts) ---

export async function listProductPrices(options: {
  client?: APIClientOptions;
  productId: string;
}): Promise<EntityList<ProductPrice>> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/products/${options.productId}/prices`,
    { credentials: "include" },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to list product prices");
  }

  return response.json();
}

export async function bulkUpsertProductPrices(options: {
  client?: APIClientOptions;
  data: BulkUpsertProductPricesRequest;
}): Promise<BulkUpsertProductPricesResponse> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/products/prices/bulk`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to bulk upsert product prices");
  }

  return response.json();
}

export async function upsertProductPrice(options: {
  client?: APIClientOptions;
  productId: string;
  data: UpsertProductPriceRequest;
}): Promise<ProductPrice> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/products/${options.productId}/prices`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to upsert product price");
  }

  return response.json();
}

export async function deleteProductPrice(options: {
  client?: APIClientOptions;
  productId: string;
  priceId: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/products/${options.productId}/prices/${options.priceId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete product price");
  }
}

// --- Product Collection Fetch Functions ---

export async function fetchProductCollectionsList(options: {
  client?: APIClientOptions;
  query: Query<ProductCollectionFilter>;
  options: ProductCollectionQueryOptions;
}): Promise<EntityList<ProductCollection>> {
  const queryParams = new URLSearchParams(
    options.options as unknown as Record<string, string>,
  );
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/product-collections/query?${queryParams.toString()}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.query),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product collections");
  }

  return response.json();
}

export async function fetchProductCollection(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<ProductCollection> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/product-collections/${options.id}`,
    { credentials: "include" },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product collection");
  }

  return response.json();
}

export async function createProductCollection(options: {
  client?: APIClientOptions;
  data: UpsertProductCollectionRequest;
}): Promise<EntityCreated> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/product-collections`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to create product collection");
  }

  return response.json();
}

export async function updateProductCollection(options: {
  client?: APIClientOptions;
  id: string;
  data: UpsertProductCollectionRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/product-collections/${options.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update product collection");
  }
}

export async function deleteProductCollection(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/product-collections/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete product collection");
  }
}

export async function bulkUpsertProductCollections(options: {
  client?: APIClientOptions;
  data: BulkUpsertProductCollectionsRequest;
}): Promise<BulkUpsertProductCollectionsResponse> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/product-collections/bulk`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to bulk upsert product collections");
  }

  return response.json();
}

export type UpsertProductStatusRequest = {
  id?: string;
  name: Record<string, string>;
  description: Record<string, string>;
  color: string;
  is_default?: boolean;
  sort_order?: number;
};

export type BulkUpsertProductStatusRequest = {
  items: UpsertProductStatusRequest[];
};

export type BulkUpsertProductStatusResult = {
  id: string;
  status: "success" | "failure";
  cause?: any;
};

export type BulkUpsertProductStatusResponse = {
  upserted: number;
  failed: number;
  results: BulkUpsertProductStatusResult[];
};

export async function fetchProductStatusesList(options: {
  client?: APIClientOptions;
  limit?: number;
  offset?: number;
}): Promise<EntityList<ProductStatus>> {
  const params = new URLSearchParams({
    limit: (options.limit ?? 100).toString(),
    offset: (options.offset ?? 0).toString(),
  });

  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/product-status?${params.toString()}`,
    { credentials: "include" },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product statuses");
  }

  return response.json();
}

export async function createProductStatus(options: {
  client?: APIClientOptions;
  data: UpsertProductStatusRequest;
}): Promise<ProductStatus> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/product-status`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to create product status");
  }

  return response.json();
}

export async function fetchDefaultProductStatus(options: {
  client?: APIClientOptions;
}): Promise<ProductStatus> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/product-status/default`,
    { credentials: "include" },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch default product status");
  }

  return response.json();
}

export async function fetchProductStatus(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<ProductStatus> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/product-status/${options.id}`,
    { credentials: "include" },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product status");
  }

  return response.json();
}

export async function updateProductStatus(options: {
  client?: APIClientOptions;
  id: string;
  data: UpsertProductStatusRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/product-status/${options.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update product status");
  }
}

export async function deleteProductStatus(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/product-status/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete product status");
  }
}

export async function bulkUpsertProductStatuses(options: {
  client?: APIClientOptions;
  data: BulkUpsertProductStatusRequest;
}): Promise<BulkUpsertProductStatusResponse> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/product-status/bulk`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to bulk upsert product statuses");
  }

  return response.json();
}
