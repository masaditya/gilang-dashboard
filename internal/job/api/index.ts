import { AxiosResponse } from 'axios';
import { HTTPClientAuth } from 'internal/base/http';
import * as Token from 'internal/base/auth/token';
import { ItemType, ProcessJobType, SalesOrderType } from '../type';

export const FindPO = (): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).get('/job/find-po');
};

export const GetJob = (page? : number, limit? : number): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).get(`/job?page=${page}&limit=${limit}`);
};

export const GetJobHistory = (): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).get('/job/myhistory');
};

export const GetJobByID = (id: string): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).get('/job/' + id);
};

export const GetReportPDF = (so_id: string): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).get('/job/report-pdf/' + so_id);
};

export const GetJobDetail = (id: string): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).get('/job/detail/' + id);
};

export const UploadJobImage = (data: FormData): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).post('/job/upload-image', data);
};

export const ProcessJob = (
  so_id: string,
  data: ProcessJobType
): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).post('/job/process/' + so_id, data);
};

export const UpdateJobDetail = (
  id: string,
  data: ItemType
): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).patch('/job/detail/' + id, data);
};

export const CompleteJobSO = (so_id : string): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).patch('/job/detail/' + so_id);
};
