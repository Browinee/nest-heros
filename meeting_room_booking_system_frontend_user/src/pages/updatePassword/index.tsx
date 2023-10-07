import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import "./update_password.css";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

export interface UpdatePassword {
  email: string;
  captcha: string;
  password: string;
  confirmPassword: string;
}
const layout1 = {
  labelCol: { span: 8 },
  wrapperCol: { span: 18 },
};

const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

export function UpdatePassword() {
  const [form] = useForm();
  const navigate = useNavigate();
  const onFinish = useCallback(async (values: UpdatePassword) => {
    console.log(values);
  }, []);
  const sendCaptcha = useCallback(async function () {
    console.log("send captcha");
  }, []);
  return (
    <div id="updatePassword-container">
      <h1>meeting room booking system</h1>
      <Form
        form={form}
        {...layout1}
        onFinish={onFinish}
        colon={false}
        autoComplete="off"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[
            { required: true, message: "Please enter email!" },
            { type: "email", message: "Please enter valid email!" },
          ]}
        >
          <Input />
        </Form.Item>

        <div className="captcha-wrapper">
          <Form.Item
            label="captcha"
            name="captcha"
            rules={[{ required: true, message: "Please enter captcha!" }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" onClick={sendCaptcha}>
            Send Captcha
          </Button>
        </div>

        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="confirmPassword"
          name="confirmPassword"
          rules={[{ required: true, message: "Please enter confirmPassword!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...layout1} label=" ">
          <Button className="btn" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
