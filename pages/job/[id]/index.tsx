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
  Space,
  Tag,
  Typography,
} from "antd";
import React from "react";
import { useRouter } from "next/router";
import JobStateFn from "internal/job/state";
import moment from "moment";
import TableProducts from "components/table/products";
import { HistoryType } from "internal/job/type";
import { UserInfoType } from "internal/user/type";

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
    setShowModalUser,
    showModalUser,
    userList,
    handleAssingUser,
  } = JobStateFn(props.user, router.query?.id?.toString());

  return (
    <MainLayout title="Job Detail" router={router}>
      <Card
        title="Job Detail"
        extra={
          <Space>
            <Button onClick={() => setShowModalUser(true)} type="primary">
              Assign User
            </Button>
            <Button
              onClick={() =>
                jobDetail?.so_id && getPDFReport(jobDetail?.so_id.toString())
              }
              type="primary"
            >
              Report PDF
            </Button>
          </Space>
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
          title="Assign User"
          visible={showModalUser}
          footer={null}
          onCancel={() => setShowModalUser(false)}
        >
          <List
            header={
              <Row>
                <Col span={16}>Nama Karyawan</Col>
                <Col span={4}>Role</Col>
                <Col span={4}>Aksi</Col>
              </Row>
            }
            loading={loading}
            dataSource={userList}
            style={{ height: 400, overflowY: "auto" }}
            renderItem={(item: UserInfoType) => (
              <Row key={item.id} style={{ marginBottom: 15, marginTop: 10 }}>
                <Col span={16}> {item.full_name} </Col>
                <Col span={4}>{item.role}</Col>
                <Col span={4}>
                  <Button
                    onClick={() =>
                      jobDetail?.so_id &&
                      handleAssingUser(
                        jobDetail?.so_id.toString(),
                        item.id?.toString()
                      )
                    }
                  >
                    Assign
                  </Button>
                </Col>
              </Row>
            )}
          />
        </Modal>

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
                <Col span={4}>Waktu Timbang</Col>
                <Col span={6}>Nama Produk</Col>
                <Col span={4}>Berat</Col>
                <Col span={4}>Jumlah Ekor</Col>
                <Col span={6}>Nama Penimbang</Col>
              </Row>
            }
            loading={loading}
            dataSource={history}
            style={{ height: 400, overflowY: "auto" }}
            renderItem={(item: HistoryType) => (
              <Row key={item.id} style={{ marginBottom: 15, marginTop: 10 }}>
                <Col span={4}>
                  {moment(item.created_at).format("DD MMM YYYY")}
                </Col>
                <Col span={6}>
                  {item.product?.product?.name} -
                  {item.product?.product?.description}
                </Col>
                <Col span={4}> {item.weight} Kg</Col>
                <Col span={4}> {item.head} Ekor </Col>
                <Col span={6}> {item.user?.full_name} </Col>
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
