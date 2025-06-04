import { Outlet, type RouteObject } from "react-router-dom";

import Login from "./components/pages/Login";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import { DashboardRoutes } from "./components/others/DashboardRoutes";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      { path: "/login", element: <Login /> },
      { path: "/", element: <DashboardLayout />, children: DashboardRoutes },
    ],
  },
];
