import { AxiosResponse } from 'axios';
import { HTTPClientAuth } from 'internal/base/http';
import * as Token from 'internal/base/auth/token';

export const GetOverview = (): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).get('/report/overview');
};
