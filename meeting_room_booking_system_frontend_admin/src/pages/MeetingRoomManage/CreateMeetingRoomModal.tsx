import { Button, Form, Input, InputNumber, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useCallback } from "react";
import { createMeetingRoom } from "../../api";

interface CreateMeetingRoomModalProps {
  isOpen: boolean;
  handleClose: Function;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export interface CreateMeetingRoom {
  name: string;
  capacity: number;
  location: string;
  equipment: string;
  description: string;
}

export function CreateMeetingRoomModal(props: CreateMeetingRoomModalProps) {
  const [form] = useForm<CreateMeetingRoom>();

  const handleOk = useCallback(async function () {
    const values = form.getFieldsValue();

    values.description = values.description || "";
    values.equipment = values.equipment || "";

    const res = await createMeetingRoom(values);

    if (res.status === 201 || res.status === 200) {
      message.success("Create meeting room successfully");
      form.resetFields();
      props.handleClose();
    } else {
      message.error(res.data.data);
    }
  }, []);

  return (
    <Modal
      title="Create a new meeting room"
      open={props.isOpen}
      onOk={handleOk}
      onCancel={() => props.handleClose()}
      okText={"Create"}
    >
      <Form form={form} colon={false} {...layout}>
        <Form.Item
          label="name"
          name="name"
          rules={[
            { required: true, message: "Please enter meeting room name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="location"
          name="location"
          rules={[
            { required: true, message: "Please enter meeting room location!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="capacity"
          name="capacity"
          rules={[
            { required: true, message: "Please enter meeting room capacity" },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="equipment" name="equipment">
          <Input />
        </Form.Item>
        <Form.Item label="location" name="description">
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
