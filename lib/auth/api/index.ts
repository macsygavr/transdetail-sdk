import { APIClientOptions, fetchWithMiddlewares } from "../../common/api";
import { EntityCreated, EntityList } from "../../common/entities";
import { CompanyMembership } from "../../companies/entities";
import {
  Identity,
  NotificationSettings,
  RegistrationRequest,
  Token,
  User,
} from "../entities";

// Transport Types
export type CreateUserRequest = {
  id?: string;
  numeric_id?: number | null;
  last_name: string;
  first_name: string;
  middle_name?: string | null;
  roles?: string[];
  password?: string;
  status?: "pending" | "active" | "blocked" | "rejected";
  identity?: {
    provider: string;
    identifier: string;
    metadata: Record<string, string>;
  } | null;
};

export type UpsertUserRequest = CreateUserRequest;

export type BulkUpsertUsersRequest = {
  items: UpsertUserRequest[];
};

export type BulkUpsertResponse = {
  ids: string[];
};

export type UpdateUserRequest = {
  last_name: string;
  first_name: string;
  middle_name?: string;
  roles?: string[];
  status?: "pending" | "active" | "blocked" | "rejected";
};

export type ChangePasswordRequest = {
  old_password?: string;
  new_password: string;
};

export type UserRegistrationCompanyRequest = {
  name: string;
  form: "individual" | "legal_entity";
  comment?: string | null;
  address?: string | null;
  inn?: string | null;
  kpp?: string | null;
  ogrn?: string | null;
  bik?: string | null;
  bank_account?: string | null;
  bank_corr_account?: string | null;
  status?: "pending" | "approved" | "rejected";
};

export type UserRegistrationRequest = {
  user: CreateUserRequest;
  company: UserRegistrationCompanyRequest;
};

export type LoginWithPasswordRequest = {
  provider: string;
  identifier: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
};

export type UpsertIdentityRequest = {
  user_id: string;
  provider: string;
  identifier: string;
  metadata: Record<string, any>;
};

export type UpdateIdentityRequest = {
  metadata: Record<string, any>;
};

export type UpsertTokenRequest = {
  name: string;
  expire_at?: number;
};

export type CreatedTokenResult = {
  id: string;
  token: string;
};

export type CreateRegistrationRequest = {
  user_email: string;
  user_phone: string;
  user_last_name: string;
  user_first_name: string;
  user_middle_name?: string | null;
  company_legal_form: "individual" | "legal_entity";
  company_name?: string | null;
  company_activity?: string | null;
  company_city?: string | null;
  company_inn?: string | null;
  company_kpp?: string | null;
};

export type UpdateNotificationSettingsRequest = {
  notification_email?: string | null;
  notification_phone?: string | null;
  notifications_enabled?: boolean | null;
};

// --- User API ---

export async function fetchUsersList(options: {
  client?: APIClientOptions;
}): Promise<EntityList<User>> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function fetchUser(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<User> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/${options.id}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
}

export async function fetchUserByNumericId(options: {
  client?: APIClientOptions;
  numeric_id: number;
}): Promise<User> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/${options.numeric_id}/numeric_id`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user by numeric id");
  }

  return response.json();
}

export async function createUser(options: {
  client?: APIClientOptions;
  data: CreateUserRequest;
}): Promise<EntityCreated> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
}

export async function updateUser(options: {
  client?: APIClientOptions;
  id: string;
  data: UpdateUserRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/${options.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update user");
  }
}

export async function deleteUser(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
}

export async function bulkUpsertUsers(options: {
  client?: APIClientOptions;
  data: BulkUpsertUsersRequest;
}): Promise<BulkUpsertResponse> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/bulk`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to bulk upsert users");
  }

  return response.json();
}

export async function fetchUserCompanyMemberships(options: {
  client?: APIClientOptions;
  userId: string;
}): Promise<EntityList<CompanyMembership>> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/${options.userId}/companies`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user company memberships");
  }

  return response.json();
}

export async function fetchNotificationSettings(options: {
  client?: APIClientOptions;
  userId: string;
}): Promise<NotificationSettings> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/${options.userId}/notification-settings`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch notification settings");
  }

  return response.json();
}

export async function updateNotificationSettings(options: {
  client?: APIClientOptions;
  userId: string;
  data: UpdateNotificationSettingsRequest;
}): Promise<NotificationSettings> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/${options.userId}/notification-settings`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update notification settings");
  }

  return response.json();
}

export async function changeUserPassword(options: {
  client?: APIClientOptions;
  userId: string;
  data: ChangePasswordRequest;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/${options.userId}/password`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to change password");
  }
}

export async function registerUser(options: {
  client?: APIClientOptions;
  data: UserRegistrationRequest;
}): Promise<EntityCreated> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed registration");
  }

  return response.json();
}

// --- Registration Requests API ---

export async function listRegistrationRequests(options: {
  client?: APIClientOptions;
  limit?: number;
  offset?: number;
}): Promise<EntityList<RegistrationRequest>> {
  const params = new URLSearchParams({
    limit: (options.limit ?? 10).toString(),
    offset: (options.offset ?? 0).toString(),
  });
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/register/request?${params.toString()}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to list registration requests");
  }

  return response.json();
}

export async function createRegistrationRequest(options: {
  client?: APIClientOptions;
  data: CreateRegistrationRequest;
}): Promise<RegistrationRequest> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/register/request`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to create registration request");
  }

  return response.json();
}

export async function findRegistrationRequest(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<RegistrationRequest> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/register/request/${options.id}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to find registration request");
  }

  return response.json();
}

export async function updateRegistrationRequest(options: {
  client?: APIClientOptions;
  id: string;
  data: CreateRegistrationRequest;
}): Promise<RegistrationRequest> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/register/request/${options.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update registration request");
  }

  return response.json();
}

export async function deleteRegistrationRequest(options: {
  client?: APIClientOptions;
  id: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/register/request/${options.id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete registration request");
  }
}

// --- Auth API ---

export async function fetchWhoAmI(options: {
  client?: APIClientOptions;
}): Promise<User | null> {
  const res = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/auth/whoami`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (res.status === 401) {
    return null;
  }

  if (res.status === 200) {
    return res.json();
  }

  throw new Error("Invalid whoami status code");
}

export async function logout(options: {
  client?: APIClientOptions;
}): Promise<void> {
  const res = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/auth/logout`,
    {
      method: "POST",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (res.status !== 200) {
    throw new Error("Logout failed");
  }
}

export async function login(options: {
  client?: APIClientOptions;
  data: LoginWithPasswordRequest;
}): Promise<LoginResponse> {
  const { provider, ...body } = options.data;
  const res = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/auth/login/${provider}/password`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!res.ok) {
    try {
      const errorData = await res.json();
      throw new Error(errorData?.message || "Login failed");
    } catch {
      throw new Error("Login failed");
    }
  }

  return res.json();
}

// --- User Identities API ---

export async function fetchIdentitiesList(options: {
  client?: APIClientOptions;
  userId: string;
}): Promise<EntityList<Identity>> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/${options.userId}/identities`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch identities list");
  }

  return response.json();
}

export async function fetchIdentity(options: {
  client?: APIClientOptions;
  userId: string;
  identityId: string;
}): Promise<Identity> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/${options.userId}/identities/${options.identityId}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch identity");
  }

  return response.json();
}

export async function createIdentity(options: {
  client?: APIClientOptions;
  userId: string;
  data: UpsertIdentityRequest;
}): Promise<EntityCreated> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/${options.userId}/identities`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to create identity");
  }

  return response.json();
}

export async function updateIdentity(options: {
  client?: APIClientOptions;
  userId: string;
  identityId: string;
  data: UpdateIdentityRequest;
}): Promise<Identity> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/${options.userId}/identities/${options.identityId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update identity");
  }

  return response.json();
}

export async function deleteIdentity(options: {
  client?: APIClientOptions;
  userId: string;
  identityId: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/${options.userId}/identities/${options.identityId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete identity");
  }
}

// --- Tokens API ---

export async function fetchTokensList(options: {
  client?: APIClientOptions;
  userId: string;
}): Promise<EntityList<Token>> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/${options.userId}/tokens`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to list tokens");
  }

  return response.json();
}

export async function fetchToken(options: {
  client?: APIClientOptions;
  userId: string;
  tokenId: string;
}): Promise<Token> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/${options.userId}/tokens/${options.tokenId}`,
    {
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to get token");
  }

  return response.json();
}

export async function createToken(options: {
  client?: APIClientOptions;
  userId: string;
  data: UpsertTokenRequest;
}): Promise<CreatedTokenResult> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/${options.userId}/tokens`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to create token");
  }

  return response.json();
}

export async function updateToken(options: {
  client?: APIClientOptions;
  userId: string;
  tokenId: string;
  data: UpsertTokenRequest;
}): Promise<Token> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/${options.userId}/tokens/${options.tokenId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.data),
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to update token");
  }

  return response.json();
}

export async function deleteToken(options: {
  client?: APIClientOptions;
  userId: string;
  tokenId: string;
}): Promise<void> {
  const response = await fetchWithMiddlewares(
    `${options?.client?.baseURL ?? ""}/api/v1/users/${options.userId}/tokens/${options.tokenId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    options?.client?.middlewares,
  );

  if (!response.ok) {
    throw new Error("Failed to delete token");
  }
}
