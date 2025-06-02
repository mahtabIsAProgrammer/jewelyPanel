import { Outlet, type RouteObject } from "react-router-dom";
import { BlogsAddEdit, Blogs } from "../../helpers/routeControl/blogs";
import {
  CategoriesAddEdit,
  Categories,
} from "../../helpers/routeControl/categories";
import { CommentsAddEdit, Comments } from "../../helpers/routeControl/comments";
import { FaqsAddEdit, Faqs } from "../../helpers/routeControl/faqs";
import { ProductsAddEdit, Products } from "../../helpers/routeControl/products";
import { Users, UsersAddEdit } from "../../helpers/routeControl/users";
import { NotFound } from "../common/NotFound";
import { Dashboard } from "../pages/Dashboard";

export const DashboardRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      { path: "*", element: <NotFound /> },
      { index: true, element: <Dashboard /> },
      {
        path: "/users",
        children: [
          { index: true, element: <Users /> },
          { path: "add", element: <UsersAddEdit /> },
          { path: "edit/:id", element: <UsersAddEdit isEdit /> },
        ],
      },
      {
        path: "/products",
        children: [
          { index: true, element: <Products /> },
          { path: "add", element: <ProductsAddEdit /> },
          { path: "edit/:id", element: <ProductsAddEdit isEdit /> },
        ],
      },
      {
        path: "/blogs",
        children: [
          { index: true, element: <Blogs /> },
          { path: "add", element: <BlogsAddEdit /> },
          { path: "edit/:id", element: <BlogsAddEdit isEdit /> },
        ],
      },
      {
        path: "/comments",
        children: [
          { index: true, element: <Comments /> },
          { path: "add", element: <CommentsAddEdit /> },
          { path: "edit/:id", element: <CommentsAddEdit isEdit /> },
        ],
      },
      {
        path: "/categories",
        children: [
          { index: true, element: <Categories /> },
          { path: "add", element: <CategoriesAddEdit /> },
          { path: "edit/:id", element: <CategoriesAddEdit isEdit /> },
        ],
      },
      {
        path: "/faqs",
        children: [
          { index: true, element: <Faqs /> },
          { path: "add", element: <FaqsAddEdit /> },
          { path: "edit/:id", element: <FaqsAddEdit isEdit /> },
        ],
      },
    ],
  },
];
