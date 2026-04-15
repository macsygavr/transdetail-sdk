import {
  UseQueryOptions,
  queryOptions as createQueryOptions,
} from "@tanstack/react-query";
import { APIClientOptions } from "../../common/api";
import {
  fetchIdentitiesList,
  fetchIdentity,
  fetchNotificationSettings,
  fetchToken,
  fetchTokensList,
  fetchUser,
  fetchUserByNumericId,
  fetchUserCompanyMemberships,
  fetchUsersList,
  fetchWhoAmI,
  findRegistrationRequest,
  listRegistrationRequests,
} from "../api";
import {
  Identity,
  NotificationSettings,
  RegistrationRequest,
  Token,
  User,
} from "../entities";
import { EntityList } from "../../common/entities";
import { CompanyMembership } from "../../companies/entities";

export function useWhoAmIQueryOptions({
  clientOptions,
  queryOptions,
}: {
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<UseQueryOptions<User | null>, "queryKey" | "queryFn">;
} = {}) {
  return createQueryOptions({
    staleTime: 15 * 60 * 1000,
    ...queryOptions,
    queryKey: ["auth", "whoami"],
    queryFn: () =>
      fetchWhoAmI({
        client: clientOptions,
      }),
  });
}

export function useUsersListQueryOptions({
  clientOptions,
  queryOptions,
}: {
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<
    UseQueryOptions<EntityList<User>>,
    "queryKey" | "queryFn"
  >;
} = {}) {
  return createQueryOptions({
    staleTime: Infinity,
    ...queryOptions,
    queryKey: ["auth", "users", "list"],
    queryFn: () =>
      fetchUsersList({
        client: clientOptions,
      }),
  });
}

export function useUserQueryOptions({
  params,
  clientOptions,
  queryOptions,
}: {
  params: { id: string };
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<UseQueryOptions<User>, "queryKey" | "queryFn">;
}) {
  const { id } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["auth", "users", "detail", id],
    queryFn: () =>
      fetchUser({
        client: clientOptions,
        id: id,
      }),
  });
}

export function useUserByNumericIdQueryOptions({
  params,
  clientOptions,
  queryOptions,
}: {
  params: { numericId: number };
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<UseQueryOptions<User>, "queryKey" | "queryFn">;
}) {
  const { numericId } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["auth", "users", "numeric", numericId],
    queryFn: () =>
      fetchUserByNumericId({
        client: clientOptions,
        numeric_id: numericId,
      }),
  });
}

export function useUserCompanyMembershipsQueryOptions({
  params,
  clientOptions,
  queryOptions,
}: {
  params: { userId: string };
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<
    UseQueryOptions<EntityList<CompanyMembership>>,
    "queryKey" | "queryFn"
  >;
}) {
  const { userId } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["auth", "users", userId, "companies"],
    queryFn: () =>
      fetchUserCompanyMemberships({
        client: clientOptions,
        userId: userId,
      }),
  });
}

export function useNotificationSettingsQueryOptions({
  params,
  clientOptions,
  queryOptions,
}: {
  params: { userId: string };
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<
    UseQueryOptions<NotificationSettings>,
    "queryKey" | "queryFn"
  >;
}) {
  const { userId } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["auth", "users", userId, "notification-settings"],
    queryFn: () =>
      fetchNotificationSettings({
        client: clientOptions,
        userId: userId,
      }),
  });
}

export function useIdentitiesListQueryOptions({
  params,
  clientOptions,
  queryOptions,
}: {
  params: { userId: string };
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<
    UseQueryOptions<EntityList<Identity>>,
    "queryKey" | "queryFn"
  >;
}) {
  const { userId } = params;

  return createQueryOptions({
    staleTime: Infinity,
    ...queryOptions,
    queryKey: ["auth", "users", userId, "identities", "list"],
    queryFn: () =>
      fetchIdentitiesList({
        client: clientOptions,
        userId: userId,
      }),
  });
}

export function useIdentityQueryOptions({
  params,
  clientOptions,
  queryOptions,
}: {
  params: { userId: string; identityId: string };
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<UseQueryOptions<Identity>, "queryKey" | "queryFn">;
}) {
  const { userId, identityId } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["auth", "users", userId, "identities", "detail", identityId],
    queryFn: () =>
      fetchIdentity({
        client: clientOptions,
        userId: userId,
        identityId: identityId,
      }),
  });
}

export function useTokensListQueryOptions({
  params,
  clientOptions,
  queryOptions,
}: {
  params: { userId: string };
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<
    UseQueryOptions<EntityList<Token>>,
    "queryKey" | "queryFn"
  >;
}) {
  const { userId } = params;

  return createQueryOptions({
    staleTime: Infinity,
    ...queryOptions,
    queryKey: ["auth", "users", userId, "tokens", "list"],
    queryFn: () =>
      fetchTokensList({
        client: clientOptions,
        userId: userId,
      }),
  });
}

export function useTokenQueryOptions({
  params,
  clientOptions,
  queryOptions,
}: {
  params: { userId: string; tokenId: string };
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<UseQueryOptions<Token>, "queryKey" | "queryFn">;
}) {
  const { userId, tokenId } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["auth", "users", userId, "tokens", "detail", tokenId],
    queryFn: () =>
      fetchToken({
        client: clientOptions,
        userId: userId,
        tokenId: tokenId,
      }),
  });
}

export function useRegistrationRequestsListQueryOptions({
  params,
  clientOptions,
  queryOptions,
}: {
  params?: { limit?: number; offset?: number };
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<
    UseQueryOptions<EntityList<RegistrationRequest>>,
    "queryKey" | "queryFn"
  >;
} = {}) {
  const { limit = 10, offset = 0 } = params ?? {};

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["auth", "registration-requests", "list", { limit, offset }],
    queryFn: () =>
      listRegistrationRequests({
        client: clientOptions,
        limit: limit,
        offset: offset,
      }),
  });
}

export function useFindRegistrationRequestQueryOptions({
  params,
  clientOptions,
  queryOptions,
}: {
  params: { id: string };
  clientOptions?: APIClientOptions;
  queryOptions?: Omit<
    UseQueryOptions<RegistrationRequest>,
    "queryKey" | "queryFn"
  >;
}) {
  const { id } = params;

  return createQueryOptions({
    ...queryOptions,
    queryKey: ["auth", "registration-requests", "detail", id],
    queryFn: () =>
      findRegistrationRequest({
        client: clientOptions,
        id: id,
      }),
  });
}
