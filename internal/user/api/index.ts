import { AxiosResponse } from 'axios';
import { HTTPClientAuth, HTTPClientNonAuth } from '../../base/http';
import * as Token from 'internal/base/auth/token';

export const Login = (email:string, password:string): Promise<AxiosResponse> => {
  return HTTPClientNonAuth().post('/auth/login', {email, password});
};

export const WhoAmI = (): Promise<AxiosResponse> => {
    return HTTPClientAuth(Token).get('/user/me');
};



