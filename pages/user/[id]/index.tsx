import MainLayout from "components/layout";
import uAuthn, { PropsType } from "internal/base/middleware/auth";
import type { NextPage } from "next";
import {
  Button,
  Card,
  Form,
  Tag,
  Input,
  Switch,
  Radio,
  Typography,
  Empty,
  Collapse,
  Space,
  Modal,
  Popconfirm,
  message,
  Divider,
  Layout,
  Row,
  Col,
} from "antd";
import type { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { GetUser, GetUserByID, UpdateUser } from "internal/user/api";
import { UserInfoType } from "internal/user/type";
import { useRouter } from "next/router";
import UserStateFn from "internal/user/state";

const UserPageDetail: NextPage = (props: PropsType) => {
  const router = useRouter();
  const {
    isModalVisible,
    handleResetPasswordUser,
    setIsModalVisible,
    userDetail,
    handleFinishSave,
    isUpdate,
    setIsUpdate,
    form,
    formResetPassword,
    handleActivate,
    handleDeactivate,
    handleHardResetPassword,
  } = UserStateFn(props.user, router.query?.id?.toString());

  return (
    <MainLayout title="User Detail" router={router}>
      <Card
        title="User"
        extra={
          <Space size="large">
            {props.user?.role === "USER" && (
              <Button
                danger
                onClick={() => setIsModalVisible(true)}
                type="primary"
              >
                Change Password
              </Button>
            )}
            {props.user?.role === "ADMIN" && (
              <Popconfirm
                title={`Reset password user ${userDetail?.full_name}?`}
                onConfirm={handleHardResetPassword}
                onCancel={() => message.info("Cancel Reset Password")}
                okText="Yes"
                cancelText="No"
              >
                <Button danger type="primary">
                  Reset Password User
                </Button>
              </Popconfirm>
            )}
            <Button onClick={() => setIsUpdate(!isUpdate)}>Edit</Button>
            {props.user?.role === "ADMIN" && userDetail?.is_active && (
              <Button danger type="dashed" onClick={handleDeactivate}>
                Deactivate
              </Button>
            )}
            {props.user?.role === "ADMIN" && !userDetail?.is_active && (
              <Button danger type="dashed" onClick={handleActivate}>
                Activate
              </Button>
            )}
          </Space>
        }
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          disabled={!isUpdate}
          onFinish={handleFinishSave}
        >
          <Form.Item label="First Name" name="first_name">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="last_name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Status" name="is_active" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="Role" name="role">
            <Radio.Group>
              <Radio value="USER">USER</Radio>
              <Radio value="ADMIN">ADMIN</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </Form.Item>
        </Form>

        {/* MODAL RESET PASSWORD */}
        <Modal
          title="Reset Password"
          visible={isModalVisible}
          onOk={handleResetPasswordUser}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form form={formResetPassword}>
            <Form.Item
              name="old_password"
              label="Old Password"
              rules={[
                {
                  required: true,
                  message: "Please input the Old Password!",
                },
              ]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item
              name="new_password"
              label="New Password"
              rules={[
                {
                  required: true,
                  message: "Please input the New Password!",
                },
              ]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item
              name="new_password_confirmation"
              label="Confirm New Password"
              dependencies={["new_password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input type="password" />
            </Form.Item>
          </Form>
        </Modal>

        {/* {typeof userDetail?.trucks === "undefined" && userDetail?.trucks ? (
          <Collapse accordion>
            <Collapse.Panel header="This is Collapse.panel header 1" key="1">
              <p>{"text"}</p>
            </Collapse.Panel>
            <Collapse.Panel header="This is Collapse.panel header 2" key="2">
              <p>{"text"}</p>
            </Collapse.Panel>
            <Collapse.Panel header="This is Collapse.panel header 3" key="3">
              <p>{"text"}</p>
            </Collapse.Panel>
          </Collapse>
        ) : (
          <Empty description="Data Truck Not Found" />
        )} */}

        <Divider orientation="left"> Trucks </Divider>

        {userDetail?.trucks && userDetail?.trucks.length > 0 ? (
          <Layout className="detail-content">
            <Row gutter={[12, 8]}>
              {userDetail?.trucks.map((item) => (
                <Col span={8} key={item.id}>
                  <Card title={item.license_plate} hoverable>
                    <Row>
                      <Col span={10}>
                        <Typography.Paragraph strong>
                          Capacity
                        </Typography.Paragraph>
                      </Col>
                      <Col span={14}>
                        <Typography.Paragraph>
                          : {item.capacity}
                        </Typography.Paragraph>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <Typography.Paragraph strong>
                          Status
                        </Typography.Paragraph>
                      </Col>
                      <Col span={14}>
                        <Typography.Paragraph>
                          : {item.status}
                        </Typography.Paragraph>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </Layout>
        ) : (
          <Empty description="No Truck" />
        )}
      </Card>
    </MainLayout>
  );
};

export default uAuthn(UserPageDetail);
