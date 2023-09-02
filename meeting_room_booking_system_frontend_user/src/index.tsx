import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  Link,
  Outlet,
} from "react-router-dom";

function Aaa() {
  return <div>aaa</div>;
}

function Bbb() {
  return <div>bbb</div>;
}

function Layout() {
  return (
    <div>
      <div>
        <Link to="/aaa">to aaa</Link>
      </div>
      <div>
        <Link to="/bbb">to bbb</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

function ErrorPage() {
  return <div>error</div>;
}

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "aaa",
        element: <Aaa />,
      },
      {
        path: "bbb",
        element: <Bbb />,
      },
    ],
  },
];
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);
