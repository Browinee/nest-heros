import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
  const navigator = useNavigate();
  const handleMenuItemClick = (info: any) => {
    let path = "";
    switch (info.key) {
      case "1":
        path = "/meeting_room_manage";
        break;
      case "2":
        path = "/booking_manage";
        break;
      case "3":
        path = "/user_manage";
        break;
      case "4":
        path = "/statistics";
        break;
    }
    navigator(path);
  };
  const location = useLocation();
  const getSelectedKeys = () => {
    if (location.pathname === "/user_manage") {
      return ["3"];
    } else if (location.pathname === "/booking_manage") {
      return ["2"];
    } else if (location.pathname === "/meeting_room_manage") {
      return ["1"];
    } else if (location.pathname === "/statistics") {
      return ["4"];
    } else {
      return ["1"];
    }
  };
  return (
    <div id="menu-container">
      <div className="menu-area">
        <AntdMenu
          onClick={handleMenuItemClick}
          defaultSelectedKeys={getSelectedKeys()}
          items={items}
        />
      </div>
      <div className="content-area">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
