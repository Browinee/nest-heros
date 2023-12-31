import { Button, Checkbox, Form, Input, message } from "antd";
import "./login.css";
import { useCallback } from "react";
import { login } from "../../api";
import { Link, useNavigate } from "react-router-dom";

interface LoginUser {
  username: string;
  password: string;
}

const layout1 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 20 },
};

const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

export function Login() {
  const navigate = useNavigate();

  const onFinish = async (values: LoginUser) => {
    const res = await login(values.username, values.password);

    const { code, message: msg, data } = res.data;
    if (code === 201 || code === 200) {
      message.success("Login successfully.");

      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("refresh_token", data.refreshToken);
      localStorage.setItem("user_info", JSON.stringify(data.userInfo));
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      message.error(data || "System is busy. Try later");
    }
  };

  return (
    <div id="login-container">
      <h1>meeting room booking systems</h1>
      <Form {...layout1} onFinish={onFinish} colon={false} autoComplete="off">
        <Form.Item
          label="username"
          name="username"
          rules={[{ required: true, message: "Please enter username." }]}
        >
          <Input placeholder="justin" />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: "Please enter password." }]}
        >
          <Input.Password placeholder="justin1234567" />
        </Form.Item>

        <Form.Item {...layout2}>
          <div className="links">
            <Link to="/register">create account</Link>
            <Link to="/update_password">forget password</Link>
          </div>
        </Form.Item>

        <Form.Item {...layout2}>
          <Button className="btn" type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
