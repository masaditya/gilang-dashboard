import MainLayout from "components/layout";
import uAuthn, { PropsType } from "internal/base/middleware/auth";
import type { NextPage } from "next";
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Image,
  Layout,
  Row,
  Tag,
  Typography,
} from "antd";
import React from "react";
import { useRouter } from "next/router";
import JobStateFn from "internal/job/state";
import moment from "moment";

const JobDetailPage: NextPage = (props: PropsType) => {
  const router = useRouter();
  const { jobDetail, getPDFReport } = JobStateFn(props.user, router.query?.id?.toString());
  return (
    <MainLayout title="Job Detail" router={router}>
      <Card title="Job Detail" extra={<Button onClick={()=> jobDetail?.so_id && getPDFReport(jobDetail?.so_id.toString())} type="primary">Report PDF</Button>}>
        <Row>
          <Col span={10}>
            <Typography.Paragraph strong>Purchase Order ID</Typography.Paragraph>
          </Col>
          <Col span={14}>
            <Typography.Paragraph>{jobDetail?.so_id}</Typography.Paragraph>
          </Col>
          <Col span={10}>
            <Typography.Paragraph strong> Status </Typography.Paragraph>
          </Col>
          <Col span={14}>
            <Tag color={jobDetail?.status == "process" ? "yellow" : "green"}>
              {jobDetail?.status}
            </Tag>
          </Col>
          <Col span={10}>
            <Typography.Paragraph strong> Sales </Typography.Paragraph>
          </Col>
          <Col span={14}>
            <Typography.Paragraph>
              {jobDetail?.so.user.full_name}
            </Typography.Paragraph>
          </Col>
          <Col span={10}>
            <Typography.Paragraph strong> Transaction Date </Typography.Paragraph>
          </Col>
          <Col span={14}>
            <Typography.Paragraph>
              {moment(jobDetail?.so?.transaction_date).format("DD MMMM YYYY HH:mm")}
            </Typography.Paragraph>
          </Col>
          <Col span={10}>
            <Typography.Paragraph strong> Transaction Number </Typography.Paragraph>
          </Col>
          <Col span={14}>
            <Typography.Paragraph>
              {jobDetail?.so?.transaction_number}
            </Typography.Paragraph>
          </Col>
        </Row>

        <Divider orientation="left"> Products </Divider>

        {jobDetail?.details && jobDetail?.details.length > 0 ? (
          <Layout className="detail-content">
            <Row gutter={[12, 8]}>
              {jobDetail?.details.map((item) => (
                <Col span={8} key={item.id}>
                  <Card title={item.product.product.name} hoverable>
                    <Row>
                      <Col span={10}>
                        <Typography.Paragraph strong>
                          Jumlah
                        </Typography.Paragraph>
                      </Col>
                      <Col span={14}>
                        <Typography.Paragraph>
                          : {item.head}
                        </Typography.Paragraph>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <Typography.Paragraph strong>
                          Berat
                        </Typography.Paragraph>
                      </Col>
                      <Col span={14}>
                        <Typography.Paragraph>
                          : {item.weight} Kg
                        </Typography.Paragraph>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </Layout>
        ) : (
          <Empty description="Product Not Found" />
        )}

        <Divider orientation="left"> Attachment </Divider>
        {jobDetail?.attachments && jobDetail?.attachments.length > 0 ? (
          <Layout className="detail-content">
            <Row gutter={[12, 8]}>
              {jobDetail?.attachments.map((item) => (
                <Col span={8} key={item.id}>
                  <Card
                    hoverable
                    cover={<Image alt={item.id.toString()} src={item.url} />}
                  ></Card>
                </Col>
              ))}
            </Row>
          </Layout>
        ) : (
          <Empty description="Attachment Not Found" />
        )}
      </Card>
    </MainLayout>
  );
};

export default uAuthn(JobDetailPage);
