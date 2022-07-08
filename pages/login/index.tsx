import { Button, Checkbox, Form, Input, Layout } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import {
  GetToken,
  GetTokenAdmin,
  SetToken,
  SetTokenAdmin,
} from "internal/base/auth/token";
import { Login } from "internal/user/api";
import { UserInfoType } from "internal/user/type";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { ErrorHandler } from "utils/errorHandler";

const LoginPage: NextPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (GetTokenAdmin() !== "") router.push("/");
      if (GetToken() !== "") router.push("/");
    }
  }, []);

  const handleSubmit = (values: any) => {
    Login(values.email, values.password)
      .then(
        (res: AxiosResponse<{ access_token: string; user: UserInfoType }>) => {
          if (res.data.user.role === "ADMIN") {
            SetTokenAdmin(res.data.access_token);
            SetToken(res.data.access_token);
            router.push("/");
          }
          if (res.data.user.role === "USER") {
            SetToken(res.data.access_token);
            router.push("/");
          }
        }
      )
      .catch(ErrorHandler);
  };

  return (
    <Layout className="form-layout">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default LoginPage;
