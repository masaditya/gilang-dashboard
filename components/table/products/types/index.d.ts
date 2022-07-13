export interface ProductTableTypes {
    id?:         number;
    created_at?: Date;
    updated_at?: Date;
    product_id?: number;
    weight?:     number;
    head?:       number;
    user?:       User;
    product?:    ProductTableTypesProduct;
}

export interface ProductTableTypesProduct {
    id?:                    number;
    created_at?:            Date;
    updated_at?:            Date;
    product_id?:            number;
    product_name?:          null;
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

export interface User {
    is_active?:  boolean;
    is_trash?:   boolean;
    id?:         number;
    created_at?: Date;
    updated_at?: Date;
    first_name?: string;
    last_name?:  null;
    role?:       string;
    email?:      string;
    full_name?:  string;
}
