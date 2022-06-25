import axios from 'axios';
import { FindAPIBaseURL } from '../config';

type Options = {
  Timeout: number;
};

interface Token {
  GetToken(): string;
  GetTokenAdmin() : string
}

export const HTTPClientAuth = (
  token: Token,
  opts: Options = { Timeout: 10000 }
) => {
  const client = axios.create({
    baseURL: FindAPIBaseURL(),
    headers: {
      Authorization: `Bearer ${token.GetToken()}`,
      Accept: 'application/json',
    },
    timeout: opts.Timeout,
  });

  return client;
};

export const HTTPClientAuthAdmin = (
  token: Token,
  opts: Options = { Timeout: 10000 }
) => {
  const client = axios.create({
    baseURL: FindAPIBaseURL(),
    headers: {
      Authorization: `Bearer ${token.GetTokenAdmin()}`,
      Accept: 'application/json',
    },
    timeout: opts.Timeout,
  });

  return client;
};

export const HTTPClientNonAuth = (opts: Options = { Timeout: 10000 }) => {
  const client = axios.create({
    baseURL: FindAPIBaseURL(),
    headers: {
      Accept: 'application/json',
    },
    timeout: opts.Timeout,
  });

  return client;
};
