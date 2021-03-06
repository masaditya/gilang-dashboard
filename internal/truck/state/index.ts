import { Form, notification } from "antd";
import { TablePaginationConfig } from "antd/es/table";
import { GetUser } from "internal/user/api";
import { UserInfoType } from "internal/user/type";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ErrorHandler } from "utils/errorHandler";
import {
  AddTruck,
  AssignUsersTruck,
  DeleteTruck,
  GetTruck,
  GetTruckByID,
  UpdateTruck,
} from "../api";
import { TruckType } from "../type";

const TruckStateFn = (userInfo?: UserInfoType, id_truck?: string) => {
  const router = useRouter();
  const [truckList, setTruckList] = useState<TruckType[]>([]);
  const [truckDetail, setTruckDetail] = useState<TruckType>();
  const [userList, setUserList] = useState<UserInfoType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [formAssignUser] = Form.useForm();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    GetUser()
      .then((resUser) => setUserList(resUser.data.data))
      .catch(ErrorHandler);
  }, []);

  useEffect(() => {
    setLoading(true)
    GetTruck(pagination.current, pagination.pageSize)
      .then((res) => {
        setTruckList(res.data.data);
        setPagination({
          total: res.data.meta.totalItems,
          current: res.data.meta.currentPage,
          pageSize: res.data.meta.itemsPerPage,
        });
        setLoading(false)
      })
      .catch(ErrorHandler);
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination({
      ...newPagination,
    });
  };

  useEffect(() => {
    if (id_truck) {
      GetTruckByID(id_truck)
        .then((res) => {
          setTruckDetail(res.data);
          form.setFieldsValue(res.data);
          formAssignUser.setFieldsValue({
            users: res.data.users.map((item: any) => item.id),
          });
        })
        .catch(ErrorHandler);
    }
  }, [id_truck]);

  const handleCreateTruck = async () => {
    form.validateFields().then((values) => {
      if (id_truck) {
        // Update Truck
        console.log(values);
        UpdateTruck(id_truck, {
          ...values,
          users: values.users.map((item: any) => item.id),
        })
          .then((res) => {
            notification.success({ message: "Success Update Truck" });
            setIsUpdate(false);
          })
          .catch(ErrorHandler);
      } else {
        AddTruck({ ...values, users: [values.users] })
          .then((res) => {
            notification.success({ message: "Success Create Truck" });
            setIsModalVisible(false);
            GetTruck()
              .then((resTruck) => setTruckList(resTruck.data.data))
              .catch(ErrorHandler);
          })
          .catch(ErrorHandler);
      }
    });
  };

  const handleAssignUser = () => {
    formAssignUser.validateFields().then((values) => {
      id_truck &&
        AssignUsersTruck(id_truck, values.users)
          .then((res) => {
            setTruckDetail(res.data);
            notification.success({ message: "Success Assign User" });
            setIsModalVisible(false);
          })
          .catch(ErrorHandler);
    });
  };

  const handleDeleteTruck = () => {
    id_truck &&
      DeleteTruck(id_truck)
        .then((res) => {
          router
            .push("/truck")
            .then(() =>
              notification.success({ message: "Success Delete Truck" })
            );
        })
        .catch(ErrorHandler);
  };

  return {
    truckList,
    form,
    isModalVisible,
    setIsModalVisible,
    handleCreateTruck,
    userList,
    truckDetail,
    isUpdate,
    setIsUpdate,
    formAssignUser,
    handleAssignUser,
    handleDeleteTruck,
    handleTableChange,
    loading,
    pagination
  };
};

export default TruckStateFn;
