import { lazy } from "react";

export const Comments = lazy(() => import("../../components/pages/comments"));

export const CommentsAddEdit = lazy(
  () => import(`../../components/pages/comments/AddEdit`)
);
