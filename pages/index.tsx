import { Card, Col, Layout, Row, Space, Typography } from "antd";
import React from "react";
import MainLayout from "components/layout";
import uAuthn, { PropsType } from "internal/base/middleware/auth";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FiCheckSquare, FiTruck, FiUsers } from "react-icons/fi";

import type { LottiePlayer } from "lottie-web";
const Home: NextPage = (props: PropsType) => {
  const router = useRouter();

  const ref = React.useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = React.useState<LottiePlayer | null>(null);

  React.useEffect(() => {
    import("lottie-web").then((Lottie) => setLottie(Lottie.default));
  }, []);

  React.useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        container: ref.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        // path to your animation file, place it inside public folder
        path: "/data-dashboard.json",
      });

      return () => animation.destroy();
    }
  }, [lottie]);

  return (
    <MainLayout title="Dashboard" router={router}>
      <Layout>
        <Typography.Title level={3}>
          Welcome, {props.user?.full_name} !
        </Typography.Title>
        <div className="dashboard-lottie" ref={ref} />
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
