import { UserInfoType } from "internal/user/type";

export type JobType= {
  status:      string;
  id:          number;
  created_at:  Date;
  updated_at:  Date;
  so_id:       number;
  details:     Detail[];
  user:        UserInfoType;
  attachments: Attachment[];
  so : any;
}

export type Attachment= {
  id:         number;
  created_at: Date;
  updated_at: Date;
  url:        string;
}

export type Detail= {
  id:         number;
  created_at: Date;
  updated_at: Date;
  product_id: number;
  weight:     number;
  head:       number;
  product : any;
  histories:  HistoryType[];
}

export interface HistoryType {
  id?:         number;
  created_at?: Date;
  updated_at?: Date;
  product_id?: number;
  weight?:     number;
  head?:       number;
  user?:       UserInfoType;
}

export type ProcessJobType = {
  items?: ItemType[];
  attachments?: string[];
};

export type ItemType = {
  product_id?: number;
  weight?: number;
  head?: number;
};

export interface SalesOrderType {
  request_delete?:              boolean;
  payment_status?:              boolean;
  is_received?:                 boolean;
  is_recent?:                   boolean;
  is_from_balance?:             boolean;
  is_approve?:                  boolean;
  id?:                          number;
  created_at?:                  Date;
  updated_at?:                  Date;
  number?:                      number;
  transaction_number?:          string;
  email?:                       string;
  billing_address?:             string;
  transaction_date?:            Date;
  invoice_exchange_date?:       null;
  due_date?:                    Date;
  message?:                     string;
  notes?:                       string;
  inventory_notes?:             string;
  deposit?:                     number;
  shipping_request_date?:       Date;
  shipping_address?:            string;
  vehicle_number?:              string;
  driver_name?:                 string;
  shipping_cost?:               number;
  shipping_date?:               null;
  shipping_time?:               string;
  shipping_method?:             string;
  offer_date?:                  null;
  offer_valid_date?:            null;
  return_date?:                 null;
  discount?:                    number;
  discount_type?:               string;
  status?:                      string;
  down_payment?:                number;
  user?:                        UserInfoType;
  type?:                        POType;
  account?:                     Account;
  customer?:                    Customer;
  purchase_type?:               PurchaseType;
  term_of_payment?:             TermOfPayment;
  receive_payment_detail?:      any[];
  products?:                    ProductElement[];
  payment_status_string?:       string;
  warehouse?:                   null;
  payment_date_string?:         string;
  is_payment_complete?:         boolean;
  remaining_bill?:              number;
  total?:                       number;
  total_return_discount?:       number;
  total_depreciation_discount?: number;
  total_discount?:              number;
  sub_total?:                   number;
  return_value?:                number;
  depreciation_value?:          number;
  total_payment?:               number;
  total_payment_discount?:      number;
  total_balance?:               number;
}

export interface Account {
  balance?:    string;
  level?:      number;
  is_active?:  boolean;
  id?:         number;
  created_at?: Date;
  updated_at?: Date;
  code?:       string;
  name?:       string;
  category?:   string;
}

export interface Customer {
  status?:            string;
  is_active?:         boolean;
  id?:                number;
  created_at?:        Date;
  updated_at?:        Date;
  code?:              null;
  title?:             string;
  first_name?:        string;
  last_name?:         string;
  balance?:           string;
  email?:             string;
  address?:           string;
  shipping_address?:  string;
  notes?:             string;
  dob?:               null;
  telephones?:        string;
  full_name?:         string;
  telephones_array?:  string[];
  categories_string?: string;
}

export interface ProductElement {
  id?:                    number;
  created_at?:            Date;
  updated_at?:            Date;
  product_id?:            number;
  product_name?:          string;
  description?:           string;
  amount?:                number;
  return_amount?:         number;
  unit?:                  string;
  per_unit_price?:        number;
  discount?:              number;
  discount_type?:         string;
  depreciation_action?:   string;
  depreciation_amount?:   number;
  return_discount?:       number;
  depreciation_discount?: number;
  discount_value?:        number;
  total?:                 number;
  product?:               ProductProduct;
}

export interface ProductProduct {
  id?:                       number;
  code?:                     string;
  name?:                     string;
  category_id?:              number;
  description?:              string;
  stock?:                    number;
  weight_in_kg?:             string;
  pair_count?:               number;
  head_count?:               number;
  material_id?:              null;
  supporting_product_id?:    null;
  supporting_product_count?: number;
  is_active?:                boolean;
  created_at?:               Date;
  updated_at?:               Date;
  category?:                 Category;
  material?:                 null;
  supporting_product?:       null;
}

export interface Category {
  id?:               number;
  name?:             string;
  category_type_id?: number;
  code?:             string;
  created_at?:       null;
  updated_at?:       null;
}

export interface PurchaseType {
  id?:         number;
  created_at?: Date;
  updated_at?: Date;
  code?:       string;
  name?:       string;
  is_lock?:    boolean;
  order?:      number;
}

export interface TermOfPayment {
  id?:         number;
  created_at?: Date;
  updated_at?: Date;
  name?:       string;
  notes?:      null;
}

export interface POType {
  id?:              number;
  created_at?:      Date;
  updated_at?:      Date;
  code?:            string;
  name?:            string;
  default_message?: null;
  group?:           string;
  is_menu?:         boolean;
  is_lock?:         boolean;
  order?:           number;
}
