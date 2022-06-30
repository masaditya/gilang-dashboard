import { AxiosResponse } from 'axios';
import {
  HTTPClientAuth,
  HTTPClientAuthAdmin,
  HTTPClientNonAuth,
} from 'internal/base/http';
import * as Token from 'internal/base/auth/token';
import { QueryStringUser, UserInfoType } from '../type';
import { ObjectToQueryString } from 'utils/queryString';

export const Login = (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  return HTTPClientNonAuth().post('/auth/login', { email, password });
};

export const WhoAmI = (): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).get('/user/me');
};

export const GetUser = (params?: QueryStringUser): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).get(
    '/user?' + ObjectToQueryString(params || {})
  );
};

export const GetUserByID = (id: string): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).get('/user/' + id);
};

export const GetUserByEmail = (email: string): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).get('/user/find-by-email/' + email);
};

export const ResetPasswordUser = (id: string): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).get('/user/reset-password/' + id);
};

export const UpdateUser = (
  data: UserInfoType,
  id: string
): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).patch('/user/' + id, data);
};

// Admins

export const AddUser = (data: UserInfoType): Promise<AxiosResponse> => {
  return HTTPClientAuthAdmin(Token).post('/user', data);
};

export const HardResetPasswordUser = (id: string): Promise<AxiosResponse> => {
  return HTTPClientAuthAdmin(Token).patch(
    '/user/hard-reset-password/' + id,
    {}
  );
};

export const ActivateUser = (id: string): Promise<AxiosResponse> => {
  return HTTPClientAuthAdmin(Token).patch('/user/activate/' + id, {});
};

export const DeactivateUser = (id: string): Promise<AxiosResponse> => {
  return HTTPClientAuthAdmin(Token).patch('/user/deactivate/' + id, {});
};
