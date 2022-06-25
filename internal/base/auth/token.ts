'use-strict';

export const GetToken = (): string => {
  return localStorage.getItem(process.env.APP_TOKEN_USER || '') || '';
};

export const SetToken = (token: string): void => {
  localStorage.setItem(process.env.APP_TOKEN_USER || '', token);
};

export const GetTokenAdmin = (): string => {
  return localStorage.getItem(process.env.APP_TOKEN_ADMIN || '') || '';
};

export const SetTokenAdmin = (token: string): void => {
  localStorage.setItem(process.env.APP_TOKEN_ADMIN || '', token);
};

export const ClearTokenUser = (): void => {
  localStorage.removeItem(process.env.APP_TOKEN_USER || '');
};

export const ClearTokenAdmin = (): void => {
  localStorage.removeItem(process.env.APP_TOKEN_ADMIN || '');
};
