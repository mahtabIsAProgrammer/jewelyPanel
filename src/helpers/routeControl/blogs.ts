import { lazy } from "react";

export const Blogs = lazy(() => import("../../components/pages/blogs"));

export const BlogsAddEdit = lazy(
  () => import(`../../components/pages/blogs/AddEdit`)
);
