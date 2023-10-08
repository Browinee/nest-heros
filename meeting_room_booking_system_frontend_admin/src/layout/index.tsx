import { UserOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import "./index.css";

export function Layout() {
  return (
    <div id="index-container">
      <div className="header">
        <h1>Meeting room booking system- Admin system</h1>
        <UserOutlined className="icon" />
      </div>
      <div className="body">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
