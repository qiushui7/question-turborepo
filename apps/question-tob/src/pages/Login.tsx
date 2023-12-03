import React, { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Space,
  Typography,
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from "../router";
import { useRequest } from "ahooks";
import { loginService } from "../services/user";
import { setToken } from "../utils/user-token";

const { Title } = Typography;

const USERNAME_KEY = "USERNAME";
const PASSWORD_KEY = "PASSWORD";

const rememberUser = (username: string, password: string) => {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
};

const deleteUserFromStorage = () => {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
};

const getUserFromStorage = () => {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
};

const Login: FC = (props: Props) => {
  const nav = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    const { username, password } = getUserFromStorage();
    form.setFieldsValue({ username, password });
  }, []);

  const { run } = useRequest(
    async (username, password) => {
      const data = await loginService(username, password);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { token } = result;
        setToken(token);
        message.success("登录成功");
        nav(MANAGE_INDEX_PATHNAME);
      },
    },
  );
  const onFinish = (val: any) => {
    console.log(val);
    const { username, password, remember } = val;
    run(username, password);
    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUserFromStorage();
    }
  };
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label={"用户名"}
            name={"username"}
            rules={[
              { required: true, message: "请输入用户名" },
              {
                type: "string",
                min: 5,
                max: 20,
                message: "字符长度在5-20之间",
              },
              { pattern: /^\w+$/, message: "只能是字母数字下划线" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"密码"}
            name={"password"}
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name={"remember"}
            valuePropName={"checked"}
            wrapperCol={{ offset: 6, span: 16 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type={"primary"} htmlType={"submit"}>
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

type Props = {};

export default Login;
