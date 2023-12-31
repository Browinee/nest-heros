import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useCallback, useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { HeadPicUpload } from "./HeadPicUpload";
import { getUserInfo, updateInfo, updateUserInfoCaptcha } from "../../api";

export interface UserInfo {
  username: string;
  headPic: string;
  nickName: string;
  email: string;
  captcha: string;
}

const layout1 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export function InfoModify() {
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = useCallback(async (values: UserInfo) => {
    const res = await updateInfo(values);

    if (res.status === 201 || res.status === 200) {
      const { message: msg, data } = res.data;
      if (msg === "success") {
        message.success("Update user info successfully");
      } else {
        message.error(data);
      }
    } else {
      message.error("try later");
    }
  }, []);

  const sendCaptcha = useCallback(async function () {
    const res = await updateUserInfoCaptcha();
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
        form.setFieldValue("headPic", data.headPic);
        form.setFieldValue("nickName", data.nickName);
        form.setFieldValue("email", data.email);
      }
    }
    query();
  }, []);

  return (
    <div id="updateInfo-container">
      <Form
        form={form}
        {...layout1}
        onFinish={onFinish}
        colon={false}
        autoComplete="off"
      >
        <Form.Item
          label="headPic"
          name="headPic"
          rules={[{ required: true, message: "Please enter headPic!" }]}
          shouldUpdate
        >
          <HeadPicUpload></HeadPicUpload>
        </Form.Item>

        <Form.Item
          label="nickName"
          name="nickName"
          rules={[{ required: true, message: "Please enter nickName!" }]}
        >
          <Input />
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
            rules={[{ required: true, message: "Please enter email!" }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" onClick={sendCaptcha}>
            Send email
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
