import { InboxOutlined } from "@ant-design/icons";
import { message } from "antd";
import Dragger, { DraggerProps } from "antd/es/upload/Dragger";

interface HeadPicUploadProps {
  value?: string;
  onChange?: Function;
}

const props: DraggerProps = {
  name: "file",
  action: "http://localhost:3009/user/upload",
  onChange(info) {
    const { status } = info.file;
    if (status === "done") {
      onChange(info.file.response.data);
      message.success(`${info.file.name} upload successfully`);
    } else if (status === "error") {
      message.error(`${info.file.name} fail to upload`);
    }
  },
};

const dragger = (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">click or drag file here to upload</p>
  </Dragger>
);
let onChange: Function;

export function HeadPicUpload(props: HeadPicUploadProps) {
  onChange = props.onChange || (() => {});

  return props?.value ? (
    <div>
      <img
        src={"http://localhost:3009/" + props.value}
        alt="avatar"
        width="100"
        height="100"
      />
      {dragger}
    </div>
  ) : (
    <div>{dragger}</div>
  );
}
