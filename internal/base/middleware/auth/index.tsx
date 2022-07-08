import React from "react";
import { UserInfoType } from "internal/user/type";
import authStateFn from "./state";

export type PropsType = {
  user?: UserInfoType;
};

const Authn =
  (
    Comp: React.ComponentClass<PropsType> | React.FunctionComponent<PropsType>
  ): ((props: any) => React.ReactElement) =>
  (props: any): React.ReactElement => {
    const {userInfo} = authStateFn()
    return <Comp {...props} user={userInfo} />;
  };

export default Authn;
