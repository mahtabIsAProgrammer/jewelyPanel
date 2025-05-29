import { Outlet, type RouteObject } from "react-router-dom";

import {
  Categories,
  CategoriesAddEdit,
} from "./helpers/routeControl/categories";
import { NotFound } from "./components/common/NotFound";
import { Dashboard } from "./components/pages/Dashboard";
import { Faqs, FaqsAddEdit } from "./helpers/routeControl/faqs";
import { Users, UsersAddEdit } from "./helpers/routeControl/users";
import { Blogs, BlogsAddEdit } from "./helpers/routeControl/blogs";
import { Products, ProductsAddEdit } from "./helpers/routeControl/products";
import { Comments, CommentsAddEdit } from "./helpers/routeControl/comments";

export const routes: RouteObject[] = [
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
