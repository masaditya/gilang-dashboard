import MainLayout from "components/layout";
import uAuthn from "internal/base/middleware/auth";
import type { NextPage } from "next";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Switch,
  Table,
  Tag,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/lib/table";
import React from "react";
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
    loading,
    pagination,
    handleTableChange,
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
      dataIndex: "is_active",
      key: "is_active",
      render: (record: string, data: TruckType) => {
        return (
          <Tag color={record ? "blue" : "red"} key={data.license_plate}>
            {record ? "Active" : "Non-Active"}
          </Tag>
        );
      },
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      render: (record: string, data: TruckType) => (
        <Typography.Paragraph>
          {" "}
          {record ? record + " Ton" : "-"}{" "}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Detail",
      dataIndex: "id",
      key: "id",
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
          <Button
            onClick={() => setIsModalVisible(!isModalVisible)}
            type="primary"
          >
            Add New Truck
          </Button>
        </Row>
        <Table
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          rowKey="id"
          columns={columns}
          dataSource={truckList}
        />
        <Modal
          title="Add Truck"
          visible={isModalVisible}
          onOk={handleCreateTruck}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form form={form} layout="vertical">
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
            <Form.Item name="notes" label="Notes">
              <Input type="text" />
            </Form.Item>
            <Form.Item name="type" label="Type">
              <Input type="text" />
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="capacity"
              label="Capacity"
              rules={[{ type: "number" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Berat dalam Ton"
              />
            </Form.Item>
            <Form.Item name="is_active" label="Active" valuePropName="checked">
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

export default uAuthn(TruckPage);
