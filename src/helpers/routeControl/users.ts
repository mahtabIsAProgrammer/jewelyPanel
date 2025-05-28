import { lazy } from "react";

export const Users = lazy(() => import("../../components/pages/user"));

export const UsersAddEdit = lazy(
  () => import(`../../components/pages/user/AddEdit`)
);
