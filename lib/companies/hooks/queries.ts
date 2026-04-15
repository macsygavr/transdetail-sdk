import {
  UseQueryOptions,
  queryOptions as createQueryOptions,
} from "@tanstack/react-query";
import { APIClientOptions } from "../../common/api";
import { EntityList } from "../../common/entities";
import {
  fetchCompaniesList,
  fetchCompany,
  fetchCompanyByNumericId,
  fetchCurrentCompany,
  fetchCompanyMemberships,
  fetchContactPersonsList,
  fetchPriceType,
  fetchPriceTypesList,
} from "../api";
import {
  Company,
  CompanyMembership,
  ContactPerson,
  PriceType,
} from "../entities";

export function useCompaniesListQueryOptions({
  params,
  clientOptions,
  queryOptions,
}: {
  params?: { limit?: number; offset?: number };
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<
    UseQueryOptions<EntityList<Company>>,
    "queryKey" | "queryFn"
  >;
} = {}) {
  const { limit = 100, offset = 0 } = params ?? {};

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["companies", "list", { limit, offset }],
    queryFn: () => fetchCompaniesList({ client: clientOptions, limit, offset }),
  });
}

export function useCompanyQueryOptions({
  params,
  clientOptions,
  queryOptions,
}: {
  params?: { id?: string | null };
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<UseQueryOptions<Company>, "queryKey" | "queryFn">;
} = {}) {
  const { id } = params ?? {};

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["companies", id],
    queryFn: () => fetchCompany({ client: clientOptions, id: id! }),
    enabled: !!id,
  });
}

export function useCompanyByNumericIdQueryOptions({
  params,
  clientOptions,
  queryOptions,
}: {
  params: { numericId: number };
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<UseQueryOptions<Company>, "queryKey" | "queryFn">;
}) {
  const { numericId } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["companies", "numeric", numericId],
    queryFn: () =>
      fetchCompanyByNumericId({ client: clientOptions, numeric_id: numericId }),
  });
}

export function useCurrentCompanyQueryOptions({
  clientOptions,
  queryOptions,
}: {
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof fetchCurrentCompany>>>,
    "queryKey" | "queryFn"
  >;
} = {}) {
  return createQueryOptions({
    ...queryOptions,
    queryKey: ["companies", "current"],
    queryFn: () => fetchCurrentCompany({ client: clientOptions }),
  });
}

export function usePriceTypesListQueryOptions({
  params,
  clientOptions,
  queryOptions,
}: {
  params?: { limit?: number; offset?: number };
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<
    UseQueryOptions<EntityList<PriceType>>,
    "queryKey" | "queryFn"
  >;
} = {}) {
  const { limit = 100, offset = 0 } = params ?? {};

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["price-types", "list", { limit, offset }],
    queryFn: () =>
      fetchPriceTypesList({ client: clientOptions, limit, offset }),
  });
}

export function usePriceTypeQueryOptions({
  params,
  clientOptions,
  queryOptions,
}: {
  params: { id: string };
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<UseQueryOptions<PriceType>, "queryKey" | "queryFn">;
}) {
  const { id } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["price-types", id],
    queryFn: () => fetchPriceType({ client: clientOptions, id }),
  });
}

export function useContactPersonsListQueryOptions({
  params,
  clientOptions,
  queryOptions,
}: {
  params: { companyId: string };
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<
    UseQueryOptions<EntityList<ContactPerson>>,
    "queryKey" | "queryFn"
  >;
}) {
  const { companyId } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["companies", companyId, "contact-persons"],
    queryFn: () =>
      fetchContactPersonsList({ client: clientOptions, company_id: companyId }),
  });
}

export function useCompanyMembershipsQueryOptions({
  params,
  clientOptions,
  queryOptions,
}: {
  params: { companyId: string };
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<
    UseQueryOptions<EntityList<CompanyMembership>>,
    "queryKey" | "queryFn"
  >;
}) {
  const { companyId } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["companies", companyId, "memberships"],
    queryFn: () =>
      fetchCompanyMemberships({ client: clientOptions, companyId }),
  });
}
