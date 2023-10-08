import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import { ErrorPage } from "./error";
import { UserManage } from "./pages/UserManage";
import { Login } from "./pages/Login";
import { Menu } from "./pages/Menu";
import { ModifyMenu } from "./pages/ModifyMenu";
import { InfoModify } from "./pages/InfoModify";
import { PasswordModify } from "./pages/PasswordModify";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    // NOTE: 這裡試試看三級路由方式
    //一般來說用二級路由就可
    children: [
      {
        path: "/",
        element: <Menu />,
        children: [
          {
            path: "user_manage",
            element: <UserManage />,
          },
        ],
      },
      {
        path: "/user",
        element: <ModifyMenu />,
        children: [
          {
            path: "info_modify",
            element: <InfoModify />,
          },
          {
            path: "password_modify",
            element: <PasswordModify />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
];
export const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);
