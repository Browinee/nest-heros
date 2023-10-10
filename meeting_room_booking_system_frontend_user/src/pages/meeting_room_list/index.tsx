import { Badge, Button, Form, Input, Popconfirm, Table, message } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import "./index.css";
import { ColumnsType } from "antd/es/table";
import { useForm } from "antd/es/form/Form";
import { searchMeetingRoomList } from "../../api";

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

export function MeetingRoomList() {
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const [meetingRoomResult, setMeetingRoomResult] = useState<
    Array<MeetingRoomSearchResult>
  >([]);

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
            <Badge status="success">Available for booking</Badge>
          ),
      },
      {
        title: "Action",
        render: (_, record) => (
          <div>
            <a href="#">Book</a>
          </div>
        ),
      },
    ],
    []
  );

  const searchMeetingRoom = useCallback(async (values: SearchMeetingRoom) => {
    const res = await searchMeetingRoomList(
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
      message.error(data || "tr later");
    }
  }, []);

  const [form] = useForm();

  useEffect(() => {
    message.info("aaa");
    searchMeetingRoom({
      name: form.getFieldValue("name"),
      capacity: form.getFieldValue("capacity"),
      equipment: form.getFieldValue("equipment"),
    });
  }, [pageNo, pageSize]);

  const changePage = useCallback(function (pageNo: number, pageSize: number) {
    setPageNo(pageNo);
    setPageSize(pageSize);
  }, []);

  return (
    <div id="meetingRoomList-container">
      <div className="meetingRoomList-form">
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
          </Form.Item>
        </Form>
      </div>
      <div className="meetingRoomList-table">
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
    </div>
  );
}
