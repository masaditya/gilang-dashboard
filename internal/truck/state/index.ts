import { Form, notification } from "antd";
import { GetUser } from "internal/user/api";
import { UserInfoType } from "internal/user/type";
import React, { useEffect, useState } from "react";
import { ErrorHandler } from "utils/errorHandler";
import { AddTruck, GetTruck } from "../api";
import { TruckType } from "../type";

const TruckStateFn = () => {
  const [truckList, setTruckList] = useState<TruckType[]>([]);
  const [userList, setUserList] = useState<UserInfoType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    Promise.all([GetTruck(), GetUser()])
      .then(([resTruck, resUser]) => {
        setTruckList(resTruck.data.data);
        setUserList(resUser.data.data);
      })
      .catch(ErrorHandler);
  }, []);

  const handleCreateTruck = () => {
    form.validateFields().then((values) => {
      console.log(values);
      AddTruck({...values, users : [values.users]})
        .then((res) => {
          notification.success({ message: "Success Create Truck" });
          setIsModalVisible(false)
        })
        .catch(ErrorHandler);
    });
  };

  return {
    truckList,
    form,
    isModalVisible,
    setIsModalVisible,
    handleCreateTruck,
    userList,
  };
};

export default TruckStateFn;
