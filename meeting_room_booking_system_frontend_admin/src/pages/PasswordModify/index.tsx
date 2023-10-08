import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import "./index.css";
import { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo, updatePasswordCaptcha } from "../../api";

export interface UpdatePassword {
  email: string;
  captcha: string;
  password: string;
  confirmPassword: string;
}

const layout1 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

export function PasswordModify() {
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = useCallback(async (values: UpdatePassword) => {
    if (values.password !== values.confirmPassword) {
      return message.error("两次密码不一致");
    }

    const res = await updatePassword({
      ...values,
      username: form.getFieldValue("username"),
    });

    const { message: msg, data } = res.data;

    if (res.status === 201 || res.status === 200) {
      message.success("Update password successfully.");
    } else {
      message.error(data || "try later");
    }
  }, []);

  const sendCaptcha = useCallback(async function () {
    const address = form.getFieldValue("email");
    if (!address) {
      return message.error("email is empty");
    }

    const res = await updatePasswordCaptcha(address);
    if (res.status === 201 || res.status === 200) {
      message.success(res.data.data);
    } else {
      message.error("try later");
    }
  }, []);

  useEffect(() => {
    async function query() {
      const res = await getUserInfo();

      const { data } = res.data;

      if (res.status === 201 || res.status === 200) {
        form.setFieldValue("username", data.username);
        form.setFieldValue("email", data.email);
      }
    }
    query();
  }, []);
  return (
    <div id="updatePassword-container">
      <Form
        form={form}
        {...layout1}
        onFinish={onFinish}
        colon={false}
        autoComplete="off"
      >
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
          rules={[{ required: true, message: "Please enter confirmPassword!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="email"
          name="email"
          rules={[
            { required: true, message: "Please enter email!" },
            { type: "email", message: "Please enter valid email!" },
          ]}
        >
          <Input disabled />
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
            Send captcha
          </Button>
        </div>

        <Form.Item {...layout1} label=" ">
          <Button className="btn" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
