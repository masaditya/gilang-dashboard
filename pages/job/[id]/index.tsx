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
  List,
  Modal,
  Row,
  Table,
  Tag,
  Typography,
} from "antd";
import React from "react";
import { useRouter } from "next/router";
import JobStateFn from "internal/job/state";
import moment from "moment";
import TableProducts from "components/table/products";
import { HistoryType } from "internal/job/type";

const JobDetailPage: NextPage = (props: PropsType) => {
  const router = useRouter();
  const {
    jobDetail,
    getPDFReport,
    getDetailTimbang,
    setShowModalHistory,
    showModalHistory,
    loading,
    history,
  } = JobStateFn(props.user, router.query?.id?.toString());
  const tmp = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 22, 33, 44, 55, 66, 77, 88, 99,
  ];
  return (
    <MainLayout title="Job Detail" router={router}>
      <Card
        title="Job Detail"
        extra={
          <Button
            onClick={() =>
              jobDetail?.so_id && getPDFReport(jobDetail?.so_id.toString())
            }
            type="primary"
          >
            Report PDF
          </Button>
        }
      >
        <Row>
          <Col span={10}>
            <Typography.Paragraph strong>
              Purchase Order ID
            </Typography.Paragraph>
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
              {jobDetail?.so?.user?.full_name}
            </Typography.Paragraph>
          </Col>
          <Col span={10}>
            <Typography.Paragraph strong>Transaction Date</Typography.Paragraph>
          </Col>
          <Col span={14}>
            <Typography.Paragraph>
              {moment(jobDetail?.so?.transaction_date).format(
                "DD MMMM YYYY HH:mm"
              )}
            </Typography.Paragraph>
          </Col>
          <Col span={10}>
            <Typography.Paragraph strong>
              Transaction Number
            </Typography.Paragraph>
          </Col>
          <Col span={14}>
            <Typography.Paragraph>
              {jobDetail?.so?.transaction_number}
            </Typography.Paragraph>
          </Col>
        </Row>

        <Divider orientation="left"> Products </Divider>

        <Layout>
          {jobDetail?.so && (
            <TableProducts
              data={jobDetail?.details}
              getDetailTimbang={getDetailTimbang}
            />
          )}
        </Layout>

        <Modal
          width={1000}
          title="Timbang History"
          visible={showModalHistory}
          footer={null}
          onCancel={() => setShowModalHistory(false)}
        >
          <List
            header={
              <Row>
                <Col span={6}>Waktu Timbang</Col>
                <Col span={4}>Nama Produk</Col>
                <Col span={4}>Berat</Col>
                <Col span={4}>Jumlah Ekor</Col>
                <Col span={6}>Nama Penimbang</Col>
              </Row>
            }
            loading={loading}
            dataSource={history}
            style={{height:400, overflowY:"auto"}}
            renderItem={(item: HistoryType) => (
              <Row
                style={{ marginBottom: 15, marginTop: 10 }}
              >
                <Col span={6}>
                  {moment(item.created_at).format("DD MMM YYYY")}
                </Col>
                <Col span={4}> {item.product_id} </Col>
                <Col span={4}> {item.weight} Kg</Col>
                <Col span={4}> {item.head} Ekor </Col>
                <Col span={6}> {item.user?.full_name} </Col>
                {/* <Col span={6}>{item}</Col>
                <Col span={4}>{item}</Col>
                <Col span={4}>{item}</Col>
                <Col span={4}>{item}</Col>
                <Col span={6}>{item}</Col> */}
              </Row>
            )}
          />
        </Modal>

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
