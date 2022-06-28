import { AxiosResponse } from 'axios';
import { HTTPClientAuth } from 'internal/base/http';
import * as Token from 'internal/base/auth/token';
import { TruckType } from '../type';

export const AddTruck = (data: TruckType): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).post('/truck', data);
};

export const GetTruck = (): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).get('/truck');
};

export const AssignUsersTruck = (id: string, users : number[]): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).post('/truck/assign-users/' + id, { users });
};

export const GetTruckByID = (id: string): Promise<AxiosResponse> => {
  return HTTPClientAuth(Token).get('/truck/' + id);
};

export const UpdateTruck = (id: string): Promise<AxiosResponse> => {
    return HTTPClientAuth(Token).patch('/truck/' + id, {});
};

export const DeleteTruck = (id: string): Promise<AxiosResponse> => {
    return HTTPClientAuth(Token).delete('/truck/' + id);
};
