export type ProcessJobType = {
  items?: ItemType[];
  attachments?: string[];
};

export type ItemType = {
  product_id?: number;
  weight?: number;
  head?: number;
};
