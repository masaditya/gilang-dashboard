import { AxiosError, AxiosResponse } from 'axios';
import {
  GetToken,
  GetTokenAdmin,
  SetToken,
  SetTokenAdmin,
} from 'internal/base/auth/token';
import { Login } from 'internal/user/api';
import { UserInfoType } from 'internal/user/type';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const LoginPage: NextPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (GetTokenAdmin() !== '') router.push('/admin');
      if (GetToken() !== '') router.push('/');
    }
  }, []);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    Login(email, password)
      .then(
        (res: AxiosResponse<{ access_token: string; user: UserInfoType }>) => {
          if (res.data.user.role === 'ADMIN') {
            SetTokenAdmin(res.data.access_token);
            SetToken(res.data.access_token);
            router.push('/admin');
          }
          if (res.data.user.role === 'USER') {
            SetToken(res.data.access_token);
            router.push('/');
          }
        }
      )
      .catch((err: AxiosError) => alert(err.message));
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" type="text" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginPage;
