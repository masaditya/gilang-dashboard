import { Form, notification } from "antd";
import { TablePaginationConfig } from "antd/es/table";
import React, { useState } from "react";
import { ErrorHandler } from "utils/errorHandler";
import {
  ActivateUser,
  AddUser,
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

  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });

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
    setLoading(true);
    GetUser({page : pagination.current, limit : pagination.pageSize}).then((res) => {
      setUserList(res.data.data);
      setPagination({
        total: res.data.meta.totalItems,
        current: res.data.meta.currentPage,
        pageSize: res.data.meta.itemsPerPage,
      });
      setLoading(false);
    });
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination({
      ...newPagination,
    });
  };

  const handleFinishSave = (values: any) => {
    setLoading(true);
    if (id_user)
      UpdateUser(values, id_user?.toString())
        .then((res) => {
          notification.success({
            message: "Success Update Profile Info",
          });
          setIsUpdate(!isUpdate);
        })
        .catch(ErrorHandler);
    else
      form.validateFields().then((values) => {
        AddUser(values).then((res) => {
          notification.success({
            message: "Success Create User",
          });
          GetUser().then((result) => {
            setIsModalVisible(false);
            setUserList(result.data.data);
            setLoading(false);
          });
        });
      });
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
          notification.success({ message: "Success Activate User" });
          GetUserByID(id_user.toString()).then((res) => {
            setUserDetail(res.data);
          });
        })
        .catch(ErrorHandler);
  };

  const handleDeactivate = () => {
    id_user &&
      DeactivateUser(id_user.toString())
        .then((res) => {
          notification.success({ message: "Success Deactivate User" });
          GetUserByID(id_user.toString()).then((res) => {
            setUserDetail(res.data);
          });
        })
        .catch(ErrorHandler);
  };

  const handleHardResetPassword = () => {
    id_user &&
      formResetPassword.validateFields().then((values: any) => {
        HardResetPasswordUser(id_user.toString(), values)
          .then((res) => {
            notification.success({ message: "Success Reset Password User" });
            setIsModalVisible(false)
            GetUserByID(id_user.toString()).then((res) => {
              setUserDetail(res.data);
            });
          })
          .catch(ErrorHandler);
      });
  };

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
    loading,
    pagination,
    handleTableChange
  };
};

export default UserStateFn;
