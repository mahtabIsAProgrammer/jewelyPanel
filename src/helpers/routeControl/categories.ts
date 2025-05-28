import { lazy } from "react";

export const Categories = lazy(
  () => import("../../components/pages/categories")
);

export const CategoriesAddEdit = lazy(
  () => import(`../../components/pages/categories/AddEdit`)
);
