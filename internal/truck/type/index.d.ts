import { UserInfoType } from "internal/user/type";

export type TruckType = {
  is_active?:     boolean;
  id?:            number;
  created_at?:    Date;
  updated_at?:    Date;
  license_plate?: string;
  notes?:         string;
  type?:          string;
  status?:        string;
  capacity?:      number;
  company?:       null;
  user?:          UserInfoType;
  users?:         UserInfoType[];
};
