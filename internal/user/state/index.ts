import React, { useState } from 'react';
import { GetUser, GetUserByID } from '../api';
import { UserInfoType } from '../type';

const UserStateFn = (userInfo?: UserInfoType, id_user?: string | number) => {
  const [userList, setUserList] = useState<UserInfoType[]>([]);
  const [userDetail, setUserDetail] = useState<UserInfoType>();

  React.useEffect(() => {
    if (id_user)
      GetUserByID(id_user.toString()).then((res) => {
        setUserDetail(res.data);
      });
  }, [id_user]);

  React.useEffect(() => {
    GetUser().then((res) => {
      setUserList(res.data.data);
    });
  }, []);

  return {
    userList,
    userDetail,
  };
};

export default UserStateFn;
