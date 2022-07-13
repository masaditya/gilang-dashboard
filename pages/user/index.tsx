import MainLayout from "components/layout";
import uAuthn from "internal/base/middleware/auth";
import AuthnAdmin from "internal/base/middleware/authAdmin";
import type { NextPage } from "next";
import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Space,
  Switch,
  Table,
  Tag,
} from "antd";
import type { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";
import { GetUser } from "internal/user/api";
import { UserInfoType } from "internal/user/type";
import UserStateFn from "internal/user/state";
import Link from "next/link";
import { useRouter } from "next/router";

const UserPage: NextPage = () => {
  const router = useRouter();
  const {
    userList,
    loading,
    form,
    handleTableChange,
    pagination,
    isModalVisible,
    setIsModalVisible,
    handleFinishSave,
  } = UserStateFn();

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
      <>
        <Row justify="end">
          <Button
            onClick={() => setIsModalVisible(!isModalVisible)}
            type="primary"
          >
            Add New User
          </Button>
        </Row>
        <Table
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          rowKey="id"
          columns={columns}
          dataSource={userList}
        />
        <Modal
          title="Add Truck"
          visible={isModalVisible}
          onOk={handleFinishSave}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form form={form} layout="vertical">
            <Form.Item label="First Name" name="first_name" required>
              <Input />
            </Form.Item>
            <Form.Item label="Last Name" name="last_name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" required>
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password" required>
              <Input type="password" />
            </Form.Item>
            <Form.Item
              label="Status"
              name="is_active"
              valuePropName="checked"
              required
            >
              <Switch />
            </Form.Item>
            <Form.Item label="Role" name="role" required>
              <Radio.Group>
                <Radio value="USER">USER</Radio>
                <Radio value="ADMIN">ADMIN</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </>
    </MainLayout>
  );
};

export default uAuthn(UserPage);
