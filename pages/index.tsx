import { Card, Col, Layout, Row, Space, Typography } from "antd";
import MainLayout from "components/layout";
import uAuthn, { PropsType } from "internal/base/middleware/auth";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FiCheckSquare, FiTruck, FiUsers } from "react-icons/fi";
const Home: NextPage = (props: PropsType) => {
  const router = useRouter();

  return (
    <MainLayout title="Dashboard" router={router}>
      <Layout>
        <Typography.Title level={3}>
          Welcome, {props.user?.full_name} !
        </Typography.Title>
        <Row gutter={[12, 12]}>
          <Col span={8}>
            <Card hoverable onClick={() => router.push("/user")}>
              <Space size="large" align="center">
                <FiUsers size={40} />
                <Typography.Title level={2}>Users</Typography.Title>
              </Space>
              <Typography.Paragraph>
                Manage Users and Admins
              </Typography.Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable onClick={() => router.push("/truck")}>
              <Space size="large" align="center">
                <FiTruck size={40} />
                <Typography.Title level={2}>Trucks</Typography.Title>
              </Space>
              <Typography.Paragraph>Manage Truck Expedisi</Typography.Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card hoverable onClick={() => router.push("/job")}>
              <Space size="large" align="center">
                <FiCheckSquare size={40} />
                <Typography.Title level={2}>Job</Typography.Title>
              </Space>
              <Typography.Paragraph>Manage Job and Order</Typography.Paragraph>
            </Card>
          </Col>
        </Row>
      </Layout>
    </MainLayout>
  );
};

export default uAuthn(Home);
