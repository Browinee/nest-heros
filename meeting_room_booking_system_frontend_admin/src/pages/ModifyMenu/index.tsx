import { Outlet, useLocation, useNavigate, useRoutes } from "react-router-dom";
import { Menu as AntdMenu, MenuProps } from "antd";
import "./index.css";
import { useCallback, useMemo } from "react";
const items: MenuProps["items"] = [
  {
    key: "1",
    label: "user info ",
  },
  {
    key: "2",
    label: "password",
  },
];

export function ModifyMenu() {
  const navigate = useNavigate();
  const handleMenuItemClick = (info: any) => {
    if (info.key === "1") {
      navigate("/user/info_modify");
    } else {
      navigate("/user/password_modify");
    }
  };
  const location = useLocation();
  const defaultSelectedKeys = useMemo(() => {
    return location.pathname === "/user/info_modify" ? ["1"] : ["2"];
  }, [location]);
  return (
    <div id="menu-container">
      <div className="menu-area">
        <AntdMenu
          onClick={handleMenuItemClick}
          defaultSelectedKeys={defaultSelectedKeys}
          items={items}
        />
      </div>
      <div className="content-area">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
