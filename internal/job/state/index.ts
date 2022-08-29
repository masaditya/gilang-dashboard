import { notification } from "antd";
import { TablePaginationConfig } from "antd/es/table";
import { GetUser } from "internal/user/api";
import { UserInfoType } from "internal/user/type";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ErrorHandler } from "utils/errorHandler";
import {
  AssignUserToJob,
  FindPO,
  GetJob,
  GetJobByID,
  GetJobDetail,
  GetReportPDF,
} from "../api";
import { HistoryType, JobType, SalesOrderType } from "../type";

const JobStateFn = (userInfo?: UserInfoType, id_job?: string | number) => {
  const router = useRouter();

  const [jobList, setJobList] = useState<JobType[]>([]);
  const [userList, setUserList] = useState<UserInfoType[]>([]);
  const [jobDetail, setJobDetail] = useState<JobType>();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });

  const [history, setHistory] = useState<HistoryType[]>([]);
  const [showModalHistory, setShowModalHistory] = useState<boolean>(false);
  const [showModalUser, setShowModalUser] = useState<boolean>(false);

  React.useEffect(() => {
    setLoading(true);
    GetJob(pagination.current, pagination.pageSize)
      .then((res) => {
        setJobList(res.data.data);
        setPagination({
          total: res.data.meta.totalItems,
          current: res.data.meta.currentPage,
          pageSize: res.data.meta.itemsPerPage,
        });
        setLoading(false);
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
      // GetJobByID(id_job.toString()).then((res) => {
      //   setJobDetail(res.data);
      // });
      Promise.all([GetJobByID(id_job.toString()), GetUser()]).then(
        ([resJob, resUser]) => {
          setJobDetail(resJob.data);
          setUserList(resUser.data.data);
        }
      );
    }
  }, [id_job]);

  const getDetailTimbang = (id: string) => {
    setShowModalHistory(true);
    setLoading(true);
    GetJobDetail(id)
      .then((res) => {
        setHistory(res.data.histories);
        setLoading(false);
      })
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

  const handleAssingUser = (so_id: string, user_id: string) => {
    AssignUserToJob(so_id, user_id).then(res => {
      console.log(res);
      setShowModalUser(false)
      notification.success({message:"Success Assign User"})
    }).catch(ErrorHandler)
  };

  return {
    jobList,
    jobDetail,
    getPDFReport,
    getDetailTimbang,
    pagination,
    handleTableChange,
    loading,
    history,
    showModalHistory,
    setShowModalHistory,
    showModalUser,
    setShowModalUser,
    userList,
    handleAssingUser
  };
};

export default JobStateFn;
