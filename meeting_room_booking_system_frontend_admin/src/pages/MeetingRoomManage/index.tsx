import {
  Badge,
  Button,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Table,
  message,
} from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import "./index.css";
import { ColumnsType } from "antd/es/table";
import { useForm } from "antd/es/form/Form";
import { deleteMeetingRoom, meetingRoomList } from "../../api";
import { CreateMeetingRoomModal } from "./CreateMeetingRoomModal";
import { UpdateMeetingRoomModal } from "./UpdateMeetingRoomModal";

interface SearchMeetingRoom {
  name: string;
  capacity: number;
  equipment: string;
}

interface MeetingRoomSearchResult {
  id: number;
  name: string;
  capacity: number;
  location: string;
  equipment: string;
  description: string;
  isBooked: boolean;
  createTime: Date;
  updateTime: Date;
}

export function MeetingRoomManage() {
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [meetingRoomResult, setMeetingRoomResult] = useState<
    Array<MeetingRoomSearchResult>
  >([]);
  const [num, setNum] = useState<number>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateId, setUpdateId] = useState<number>();

  const columns: ColumnsType<MeetingRoomSearchResult> = useMemo(
    () => [
      {
        title: "name",
        dataIndex: "name",
      },
      {
        title: "capacity",
        dataIndex: "capacity",
      },
      {
        title: "location",
        dataIndex: "location",
      },
      {
        title: "equipment",
        dataIndex: "equipment",
      },
      {
        title: "description",
        dataIndex: "description",
      },
      {
        title: "createTime",
        dataIndex: "createTime",
      },
      {
        title: "updateTime",
        dataIndex: "updateTime",
      },
      {
        title: "status",
        dataIndex: "isBooked",
        render: (_, record) =>
          record.isBooked ? (
            <Badge status="error">Booked</Badge>
          ) : (
            <Badge status="success">Available for booking </Badge>
          ),
      },
      {
        title: "Action",
        render: (_, record) => (
          <div>
            <Popconfirm
              title="Delete meeting room"
              description="Are you sure to delete this meeting room?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">delete</a>
            </Popconfirm>
            <br />
            <a
              href="#"
              onClick={() => {
                setIsUpdateModalOpen(true);
                setUpdateId(record.id);
              }}
            >
              update
            </a>
          </div>
        ),
      },
    ],
    []
  );

  const handleDelete = useCallback(async (id: number) => {
    try {
      await deleteMeetingRoom(id);
      message.success("Delete successfully");
      setNum(Math.random());
    } catch (e) {
      console.log(e);
      message.error("Fail to delete");
    }
  }, []);

  const searchMeetingRoom = useCallback(async (values: SearchMeetingRoom) => {
    const res = await meetingRoomList(
      values.name,
      values.capacity,
      values.equipment,
      pageNo,
      pageSize
    );

    const { data } = res.data;
    if (res.status === 201 || res.status === 200) {
      setMeetingRoomResult(
        data.meetingRooms.map((item: MeetingRoomSearchResult) => {
          return {
            key: item.id,
            ...item,
          };
        })
      );
    } else {
      message.error(data || "try later");
    }
  }, []);

  const [form] = useForm();

  useEffect(() => {
    searchMeetingRoom({
      name: form.getFieldValue("name"),
      capacity: form.getFieldValue("capacity"),
      equipment: form.getFieldValue("equipment"),
    });
  }, [pageNo, pageSize, num]);

  const changePage = useCallback(function (pageNo: number, pageSize: number) {
    setPageNo(pageNo);
    setPageSize(pageSize);
  }, []);

  return (
    <div id="meetingRoomManage-container">
      <div className="meetingRoomManage-form">
        <Form
          form={form}
          onFinish={searchMeetingRoom}
          name="search"
          layout="inline"
          colon={false}
        >
          <Form.Item label="name" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="capacity" name="capacity">
            <Input />
          </Form.Item>

          <Form.Item label="equipment" name="equipment">
            <Input />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              submit
            </Button>
            <Button
              type="primary"
              style={{ background: "green" }}
              onClick={() => setIsCreateModalOpen(true)}
            >
              add
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="meetingRoomManage-table">
        <Table
          columns={columns}
          dataSource={meetingRoomResult}
          pagination={{
            current: pageNo,
            pageSize: pageSize,
            onChange: changePage,
          }}
        />
      </div>
      <CreateMeetingRoomModal
        isOpen={isCreateModalOpen}
        handleClose={() => {
          setIsCreateModalOpen(false);
        }}
      ></CreateMeetingRoomModal>
      <UpdateMeetingRoomModal
        id={updateId!}
        isOpen={isUpdateModalOpen}
        handleClose={() => {
          setIsUpdateModalOpen(false);
          setNum(Math.random());
        }}
      ></UpdateMeetingRoomModal>
    </div>
  );
}
