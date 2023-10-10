import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { UpdatePassword } from "./pages/updatePassword";
import { ErrorPage } from "./pages/error";
import { Layout } from "./layout";
import { UpdateInfo } from "./pages/updateInfo";
import { Menu } from "./pages/menu";
import { MeetingRoomList } from "./pages/meeting_room_list";
import { BookingHistory } from "./pages/booking_history";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "update_info",
        element: <UpdateInfo />,
      },
      {
        path: "/",
        element: <Menu />,
        children: [
          { index: true, element: <Navigate to="/meeting_room_list" /> },
          {
            path: "/",
            element: <MeetingRoomList />,
          },
          {
            path: "meeting_room_list",
            element: <MeetingRoomList />,
          },
          {
            path: "booking_history",
            element: <BookingHistory />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "update_password",
    element: <UpdatePassword />,
  },
];
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);
