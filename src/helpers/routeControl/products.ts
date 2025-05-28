import { lazy } from "react";

export const Products = lazy(() => import("../../components/pages/products"));

export const ProductsAddEdit = lazy(
  () => import(`../../components/pages/products/AddEdit`)
);
