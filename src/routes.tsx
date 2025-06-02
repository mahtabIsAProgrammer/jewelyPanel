import { Outlet, type RouteObject } from "react-router-dom";

import Login from "./components/pages/Login";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import { DashboardRoutes } from "./components/others/Dashboardroutes";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      { path: "/", element: <DashboardLayout />, children: DashboardRoutes },
      { path: "login", element: <Login /> },
    ],
  },
];
