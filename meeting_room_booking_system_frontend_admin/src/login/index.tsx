import { Button, Checkbox, Form, Input, message } from "antd";
import "./login.css";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

interface LoginUser {
  username: string;
  password: string;
}

const layout1 = {
  labelCol: { span: 8 },
  wrapperCol: { span: 20 },
};

export function Login() {
  const navigate = useNavigate();

  const onFinish = useCallback(async (values: LoginUser) => {
    const res = await login(values.username, values.password);

    const { code, message: msg, data } = res.data;
    if (res.status === 201 || res.status === 200) {
      message.success("登录成功");

      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("refresh_token", data.refreshToken);
      localStorage.setItem("user_info", JSON.stringify(data.userInfo));

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      message.error(data || "try later");
    }
  }, []);

  return (
    <div id="login-container">
      <h1>Meeting room booking system</h1>
      <Form {...layout1} onFinish={onFinish} colon={false} autoComplete="off">
        <Form.Item
          label="username"
          name="username"
          rules={[{ required: true, message: "Please enter username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: "Please enter password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label=" ">
          <Button className="btn" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
