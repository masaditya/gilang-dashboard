import { useRouter } from 'next/router';
import React from 'react';
import { GetToken, GetTokenAdmin } from 'internal/base/auth/token';
import { WhoAmI } from 'internal/user/api';
import { AxiosResponse } from 'axios';
import { UserInfoType } from 'internal/user/type';

export type PropsType = {
  user?: UserInfoType;
};

const useAuthAdmin =
  (
    Comp: React.ComponentClass<PropsType> | React.FunctionComponent<PropsType>
  ): ((props: any) => React.ReactElement) =>
  (props: any): React.ReactElement => {
    const [userInfo, setUserInfo] = React.useState<UserInfoType>();
    const router = useRouter();
    React.useEffect(() => {
      if (GetTokenAdmin() === '') router.push('/login');
      else
        WhoAmI().then((res: AxiosResponse<UserInfoType>) => {
          setUserInfo(res.data);
        });
    }, []);

    return <Comp {...props} user={userInfo} />;
  };

export default useAuthAdmin;
