import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Layout } from "./layout";
import { ErrorPage } from "./error";
import { UserManage } from "./pages/UserManage";
import { Login } from "./pages/Login";
import { Menu } from "./pages/Menu";
import { ModifyMenu } from "./pages/ModifyMenu";
import { InfoModify } from "./pages/InfoModify";
import { PasswordModify } from "./pages/PasswordModify";
import { MeetingRoomManage } from "./pages/MeetingRoomManage";
import { BookingManage } from "./pages/BookingManage";
import { Statistics } from "./pages/Statistics";

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
          { index: true, element: <Navigate to="/meeting_room_manage" /> },
          {
            path: "meeting_room_manage",
            element: <MeetingRoomManage />,
          },
          {
            path: "user_manage",
            element: <UserManage />,
          },
          {
            path: "meeting_room_manage",
            element: <MeetingRoomManage />,
          },
          {
            path: "booking_manage",
            element: <BookingManage />,
          },
          {
            path: "statistics",
            element: <Statistics />,
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
