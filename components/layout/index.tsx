import {
  PartitionOutlined,
  UserOutlined,
  CarOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { Layout, Menu, PageHeader, Typography } from "antd";
import { ClearTokenAdmin, ClearTokenUser } from "internal/base/auth/token";
import Link from "next/link";
import { NextRouter } from "next/router";
import React from "react";

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = ({
  children,
  title,
  router,
}: {
  children: React.ReactElement;
  title?: string;
  router: NextRouter;
}) => (
  <Layout style={{ minHeight: "100vh" }}>
    <Sider breakpoint="lg" collapsedWidth="0">
      <Link  href="/">
        <div className="logo">
          <Typography.Title level={1} className="logo-title"> Gilang App </Typography.Title>
        </div>
      </Link>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[router.pathname]} activeKey={router.pathname}>
        <Menu.Item key="/user" onClick={()=>router.push("/user")} icon={<UserOutlined/>}> User</Menu.Item>
        <Menu.Item key="/truck" onClick={()=>router.push("/truck")} icon={<CarOutlined />}> Truck</Menu.Item>
        <Menu.Item key="/job" onClick={()=>router.push("/job")} icon={<PartitionOutlined />}> Job</Menu.Item>
        <Menu.Item key="/logout" onClick={()=> {
          ClearTokenAdmin()
          ClearTokenUser()
          router.push("/login")
        }} icon={<LogoutOutlined color="#e74c3c" />}> Logout</Menu.Item>

      </Menu>
    </Sider>
    <Layout>
      <Header
        className="site-layout-sub-header-background"
        style={{ padding: 0 }}
      />
      <Content style={{ margin: "24px 16px 0" }}>
        <PageHeader
          className="site-page-header"
          title={title}
          //   subTitle="This is a subtitle"
        />
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Gilang Expedisi ©2022 Created by Sprado.co
      </Footer>
    </Layout>
  </Layout>
);

export default MainLayout;
