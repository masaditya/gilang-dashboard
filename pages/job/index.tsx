import MainLayout from "components/layout";
import uAuthn from "internal/base/middleware/auth";
import AuthnAdmin from "internal/base/middleware/authAdmin";
import type { NextPage } from "next";
import { Button, Space, Table, Tag, Typography, Tabs } from "antd";
import type { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";
import { GetUser } from "internal/user/api";
import { UserInfoType } from "internal/user/type";
import UserStateFn from "internal/user/state";
import Link from "next/link";
import { useRouter } from "next/router";
import JobStateFn from "internal/job/state";
import { JobType, SalesOrderType } from "internal/job/type";
import moment from "moment";

const JobPage: NextPage = () => {
  const router = useRouter();
  const { jobList, pagination, handleTableChange, loading } = JobStateFn();

  const columns: ColumnsType<JobType> = [
    {
      title: "Purchase Order ID",
      dataIndex: "so_id",
      key: "so_id",
    },
    {
      title: "Driver",
      dataIndex: "user",
      key: "user",
      render: (record: UserInfoType, data: JobType) => (
        <Typography.Paragraph> {record.full_name} </Typography.Paragraph>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (record: string, data: JobType) => (
        <Tag color={record == "process" ? "yellow" : "green"} key={data.id}>
          {record}
        </Tag>
      ),
    },
    {
      title: "Detail",
      dataIndex: "id",
      key: "id",
      render: (record: string, data: JobType) => {
        return (
          <Link href={"/job/" + record}>
            <Button type="primary">Detail</Button>
          </Link>
        );
      },
    },
  ];

  return (
    <MainLayout title="Job List" router={router}>
      <Table
        pagination={pagination}
        rowKey="id"
        columns={columns}
        dataSource={jobList}
        onChange={handleTableChange}
        loading={loading}
        
      />
    </MainLayout>
  );
};

export default uAuthn(JobPage);
