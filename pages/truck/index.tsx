import MainLayout from "components/layout";
import useAuth from "internal/base/middleware/auth";
import useAuthAdmin from "internal/base/middleware/authAdmin";
import type { NextPage } from "next";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
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
import TruckStateFn from "internal/truck/state";
import { TruckType } from "internal/truck/type";

const TruckPage: NextPage = () => {
  const router = useRouter();
  const {
    truckList,
    handleCreateTruck,
    isModalVisible,
    setIsModalVisible,
    form,
    userList,
  } = TruckStateFn();
  const columns: ColumnsType<TruckType> = [
    {
      title: "Plate Number",
      dataIndex: "license_plate",
      key: "license_plate",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (record: string, data: TruckType) => {
        return (
          <Tag color={record ? "blue" : "red"} key={data.license_plate}>
            {record}
          </Tag>
        );
      },
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Detail",
      dataIndex: "license_plate",
      key: "license_plate",
      render: (record: string, data: TruckType) => {
        return (
          <Link href={"/truck/" + record}>
            <Button type="primary">Detail</Button>
          </Link>
        );
      },
    },
  ];

  return (
    <MainLayout title="Truck List" router={router}>
      <>
        <Row justify="end">
          {" "}
          <Button
            onClick={() => setIsModalVisible(!isModalVisible)}
            type="primary"
          >
            Add New Truck
          </Button>{" "}
        </Row>
        <Table rowKey="id" columns={columns} dataSource={truckList} />
        <Modal
          title="Reset Password"
          visible={isModalVisible}
          onOk={handleCreateTruck}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form form={form}>
            <Form.Item
              name="license_plate"
              label="License Plate"
              rules={[
                {
                  required: true,
                  message: "Please input the License Plate!",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="notes"
              label="Notes"
              rules={[
                {
                  required: true,
                  message: "Please input the Notes!",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="type"
              label="Type"
              rules={[
                {
                  required: true,
                  message: "Please input the Type!",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[
                {
                  required: true,
                  message: "Please input the Status!",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="capacity"
              label="Capacity"
              rules={[
                {
                  required: true,
                  message: "Please input the Capacity!",
                },
                { type: "number" },
              ]}
            >
              <InputNumber/>
            </Form.Item>
            <Form.Item
              name="is_active"
              label="Active"
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  message: "Please input the Active!",
                },
              ]}
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name="users"
              label="Users"
              rules={[
                {
                  required: true,
                  message: "Please select User!",
                },
              ]}
            >
              <Select>
                {userList.map((item) => (
                  <Select.Option value={item.id} key={item.id}>
                    {item.full_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </>
    </MainLayout>
  );
};

export default useAuth(TruckPage);
