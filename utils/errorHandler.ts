import { notification } from "antd";
import { AxiosError } from "axios";

export const ErrorHandler = (error: AxiosError<any>) => {
  notification.error({
    message: error.response?.data.message,
  });
};
