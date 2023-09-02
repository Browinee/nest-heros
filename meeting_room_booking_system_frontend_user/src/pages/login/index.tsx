import { Button, Checkbox, Form, Input } from "antd";
import "./login.css";
import { useCallback } from "react";

interface LoginUser {
  username: string;
  password: string;
}

const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

export function Login() {
  const onFinish = useCallback((values: LoginUser) => {
    console.log(values);
  }, []);
  return (
    <div id="login-container">
      <h1>meeting room booking systems</h1>
      <Form {...layout1} onFinish={onFinish} colon={false} autoComplete="off">
        <Form.Item
          label="username"
          name="username"
          rules={[{ required: true, message: "Please enter username." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: "Please enter password." }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...layout2}>
          <div className="links">
            <a href="">create account</a>
            <a href="">forget password</a>
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
