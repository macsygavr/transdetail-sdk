import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  changeUserPassword,
  createIdentity,
  createToken,
  createUser,
  deleteIdentity,
  deleteToken,
  deleteUser,
  login,
  logout,
  registerUser,
  updateIdentity,
  updateToken,
  updateUser,
  bulkUpsertUsers,
  updateNotificationSettings,
  createRegistrationRequest,
  updateRegistrationRequest,
  deleteRegistrationRequest,
  ChangePasswordRequest,
  CreateUserRequest,
  LoginWithPasswordRequest,
  UpdateIdentityRequest,
  UpdateUserRequest,
  UpsertIdentityRequest,
  UpsertTokenRequest,
  UserRegistrationRequest,
  BulkUpsertUsersRequest,
  BulkUpsertResponse,
  UpdateNotificationSettingsRequest,
  CreateRegistrationRequest,
} from "../api";
import { NotificationSettings, RegistrationRequest } from "../entities";
import { useAPIClientOptions } from "../../common/hooks/client";

export function useLoginMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof login>>,
      Error,
      LoginWithPasswordRequest
    >,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["auth", "login"],
    mutationFn: (params) =>
      login({
        client: client,
        data: params,
      }),
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: ["auth", "whoami"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useLogoutMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<Awaited<ReturnType<typeof logout>>, Error, void>,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["auth", "logout"],
    mutationFn: () =>
      logout({
        client: client,
      }),
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: ["auth", "whoami"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useUserCreateMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof createUser>>,
      Error,
      CreateUserRequest
    >,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["auth", "users", "create"],
    mutationFn: (params) =>
      createUser({
        client: client,
        data: params,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["auth", "users"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useUserUpdateMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof updateUser>>,
      Error,
      { id: string } & UpdateUserRequest
    >,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["auth", "users", "update"],
    mutationFn: ({ id, ...data }) =>
      updateUser({
        client: client,
        id: id,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["auth", "users"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useUserDeleteMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<Awaited<ReturnType<typeof deleteUser>>, Error, string>,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["auth", "users", "delete"],
    mutationFn: (id) =>
      deleteUser({
        client: client,
        id: id,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["auth", "users"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useUserChangePasswordMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof changeUserPassword>>,
      Error,
      { userId: string } & ChangePasswordRequest
    >,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["auth", "users", "change-password"],
    mutationFn: ({ userId, ...data }) =>
      changeUserPassword({
        client: client,
        userId: userId,
        data: data,
      }),
  });
}

export function useUserRegisterMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof registerUser>>,
      Error,
      UserRegistrationRequest
    >,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["auth", "users", "register"],
    mutationFn: (params) =>
      registerUser({
        client: client,
        data: params,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["auth", "users"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useBulkUpsertUsersMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<BulkUpsertResponse, Error, BulkUpsertUsersRequest>,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["auth", "users", "bulk-upsert"],
    mutationFn: (data) =>
      bulkUpsertUsers({
        client: client,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["auth", "users"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useUpdateNotificationSettingsMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<
      NotificationSettings,
      Error,
      { userId: string; data: UpdateNotificationSettingsRequest }
    >,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["auth", "users", "notification-settings", "update"],
    mutationFn: ({ userId, data }) =>
      updateNotificationSettings({
        client: client,
        userId: userId,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "users", variables.userId, "notification-settings"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useCreateRegistrationRequestMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<RegistrationRequest, Error, CreateRegistrationRequest>,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["auth", "registration-requests", "create"],
    mutationFn: (data) =>
      createRegistrationRequest({
        client: client,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "registration-requests"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useUpdateRegistrationRequestMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<
      RegistrationRequest,
      Error,
      { id: string; data: CreateRegistrationRequest }
    >,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["auth", "registration-requests", "update"],
    mutationFn: ({ id, data }) =>
      updateRegistrationRequest({
        client: client,
        id: id,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "registration-requests"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useDeleteRegistrationRequestMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<void, Error, string>,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["auth", "registration-requests", "delete"],
    mutationFn: (id) =>
      deleteRegistrationRequest({
        client: client,
        id: id,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "registration-requests"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useIdentityCreateMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof createIdentity>>,
      Error,
      { userId: string } & UpsertIdentityRequest
    >,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["auth", "identities", "create"],
    mutationFn: ({ userId, ...data }) =>
      createIdentity({
        client: client,
        userId: userId,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "users", variables.userId, "identities"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useIdentityUpdateMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof updateIdentity>>,
      Error,
      { userId: string; identityId: string } & UpdateIdentityRequest
    >,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["auth", "identities", "update"],
    mutationFn: ({ userId, identityId, ...data }) =>
      updateIdentity({
        client: client,
        userId: userId,
        identityId: identityId,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "users", variables.userId, "identities"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useIdentityDeleteMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof deleteIdentity>>,
      Error,
      { userId: string; identityId: string }
    >,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["auth", "identities", "delete"],
    mutationFn: ({ userId, identityId }) =>
      deleteIdentity({
        client: client,
        userId: userId,
        identityId: identityId,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "users", variables.userId, "identities"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useTokenCreateMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof createToken>>,
      Error,
      { userId: string } & UpsertTokenRequest
    >,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["auth", "tokens", "create"],
    mutationFn: ({ userId, ...data }) =>
      createToken({
        client: client,
        userId: userId,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "users", variables.userId, "tokens"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useTokenUpdateMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof updateToken>>,
      Error,
      { userId: string; tokenId: string } & UpsertTokenRequest
    >,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["auth", "tokens", "update"],
    mutationFn: ({ userId, tokenId, ...data }) =>
      updateToken({
        client: client,
        userId: userId,
        tokenId: tokenId,
        data: data,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "users", variables.userId, "tokens"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useTokenDeleteMutation({
  mutationOptions,
}: {
  mutationOptions?: Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof deleteToken>>,
      Error,
      { userId: string; tokenId: string }
    >,
    "mutationKey" | "mutationFn"
  >;
} = {}) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    ...mutationOptions,
    mutationKey: ["auth", "tokens", "delete"],
    mutationFn: ({ userId, tokenId }) =>
      deleteToken({
        client: client,
        userId: userId,
        tokenId: tokenId,
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "users", variables.userId, "tokens"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
