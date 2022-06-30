import MainLayout from 'components/layout';
import useAuth, { PropsType } from 'internal/base/middleware/auth';
import type { NextPage } from 'next';
import {
  Button,
  Card,
  Form,
  Tag,
  Input,
  Switch,
  Radio,
  Typography,
  Empty,
  Collapse,
  Space,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { GetUser, GetUserByID } from 'internal/user/api';
import { UserInfoType } from 'internal/user/type';
import { useRouter } from 'next/router';
import UserStateFn from 'internal/user/state';
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const UserPageDetail: NextPage = (props: PropsType) => {
  const router = useRouter();
  const { userDetail } = UserStateFn(props.user, router.query?.id?.toString());
  const [isUpdate, setIsUpdate] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (userDetail) {
      console.log(userDetail);
      form.setFieldsValue(userDetail);
    }
  }, [userDetail]);

  return (
    <MainLayout title="User Detail" router={router}>
      <Card
        title="User"
        extra={
          <Space size="large">
            <Button danger type="primary">Reset Password</Button>
            <Button onClick={()=> setIsUpdate(!isUpdate)}>Edit</Button>
          </Space>
        }
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          disabled={!isUpdate}
        >
          <Form.Item label="First Name" name="first_name">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="last_name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Status" name="is_active" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="Role" name="role">
            <Radio.Group>
              <Radio value="USER">USER</Radio>
              <Radio value="ADMIN">ADMIN</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary">Save</Button>
          </Form.Item>
        </Form>

        <Typography.Paragraph strong>Trucks</Typography.Paragraph>
        {typeof userDetail?.trucks === 'undefined' && userDetail?.trucks ? (
          <Collapse accordion>
            <Collapse.Panel header="This is Collapse.panel header 1" key="1">
              <p>{'text'}</p>
            </Collapse.Panel>
            <Collapse.Panel header="This is Collapse.panel header 2" key="2">
              <p>{'text'}</p>
            </Collapse.Panel>
            <Collapse.Panel header="This is Collapse.panel header 3" key="3">
              <p>{'text'}</p>
            </Collapse.Panel>
          </Collapse>
        ) : (
          <Empty description="Data Truck Not Found" />
        )}
      </Card>
    </MainLayout>
  );
};

export default useAuth(UserPageDetail);
