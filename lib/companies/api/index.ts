import { APIClientOptions, fetchWithMiddlewares } from "../../common/api";
import { EntityCreated, EntityList } from "../../common/entities";
import {
  Company,
  CompanyMembership,
  ContactPerson,
  PriceType,
  SuggestedCompany,
} from "../entities";

export type UpsertCompanyRequest = {
  id?: string;
  name: string;
  comment?: string | null;
  form: "individual" | "legal_entity";
  address?: string | null;
  inn: string;
  kpp?: string | null;
  ogrn?: string | null;
  bik?: string | null;
  bank_account?: string | null;
  bank_corr_account?: string | null;
  status?: "pending" | "approved" | "rejected";
  price_type_id?: string | null;
  numeric_id?: number | null;
};

export type UpsertPriceTypeRequest = {
  name: string;
  is_default?: boolean;
};

export type UpsertContactPersonRequest = {
  id?: string;
  company_id?: string;
  last_name?: string | null;
  first_name: string;
  middle_name?: string | null;
  phone?: string | null;
  city: string;
  inn?: string | null;
  passport?: string | null;
  shipping_option_id?: string | null;
  payment_option_id?: string | null;
};

export type BulkUpsertCompaniesRequest = {
  items: UpsertCompanyRequest[];
};

export type BulkUpsertResponse = {
  ids: string[];
};

export type CreateCompanyMembershipRequest = {
  user_id: string;
  role: "owner" | "employee";
};

export type UpdateCompanyMembershipRequest = {
  role: "owner" | "employee";
};

export type SetCurrentCompanyRequest = {
  company_id: string;
};

// Company Fetch Functions
export async function fetchCompaniesList(options: {
  client?: APIClientOptions;
  limit?: number;
  offset?: number;
}): Promise<EntityList<Company>> {
  const params = new URLSearchParams({
    limit: (options.limit ?? 100).toString(),
    offset: (options.offset ?? 0).toString(),
  });
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/companies?${params.toString()}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch companies");
  }

  return response.json();
}

export async function fetchCompany(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<Company> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/companies/${options.id}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch company");
  }

  return response.json();
}

export async function fetchCompanyByNumericId(options: {
  client?: APIClientOptions;
  numeric_id: number;
}): Promise<Company> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/companies/numeric/${options.numeric_id}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch company by numeric id");
  }

  return response.json();
}

export async function fetchCurrentCompany(options?: {
  client?: APIClientOptions;
}): Promise<Company | null> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/companies/current`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (response.status === 404 || response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch current company");
  }

  return response.json();
}

export async function createCompany(options: {
  client?: APIClientOptions;
  data: UpsertCompanyRequest;
}): Promise<EntityCreated> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/companies`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to create company");
  }

  return response.json();
}

export async function updateCompany(options: {
  client?: APIClientOptions;
  id: string;
  data: UpsertCompanyRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/companies/${options.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update company");
  }
}

export async function setCurrentCompany(options: {
  client?: APIClientOptions;
  data: SetCurrentCompanyRequest;
}): Promise<Company> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/companies/current`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to set current company");
  }

  return response.json();
}

export async function deleteCompany(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/companies/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete company");
  }
}

export async function bulkUpsertCompanies(options: {
  client?: APIClientOptions;
  data: BulkUpsertCompaniesRequest;
}): Promise<BulkUpsertResponse> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/companies/bulk`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to bulk upsert companies");
  }

  return response.json();
}

export async function registerCompany(options: {
  client?: APIClientOptions;
  data: UpsertCompanyRequest;
}): Promise<EntityCreated> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/companies/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to register company");
  }

  return response.json();
}

export async function suggestCompany(options: {
  client?: APIClientOptions;
  inn: string;
  kpp?: string;
}): Promise<SuggestedCompany[]> {
  const params = new URLSearchParams({ inn: options.inn });
  if (options.kpp) params.set("kpp", options.kpp);

  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/companies/suggest?${params.toString()}`,
    {
      method: "POST",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to suggest company");
  }

  return response.json();
}

// Company Membership Functions

export async function fetchCompanyMemberships(options: {
  client?: APIClientOptions;
  companyId: string;
}): Promise<EntityList<CompanyMembership>> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/companies/${options.companyId}/members`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch company memberships");
  }

  return response.json();
}

export async function createCompanyMembership(options: {
  client?: APIClientOptions;
  companyId: string;
  data: CreateCompanyMembershipRequest;
}): Promise<CompanyMembership> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/companies/${options.companyId}/members`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to create company membership");
  }

  return response.json();
}

export async function updateCompanyMembership(options: {
  client?: APIClientOptions;
  companyId: string;
  userId: string;
  data: UpdateCompanyMembershipRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/companies/${options.companyId}/members/${options.userId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update company membership");
  }
}

export async function deleteCompanyMembership(options: {
  client?: APIClientOptions;
  companyId: string;
  userId: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/companies/${options.companyId}/members/${options.userId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete company membership");
  }
}

// Price Type Fetch Functions
export async function fetchPriceTypesList(options: {
  client?: APIClientOptions;
  limit?: number;
  offset?: number;
}): Promise<EntityList<PriceType>> {
  const params = new URLSearchParams({
    limit: (options.limit ?? 100).toString(),
    offset: (options.offset ?? 0).toString(),
  });
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/price-types?${params.toString()}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch price-types");
  }

  return response.json();
}

export async function fetchPriceType(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<PriceType> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/price-types/${options.id}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch price-type");
  }

  return response.json();
}

export async function createPriceType(options: {
  client?: APIClientOptions;
  data: UpsertPriceTypeRequest;
}): Promise<EntityCreated> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/price-types`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to create price-type");
  }

  return response.json();
}

export async function updatePriceType(options: {
  client?: APIClientOptions;
  id: string;
  data: UpsertPriceTypeRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/price-types/${options.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update price-type");
  }
}

export async function deletePriceType(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/price-types/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete price-type");
  }
}

export async function markPriceTypeAsDefault(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/price-types/${options.id}/mark-default`,
    {
      method: "POST",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to mark price-type as default");
  }
}

// Contact Person Fetch Functions
export async function fetchContactPersonsList(options: {
  client?: APIClientOptions;
  company_id: string;
}): Promise<EntityList<ContactPerson>> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/companies/${options.company_id}/contact-persons`,
    {
      method: "GET",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch contact persons");
  }

  return response.json();
}

export async function createContactPerson(options: {
  client?: APIClientOptions;
  company_id: string;
  data: UpsertContactPersonRequest;
}): Promise<EntityCreated> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/companies/${options.company_id}/contact-persons`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(options.data),
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to create contact person");
  }

  return response.json();
}

export async function updateContactPerson(options: {
  client?: APIClientOptions;
  company_id: string;
  contact_person_id: string;
  data: UpsertContactPersonRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/companies/${options.company_id}/contact-persons/${options.contact_person_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update contact person");
  }
}

export async function deleteContactPerson(options: {
  client?: APIClientOptions;
  company_id: string;
  contact_person_id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/companies/${options.company_id}/contact-persons/${options.contact_person_id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete contact person");
  }
}
