import MainLayout from "components/layout";
import useAuth from "internal/base/middleware/auth";
import useAuthAdmin from "internal/base/middleware/authAdmin";
import type { NextPage } from "next";
import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";
import { GetUser } from "internal/user/api";
import { UserInfoType } from "internal/user/type";
import UserStateFn from "internal/user/state";
import Link from "next/link";
import { useRouter } from "next/router";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const UserPage: NextPage = () => {
  const router = useRouter();
  const { userList, handleSearchByEmail } = UserStateFn();
  React.useEffect(() => {
    console.log(router.pathname);
  }, [])
  
  const columns: ColumnsType<UserInfoType> = [
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (record: boolean, data: UserInfoType) => {
        return (
          <Tag color={record ? "blue" : "red"} key={data.id}>
            {record ? "Active" : "Non-Active"}
          </Tag>
        );
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Detail",
      dataIndex: "id",
      key: "id",
      render: (record: boolean, data: UserInfoType) => {
        return (
          <Link href={"/user/" + record}>
            <Button type="primary">Detail</Button>
          </Link>
        );
      },
    },
  ];

  return (
    <MainLayout title="User List" router={router}>
      <Table rowKey="id" columns={columns} dataSource={userList} />
    </MainLayout>
  );
};

export default useAuth(UserPage);
