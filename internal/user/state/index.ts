import { Form, notification } from "antd";
import React, { useState } from "react";
import { ErrorHandler } from "utils/errorHandler";
import {
  ActivateUser,
  DeactivateUser,
  GetUser,
  GetUserByEmail,
  GetUserByID,
  HardResetPasswordUser,
  ResetPasswordUser,
  UpdateUser,
} from "../api";
import { UserInfoType } from "../type";

const UserStateFn = (userInfo?: UserInfoType, id_user?: string | number) => {
  const [userList, setUserList] = useState<UserInfoType[]>([]);
  const [userDetail, setUserDetail] = useState<UserInfoType>();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();
  const [formResetPassword] = Form.useForm();

  React.useEffect(() => {
    if (userDetail) {
      form.setFieldsValue(userDetail);
    }
  }, [userDetail]);

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

  const handleFinishSave = (values: any) => {
    id_user &&
      UpdateUser(values, id_user?.toString())
        .then((res) => {
          notification.success({
            message: "Success Update Profile Info",
          });
          setIsUpdate(!isUpdate);
        })
        .catch(ErrorHandler);
  };

  const handleResetPasswordUser = () => {
    formResetPassword
      .validateFields()
      .then((values) => {
        id_user &&
          ResetPasswordUser(id_user.toString(), values)
            .then((res) => {
              notification.success({ message: res.data.message });
              setIsModalVisible(false);
            })
            .catch(ErrorHandler);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleActivate = () => {
    id_user &&
      ActivateUser(id_user.toString())
        .then((res) => {
          notification.success({ message: res.data.message });
        })
        .catch(ErrorHandler);
  };

  const handleDeactivate = () => {
    id_user &&
      DeactivateUser(id_user.toString())
        .then((res) => {
          notification.success({ message: res.data.message });
        })
        .catch(ErrorHandler);
  };

  const handleHardResetPassword = () => {
    id_user &&
      HardResetPasswordUser(id_user.toString())
        .then((res) => {
          notification.success({ message: res.data.message });
        })
        .catch(ErrorHandler);
  };

  // const handleSearchByEmail = () => {
  //   GetUserByEmail("mbahban@leoxi.net").then(res => {
  //   }).catch(ErrorHandler)
  // };

  return {
    userList,
    userDetail,
    handleFinishSave,
    form,
    isUpdate,
    setIsUpdate,
    isModalVisible,
    setIsModalVisible,
    handleResetPasswordUser,
    formResetPassword,
    handleActivate,
    handleDeactivate,
    handleHardResetPassword,
  };
};

export default UserStateFn;
