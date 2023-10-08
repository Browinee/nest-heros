import { Badge, Button, Form, Image, Input, Table, message } from "antd";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import "./index.css";
import { data } from "./constants";
import { freeze, userSearch } from "../../api";
import { ColumnsType } from "antd/es/table";
import { UserSearchResult } from "./types";
import { useForm } from "antd/es/form/Form";

interface SearchUser {
  username: string;
  nickName: string;
  email: string;
}

export function UserManage() {
  const [forceNum, forceUpdate] = useReducer((x) => x + 1, 0);
  async function freezeUser(id: number) {
    const res = await freeze(id);

    const { data } = res.data;
    if (res.status === 201 || res.status === 200) {
      message.success("Freeze successfully");
      forceUpdate();
    } else {
      message.error(data || "try later");
    }
  }
  const columns: ColumnsType<UserSearchResult> = useMemo(
    () => [
      {
        title: "username",
        dataIndex: "username",
      },
      {
        title: "headPic",
        dataIndex: "headPic",
        render: (value) => {
          return value ? (
            <Image width={50} src={`http://localhost:3009/${value}`} />
          ) : (
            ""
          );
        },
      },
      {
        title: "nickName",
        dataIndex: "nickName",
      },
      {
        title: "email",
        dataIndex: "email",
      },
      {
        title: "createTime",
        dataIndex: "createTime",
      },
      {
        title: "status",
        dataIndex: "isFrozen",
        render: (_, record) =>
          record.isFrozen ? <Badge status="success">Frozen</Badge> : "",
      },
      {
        title: "Action",
        render: (_, record) => (
          <a
            href="#"
            onClick={() => {
              freezeUser(record.id);
            }}
          >
            Freeze
          </a>
        ),
      },
    ],
    []
  );
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [userResult, setUserResult] = useState<UserSearchResult[]>();
  const searchUser = useCallback(async (values: SearchUser) => {
    const res = await userSearch(
      values.username,
      values.nickName,
      values.email,
      pageNo,
      pageSize
    );

    const { data } = res.data;
    if (res.status === 201 || res.status === 200) {
      setUserResult(
        data.users.map((item: UserSearchResult) => {
          return {
            key: item.username,
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
    searchUser({
      username: form.getFieldValue("username"),
      email: form.getFieldValue("email"),
      nickName: form.getFieldValue("nickName"),
    });
  }, [pageNo, pageSize, forceNum]);

  const changePage = useCallback(function (pageNo: number, pageSize: number) {
    setPageNo(pageNo);
    setPageSize(pageSize);
  }, []);
  return (
    <div id="userManage-container">
      <div className="userManage-form">
        <Form
          form={form}
          onFinish={searchUser}
          name="search"
          layout="inline"
          colon={false}
        >
          <Form.Item label="username" name="username">
            <Input />
          </Form.Item>

          <Form.Item label="nickName" name="nickName">
            <Input />
          </Form.Item>

          <Form.Item
            label="email"
            name="email"
            rules={[{ type: "email", message: "Please enter valid email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="userManage-table">
        <Table
          columns={columns}
          dataSource={userResult}
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
