import { UserOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import "./index.css";

export function Layout() {
  return (
    <div id="index-container">
      <div className="header">
        <Link to="/" className="sys_name">
          <h1>Meeting room booking system- Admin system</h1>
        </Link>
        <Link to="/user/info_modify">
          <UserOutlined className="icon" />
        </Link>
      </div>
      <div className="body">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
