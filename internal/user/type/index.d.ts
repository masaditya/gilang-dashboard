export type UserInfoType = {
  is_active?: boolean;
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  first_name?: string;
  last_name?: string;
  role?: 'USER' | 'ADMIN';
  email?: string;
  full_name?: string;
};

export type QueryStringUser = {
  created_at?: Date;
  role?: 'USER' | 'ADMIN';
  is_active?: 1 | 0;
  is_trash?: 1 | 0;
  page?: int;
  limit?: int;
  search?: string;
  sortBy?: string;
};
