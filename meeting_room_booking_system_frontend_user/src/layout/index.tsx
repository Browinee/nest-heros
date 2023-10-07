import { UserOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import "./index.css";

export function Layout() {
  return (
    <div id="index-container">
      <div className="header">
        <h1>Meeting room booking system</h1>
        <Link to={"/update_info"}>
          <UserOutlined className="icon" />
        </Link>
      </div>
      <div className="body">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
