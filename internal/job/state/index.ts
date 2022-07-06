import { UserInfoType } from "internal/user/type";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ErrorHandler } from "utils/errorHandler";
import { FindPO, GetJob, GetJobByID, GetReportPDF } from "../api";
import { JobType, SalesOrderType } from "../type";

const JobStateFn = (userInfo?: UserInfoType, id_job?: string | number) => {
  const router = useRouter()

  const [jobList, setJobList] = useState<JobType[]>([]);
  const [salesOrderList, setSalesOrderList] = useState<SalesOrderType[]>([]);
  const [jobDetail, setJobDetail] = useState<JobType>()

  React.useEffect(() => {
    GetJob()
      .then((res) => {
        setJobList(res.data.data);
      })
      .catch(ErrorHandler);
  }, []);

  React.useEffect(()=> {
    if(id_job){
      GetJobByID(id_job.toString()).then(res => {
        setJobDetail(res.data)
      })
    }
  }, [id_job])

  React.useEffect(() => {
    FindPO()
      .then((res) => {
        console.log(res.data.data)
        setSalesOrderList(res.data.data)
      })
      .catch(ErrorHandler);
  }, []);

  const getPDFReport = (so_id : string) => {
    GetReportPDF(so_id).then(res => {
      console.log("RES", res.data)
      window.open(res.data, "_blank")
    }).catch(ErrorHandler)
  }

  return {
    jobList,
    salesOrderList,
    jobDetail,
    getPDFReport
  };
};

export default JobStateFn;
