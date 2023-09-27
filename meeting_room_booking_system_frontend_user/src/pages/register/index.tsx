import { Button, Form, Input, message } from "antd";
import "./index.css";
import { register, registerCaptcha } from "../../api";
import { useForm } from "antd/es/form/Form";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

export interface RegisterUser {
  username: string;
  nickName: string;
  password: string;
  confirmPassword: string;
  email: string;
  captcha: string;
}

const layout1 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

export function Register() {
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = useCallback(async (values: RegisterUser) => {
    if (values.password !== values.confirmPassword) {
      return message.error("Password and confirm password are not the same.");
    }
    const res = await register(values);

    if (res.status === 201 || res.status === 200) {
      message.success("register successfully.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      message.error(res.data.data || "System is busy. Try later");
    }
  }, []);

  const sendCaptcha = useCallback(async function () {
    const address = form.getFieldValue("email");
    if (!address) {
      return message.error("Please enter email");
    }

    const res = await registerCaptcha(address);
    if (res.status === 201 || res.status === 200) {
      message.success(res.data.data);
    } else {
      message.error(res.data.data || "System is busy. Try later");
    }
  }, []);

  return (
    <div id="register-container">
      <h1>Meeting room booking system - Register Account</h1>
      <Form
        form={form}
        {...layout1}
        onFinish={onFinish}
        colon={false}
        autoComplete="off"
      >
        <Form.Item
          label="username"
          name="username"
          rules={[{ required: true, message: "Please enter username." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="nickName"
          name="nickName"
          rules={[{ required: true, message: "Please enter nickName" }]}
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

        <Form.Item
          label="confirmPassword"
          name="confirmPassword"
          rules={[{ required: true, message: "Please enter confirmPassword." }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="email"
          name="email"
          rules={[
            { required: true, message: "Please enter email." },
            { type: "email", message: "Please enter valid email." },
          ]}
        >
          <Input />
        </Form.Item>

        <div className="captcha-wrapper">
          <Form.Item
            label="verification code"
            name="captcha"
            rules={[
              { required: true, message: "Please enter verification code." },
            ]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" onClick={sendCaptcha}>
            Send captcha
          </Button>
        </div>

        <Form.Item {...layout2}>
          <div className="links">
            Already has account? Go to <Link to="/login">Login</Link>
          </div>
        </Form.Item>

        <Form.Item {...layout1} label=" ">
          <Button className="btn" type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
