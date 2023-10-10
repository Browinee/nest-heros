import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu as AntdMenu, MenuProps } from "antd";
import "./index.css";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Meeting rooms list",
  },
  {
    key: "2",
    label: "Booking history",
  },
];

export function Menu() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleMenuItemClick = (info: any) => {
    let path = "";
    switch (info.key) {
      case "1":
        path = "/meeting_room_list";
        break;
      case "2":
        path = "/booking_history";
        break;
    }
    navigate(path);
  };
  function getSelectedKeys() {
    if (location.pathname === "/meeting_room_list") {
      return ["1"];
    } else if (location.pathname === "/booking_history") {
      return ["2"];
    } else {
      return ["1"];
    }
  }

  return (
    <div id="menu-container">
      <div className="menu-area">
        <AntdMenu
          defaultSelectedKeys={getSelectedKeys()}
          items={items}
          onClick={handleMenuItemClick}
        />
      </div>
      <div className="content-area">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
