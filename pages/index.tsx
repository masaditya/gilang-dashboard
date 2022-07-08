import { Card, Col, Row } from "antd";
import MainLayout from "components/layout";
import uAuthn from "internal/base/middleware/auth";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <MainLayout title="Dashboard" router={router}>
      <Row gutter={[12, 12]}>
        <Col span={8}> <Card hoverable></Card> </Col>
        <Col span={8}> <Card></Card> </Col>
        <Col span={8}> <Card></Card> </Col>

      </Row>
    </MainLayout>
  );
};

export default uAuthn(Home);
