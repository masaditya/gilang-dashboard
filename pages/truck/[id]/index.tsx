import MainLayout from "components/layout";
import Authn, { PropsType } from "internal/base/middleware/auth";
import type { NextPage } from "next";
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Form,
  Input,
  InputNumber,
  Layout,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import React from "react";
import { useRouter } from "next/router";
import TruckStateFn from "internal/truck/state";

const TruckDetailPage: NextPage = (props: PropsType) => {
  const router = useRouter();
  const {
    userList,
    form,
    handleCreateTruck,
    isModalVisible,
    setIsModalVisible,
    isUpdate,
    setIsUpdate,
    truckDetail,
    handleAssignUser,
    formAssignUser,
    handleDeleteTruck,
  } = TruckStateFn(props.user, router.query?.id?.toString());

  return (
    <MainLayout title="Truck List" router={router}>
      <Card
        title="Trcuk Detail"
        extra={
          <Space size="large">
            <Button onClick={() => setIsUpdate(!isUpdate)} type="primary">
              Edit
            </Button>
            <Button onClick={() => setIsModalVisible(!isModalVisible)}>
              Assign User
            </Button>
            <Popconfirm onConfirm={handleDeleteTruck} title="Delete Truck?">
              <Button type="primary" danger>
                Delete Truck
              </Button>
            </Popconfirm>
          </Space>
        }
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          disabled={!isUpdate}
          onFinish={handleCreateTruck}
        >
          <Form.Item label="Plate Number" name="license_plate">
            <Input />
          </Form.Item>
          <Form.Item name="notes" label="Notes">
            <Input type="text" />
          </Form.Item>
          <Form.Item name="type" label="Type">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Status" name="is_active" valuePropName="checked">
            <Switch />
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
          <Form.Item name="users" hidden></Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </Form.Item>
        </Form>

        <Divider orientation="left">Users</Divider>

        {truckDetail?.users && truckDetail?.users.length > 0 ? (
          <Layout className="detail-content">
            <Row gutter={[12, 8]}>
              {truckDetail?.users.map((item) => (
                <Col span={12} key={item.id}>
                  <Card title={item.full_name} hoverable>
                    <Row>
                      <Col span={6}>
                        <Typography.Paragraph strong>
                          Email
                        </Typography.Paragraph>
                      </Col>
                      <Col span={18}>
                        <Typography.Paragraph>
                          : {item.email}
                        </Typography.Paragraph>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={6}>
                        <Typography.Paragraph strong>
                          Status
                        </Typography.Paragraph>
                      </Col>
                      <Col span={18}>
                        <Typography.Paragraph>
                          : {item.is_active ? "Active" : "Non-Active"}
                        </Typography.Paragraph>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </Layout>
        ) : (
          <Empty description="User Not Found" />
        )}

        <Modal
          onOk={handleAssignUser}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form layout="vertical" form={formAssignUser}>
            <Form.Item label="Users" name="users">
              <Select mode="multiple">
                {userList.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.full_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </MainLayout>
  );
};

export default Authn(TruckDetailPage);
