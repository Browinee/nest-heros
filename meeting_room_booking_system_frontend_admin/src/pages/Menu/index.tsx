import { Outlet } from "react-router-dom";
import { Menu as AntdMenu, MenuProps } from "antd";
import "./index.css";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Meeting Room Management",
  },
  {
    key: "2",
    label: "Booking Management",
  },
  {
    key: "3",
    label: "User Management",
  },
  {
    key: "4",
    label: "Statistic",
  },
];

export function Menu() {
  return (
    <div id="menu-container">
      <div className="menu-area">
        <AntdMenu defaultSelectedKeys={["3"]} items={items} />
      </div>
      <div className="content-area">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
