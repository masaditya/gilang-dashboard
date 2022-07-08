import { AxiosResponse } from "axios";
import { GetToken, GetTokenAdmin } from "internal/base/auth/token";
import { WhoAmI } from "internal/user/api";
import { UserInfoType } from "internal/user/type";
import { useRouter } from "next/router";
import React from "react";

const authStateFn = () => {
  const [userInfo, setUserInfo] = React.useState<UserInfoType>();
  const router = useRouter();
  React.useEffect(() => {
    if (GetToken() === "" && GetTokenAdmin() === "") router.push("/login");
    else
      WhoAmI().then((res: AxiosResponse<UserInfoType>) => {
        setUserInfo(res.data);
      });
  }, []);

  return {
    userInfo,
  };
};

export default authStateFn;
