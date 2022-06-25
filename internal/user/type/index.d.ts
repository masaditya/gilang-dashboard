export type UserInfoType = {
  is_active?: boolean;
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  first_name?: string;
  last_name?: string;
  role?: "USER" | "ADMIN";
  email?: string;
  full_name?: string;
};
