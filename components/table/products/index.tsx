import { Button, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { ProductTableTypes } from "./types";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const TableProducts = (props: {
  data: ProductTableTypes[];
  getDetailTimbang: (id : string) => void;
}) => {
  const columns: ColumnsType<ProductTableTypes> = [
    {
      title: "Product Name",
      dataIndex: "product_id",
      key: "product_id",
      render: (text: string, record: ProductTableTypes) => (
        <Typography.Paragraph>
          {record.product?.product?.name} -{" "}
          {record.product?.product?.description}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Jumlah Ekor",
      dataIndex: "head",
      key: "head",
      render: (text) => (
        <Typography.Paragraph>{text} Ekor</Typography.Paragraph>
      ),
    },
    {
      title: "Total Berat",
      dataIndex: "weight",
      key: "weight",
      render: (text, record) => (
        <Typography.Paragraph>
          {text} {record.product?.unit}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Di Timbang Oleh ",
      key: "user",
      dataIndex: "user",
      render: (user, record) => (
        <Typography.Paragraph>{user?.full_name}</Typography.Paragraph>
      ),
    },
    {
      title: "History Timbang",
      key: "id",
      dataIndex: "id",
      render: (id) => <Button onClick={()=> props.getDetailTimbang(id.toString())}>Lihat History</Button>,
    },
  ];

  return (
    <Table
      pagination={{ pageSize: 5 }}
      rowKey="id"
      dataSource={props.data}
      columns={columns}
    ></Table>
  );
};

export default TableProducts;
