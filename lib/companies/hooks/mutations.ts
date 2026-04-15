import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useAPIClientOptions } from "../../common/hooks/client";
import {
  createCompany,
  updateCompany,
  deleteCompany,
  setCurrentCompany,
  UpsertCompanyRequest,
  createContactPerson,
  createPriceType,
  deleteContactPerson,
  deletePriceType,
  markPriceTypeAsDefault,
  updateContactPerson,
  updatePriceType,
  UpsertContactPersonRequest,
  UpsertPriceTypeRequest,
  bulkUpsertCompanies,
  registerCompany,
  BulkUpsertCompaniesRequest,
  BulkUpsertResponse,
  createCompanyMembership,
  updateCompanyMembership,
  deleteCompanyMembership,
  CreateCompanyMembershipRequest,
  SetCurrentCompanyRequest,
  UpdateCompanyMembershipRequest,
} from "../api";
import { EntityCreated } from "../../common/entities";
import { CompanyMembership } from "../entities";

export function useCompanyCreateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof createCompany>>,
        Error,
        UpsertCompanyRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    mutationKey: ["companies", "create"],
    mutationFn: (data) =>
      createCompany({
        client: client,
        data: data,
      }),
    ...mutationOptions,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useCompanyUpdateMutation(
  {
    params,
    mutationOptions,
  }: {
    params: { id: string };
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof updateCompany>>,
        Error,
        UpsertCompanyRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  },
) {
  const { id } = params;
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    mutationKey: ["companies", "update", id],
    mutationFn: (data: UpsertCompanyRequest) =>
      updateCompany({
        client: client,
        id: id,
        data: data,
      }),
    ...mutationOptions,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["companies", id] });
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useCompanyDeleteMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof deleteCompany>>,
        Error,
        string
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    mutationKey: ["companies", "delete"],
    mutationFn: (id: string) =>
      deleteCompany({
        client: client,
        id: id,
      }),
    ...mutationOptions,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useBulkUpsertCompaniesMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<BulkUpsertResponse, Error, BulkUpsertCompaniesRequest>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    mutationKey: ["companies", "bulk-upsert"],
    mutationFn: (data) =>
      bulkUpsertCompanies({
        client: client,
        data: data,
      }),
    ...mutationOptions,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useRegisterCompanyMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<EntityCreated, Error, UpsertCompanyRequest>,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    mutationKey: ["companies", "register"],
    mutationFn: (data) =>
      registerCompany({
        client: client,
        data: data,
      }),
    ...mutationOptions,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useSetCurrentCompanyMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof setCurrentCompany>>,
        Error,
        SetCurrentCompanyRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    mutationKey: ["companies", "current", "set"],
    mutationFn: (data) =>
      setCurrentCompany({
        client: client,
        data: data,
      }),
    ...mutationOptions,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

// Company Membership Hooks

export function useCompanyMembershipCreateMutation(
  {
    params,
    mutationOptions,
  }: {
    params: { companyId: string };
    mutationOptions?: Omit<
      UseMutationOptions<
        CompanyMembership,
        Error,
        CreateCompanyMembershipRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  },
) {
  const { companyId } = params;
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    mutationKey: ["companies", companyId, "memberships", "create"],
    mutationFn: (data: CreateCompanyMembershipRequest) =>
      createCompanyMembership({
        client: client,
        companyId: companyId,
        data: data,
      }),
    ...mutationOptions,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["companies", companyId, "memberships"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useCompanyMembershipUpdateMutation(
  {
    params,
    mutationOptions,
  }: {
    params: { companyId: string };
    mutationOptions?: Omit<
      UseMutationOptions<
        void,
        Error,
        { userId: string; data: UpdateCompanyMembershipRequest }
      >,
      "mutationKey" | "mutationFn"
    >;
  },
) {
  const { companyId } = params;
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    mutationKey: ["companies", companyId, "memberships", "update"],
    mutationFn: ({ userId, data }) =>
      updateCompanyMembership({
        client: client,
        companyId: companyId,
        userId: userId,
        data: data,
      }),
    ...mutationOptions,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["companies", companyId, "memberships"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useCompanyMembershipDeleteMutation(
  {
    params,
    mutationOptions,
  }: {
    params: { companyId: string };
    mutationOptions?: Omit<
      UseMutationOptions<void, Error, string>,
      "mutationKey" | "mutationFn"
    >;
  },
) {
  const { companyId } = params;
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    mutationKey: ["companies", companyId, "memberships", "delete"],
    mutationFn: (userId: string) =>
      deleteCompanyMembership({
        client: client,
        companyId: companyId,
        userId: userId,
      }),
    ...mutationOptions,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["companies", companyId, "memberships"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

// Price Type Mutation Hooks
export function usePriceTypeCreateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof createPriceType>>,
        Error,
        UpsertPriceTypeRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    mutationKey: ["price-types", "create"],
    mutationFn: (data) =>
      createPriceType({
        client: client,
        data: data,
      }),
    ...mutationOptions,
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({
        queryKey: ["price-types"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function usePriceTypeUpdateMutation(
  {
    params,
    mutationOptions,
  }: {
    params: { id: string };
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof updatePriceType>>,
        Error,
        UpsertPriceTypeRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  },
) {
  const { id } = params;
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    mutationKey: ["price-types", "update", id],
    mutationFn: (data: UpsertPriceTypeRequest) =>
      updatePriceType({
        client: client,
        id: id,
        data: data,
      }),
    ...mutationOptions,
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({
        queryKey: ["price-types"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function usePriceTypeDeleteMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof deletePriceType>>,
        Error,
        string
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    mutationKey: ["price-types", "delete"],
    mutationFn: (id: string) =>
      deletePriceType({
        client: client,
        id: id,
      }),
    ...mutationOptions,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: ["price-types"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useMarkPriceTypeAsDefaultMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof markPriceTypeAsDefault>>,
        Error,
        { id: string }
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    mutationKey: ["price-types", "mark-default"],
    mutationFn: ({ id }: { id: string }) =>
      markPriceTypeAsDefault({
        client: client,
        id: id,
      }),
    ...mutationOptions,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["price-types"] });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

// Contact Person Mutation Hooks
export function useContactPersonCreateMutation(
  {
    params,
    mutationOptions,
  }: {
    params: { companyId: string };
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof createContactPerson>>,
        Error,
        UpsertContactPersonRequest
      >,
      "mutationKey" | "mutationFn"
    >;
  },
) {
  const { companyId } = params;
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    mutationKey: ["companies", companyId, "contact-persons", "create"],
    mutationFn: (data: UpsertContactPersonRequest) =>
      createContactPerson({
        client: client,
        company_id: companyId,
        data: data,
      }),
    ...mutationOptions,
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({
        queryKey: ["companies", companyId, "contact-persons"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export type UpdateContactPersonVariables = {
  company_id: string;
  contact_person_id: string;
  data: UpsertContactPersonRequest;
};

export function useContactPersonUpdateMutation(
  {
    mutationOptions,
  }: {
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof updateContactPerson>>,
        Error,
        UpdateContactPersonVariables
      >,
      "mutationKey" | "mutationFn"
    >;
  } = {},
) {
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    mutationKey: ["companies", "contact-persons", "update"],
    mutationFn: ({ company_id, contact_person_id, data }) =>
      updateContactPerson({
        client: client,
        company_id: company_id,
        contact_person_id: contact_person_id,
        data: data,
      }),
    ...mutationOptions,
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({
        queryKey: ["companies", variables.company_id, "contact-persons"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useContactPersonDeleteMutation(
  {
    params,
    mutationOptions,
  }: {
    params: { companyId: string };
    mutationOptions?: Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof deleteContactPerson>>,
        Error,
        string
      >,
      "mutationKey" | "mutationFn"
    >;
  },
) {
  const { companyId } = params;
  const queryClient = useQueryClient();
  const client = useAPIClientOptions();

  return useMutation({
    mutationKey: ["companies", companyId, "contact-persons", "delete"],
    mutationFn: (contact_person_id: string) =>
      deleteContactPerson({
        client: client,
        company_id: companyId,
        contact_person_id: contact_person_id,
      }),
    ...mutationOptions,
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({
        queryKey: ["companies", companyId, "contact-persons"],
      });
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
