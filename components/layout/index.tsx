import {
  PartitionOutlined,
  UserOutlined,
  CarOutlined,
} from "@ant-design/icons";
import { Layout, Menu, PageHeader } from "antd";
import { NextRouter } from "next/router";
import React from "react";

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = ({
  children,
  title,
  router,
}: {
  children: React.ReactElement;
  title: string;
  router: NextRouter;
}) => (
  <Layout style={{ minHeight: "100vh" }}>
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[router.pathname]} activeKey={router.pathname}>
        <Menu.Item key="/user" onClick={()=>router.push("/user")} icon={<UserOutlined/>}> User</Menu.Item>
        <Menu.Item key="/truck" onClick={()=>router.push("/truck")} icon={<CarOutlined />}> Truck</Menu.Item>
        <Menu.Item key="/job" onClick={()=>router.push("/job")} icon={<PartitionOutlined />}> Job</Menu.Item>
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
          onBack={() => router.back()}
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
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  </Layout>
);

export default MainLayout;
