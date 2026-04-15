export type User = {
  id: string;
  numeric_id?: number | null;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  roles: string[];
  status?: "pending" | "active" | "blocked" | "rejected";
};

export type Identity = {
  id: string;
  user_id: string;
  provider: string;
  identifier: string;
  metadata: Record<string, any>;
};

export type Token = {
  id: string;
  created_at: string;
  user_id: string;
  name: string;
  expire_at: string | null;
  hash: string;
};

export type RegistrationRequest = {
  id: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  user_email?: string;
  user_phone?: string;
  user_last_name?: string;
  user_first_name?: string;
  user_middle_name?: string | null;
  company_legal_form?: "individual" | "legal_entity";
  company_name?: string | null;
  company_activity?: string | null;
  company_city?: string | null;
  company_inn?: string | null;
  company_kpp?: string | null;
};

export type NotificationSettings = {
  user_id: string;
  notification_email?: string | null;
  notification_phone?: string | null;
  notifications_enabled?: boolean | null;
  created_at: string;
  updated_at: string;
};
