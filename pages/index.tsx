import {
  Card,
  Col,
  Divider,
  Layout,
  Progress,
  Row,
  Space,
  Statistic,
  Typography,
} from "antd";
import React from "react";
import MainLayout from "components/layout";
import uAuthn, { PropsType } from "internal/base/middleware/auth";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FiCheckSquare, FiTruck, FiUsers } from "react-icons/fi";

import type { LottiePlayer } from "lottie-web";
import HomeStateFn from "internal/home/state";
import moment from "moment";
const Home: NextPage = (props: PropsType) => {
  const router = useRouter();
  const { overview } = HomeStateFn();
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
        <Row gutter={[12, 12]}>
          <Col xs={24} lg={8}>
            <Card hoverable onClick={() => router.push("/user")}>
              <Typography.Title level={1}>
                {overview?.total_users}
              </Typography.Title>
              <Space size="large" align="center">
                <FiUsers size={40} />
                <Typography.Title level={2}>Users</Typography.Title>
              </Space>
              <Typography.Paragraph>
                Manage Users and Admins
              </Typography.Paragraph>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card hoverable onClick={() => router.push("/truck")}>
              <Typography.Title level={1}>
                {overview?.total_trucks}
              </Typography.Title>
              <Space size="large" align="center">
                <FiTruck size={40} />
                <Typography.Title level={2}>Trucks</Typography.Title>
              </Space>
              <Typography.Paragraph>Manage Truck Expedisi</Typography.Paragraph>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card hoverable onClick={() => router.push("/job")}>
              <Typography.Title level={1}>
                {overview?.total_jobs}
              </Typography.Title>

              <Space size="large" align="center">
                <FiCheckSquare size={40} />
                <Typography.Title level={2}>Job</Typography.Title>
              </Space>
              <Typography.Paragraph>Manage Job and Order</Typography.Paragraph>
            </Card>
          </Col>
        </Row>
        <Card hoverable style={{ marginTop: 20, marginBottom: 20 }}>
          <Row gutter={[12, 12]}>
            <Col xs={12} lg={6}>
              <Statistic
                title="Job Complete"
                value={overview?.total_by_job_status?.complete}
              />
            </Col>
            <Col xs={12} lg={6}>
              <Statistic
                title="Job Partial Complete"
                value={overview?.total_by_job_status?.partial}
              />
            </Col>
            <Col xs={12} lg={6}>
              <Statistic
                title="Job Process"
                value={overview?.total_by_job_status?.process}
              />
            </Col>
            <Col xs={12} lg={6}>
              <Statistic
                title="Job Pending"
                value={overview?.total_by_job_status?.pending}
              />
            </Col>
          </Row>
        </Card>
        <div className="dashboard-lottie" ref={ref} />
      </Layout>
    </MainLayout>
  );
};

export default uAuthn(Home);
