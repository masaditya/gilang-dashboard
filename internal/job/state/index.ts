import { TablePaginationConfig } from "antd/es/table";
import { UserInfoType } from "internal/user/type";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ErrorHandler } from "utils/errorHandler";
import { FindPO, GetJob, GetJobByID, GetJobDetail, GetReportPDF } from "../api";
import { JobType, SalesOrderType } from "../type";

const JobStateFn = (userInfo?: UserInfoType, id_job?: string | number) => {
  const router = useRouter();

  const [jobList, setJobList] = useState<JobType[]>([]);
  const [jobDetail, setJobDetail] = useState<JobType>();
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });

  React.useEffect(() => {
    setLoading(true)
    GetJob(pagination.current, pagination.pageSize)
      .then((res) => {
        setJobList(res.data.data);
        setPagination({
          total: res.data.meta.totalItems,
          current: res.data.meta.currentPage,
          pageSize: res.data.meta.itemsPerPage,
        });
        setLoading(false)
      })
      .catch(ErrorHandler);
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination({
      ...newPagination,
    });
  };

  React.useEffect(() => {
    if (id_job) {
      GetJobByID(id_job.toString()).then((res) => {
        setJobDetail(res.data);
      });
    }
  }, [id_job]);

  const getDetailTimbang = (id: string) => {
    GetJobDetail(id)
      .then((res) => console.log(res.data))
      .catch(ErrorHandler);
  };

  const getPDFReport = (so_id: string) => {
    GetReportPDF(so_id)
      .then((res) => {
        console.log("RES", res.data);
        window.open(res.data, "_blank");
      })
      .catch(ErrorHandler);
  };

  return {
    jobList,
    jobDetail,
    getPDFReport,
    getDetailTimbang,
    pagination,
    handleTableChange,
    loading
  };
};

export default JobStateFn;
