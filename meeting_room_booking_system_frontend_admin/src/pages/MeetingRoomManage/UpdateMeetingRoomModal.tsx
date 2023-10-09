import { Button, Form, Input, InputNumber, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useCallback, useEffect } from "react";
import { findMeetingRoom, updateMeetingRoom } from "../../api";

interface UpdateMeetingRoomModalProps {
  id: number;
  isOpen: boolean;
  handleClose: Function;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export interface UpdateMeetingRoom {
  id: number;
  name: string;
  capacity: number;
  location: string;
  equipment: string;
  description: string;
}

export function UpdateMeetingRoomModal(props: UpdateMeetingRoomModalProps) {
  const [form] = useForm<UpdateMeetingRoom>();

  const handleOk = useCallback(async function () {
    const values = form.getFieldsValue();

    values.description = values.description || "";
    values.equipment = values.equipment || "";

    const res = await updateMeetingRoom({
      ...values,
      id: form.getFieldValue("id"),
    });

    if (res.status === 201 || res.status === 200) {
      message.success("Update successfully");
      props.handleClose();
    } else {
      message.error(res.data.data);
    }
  }, []);

  useEffect(() => {
    async function query() {
      if (!props.id) {
        return;
      }
      const res = await findMeetingRoom(props.id);

      const { data } = res;
      if (res.status === 200 || res.status === 201) {
        form.setFieldValue("id", data.data.id);
        form.setFieldValue("name", data.data.name);
        form.setFieldValue("location", data.data.location);
        form.setFieldValue("capacity", data.data.capacity);
        form.setFieldValue("equipment", data.data.equipment);
        form.setFieldValue("description", data.data.description);
      } else {
        message.error(res.data.data);
      }
    }

    query();
  }, [props.id]);

  return (
    <Modal
      title="Update meeting room"
      open={props.isOpen}
      onOk={handleOk}
      onCancel={() => props.handleClose()}
      okText={"updaea"}
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
