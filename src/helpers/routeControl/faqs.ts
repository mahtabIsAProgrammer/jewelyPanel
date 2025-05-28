import { lazy } from "react";

export const Faqs = lazy(() => import("../../components/pages/faqs"));

export const FaqsAddEdit = lazy(
  () => import(`../../components/pages/faqs/AddEdit`)
);
