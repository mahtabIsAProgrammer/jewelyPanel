import apiClient from "./apiClient";

// users
export const getAllUsers = (params?: { search?: string }) =>
  apiClient.get("/user", { params }).then((res) => res.data);

export const getUserById = (id: number) => apiClient.get(`user/${id}`);

export const createUser = (data: Users) => apiClient.post("/user", data);

export const updateUser = (id: number, data: Users) =>
  apiClient.put(`/user/${id}`, data);

export const deleteUser = (id: number) => apiClient.delete(`/user/${id}`);

// products
export const getAllProducts = (params?: { search?: string }) =>
  apiClient.get("/products", { params }).then((res) => res.data);

export const getProductById = (id: number) => apiClient.get(`products/${id}`);

export const createProduct = (data: Products) =>
  apiClient.post("/products", data);

export const updateProduct = (id: number, data: Products) =>
  apiClient.put(`/products/${id}`, data);

export const deleteProduct = (id: number) =>
  apiClient.delete(`/products/${id}`);

// Blogs
export const getAllBlogs = (params?: { search?: string }) =>
  apiClient.get("/blogs", { params }).then((res) => res.data);

export const getBlogById = (id: number) => apiClient.get(`blogs/${id}`);

export const createBlog = (data: Blogs) => apiClient.post("/blogs", data);

export const updateBlog = (id: number, data: Blogs) =>
  apiClient.put(`/blogs/${id}`, data);

export const deleteBlog = (id: number) => apiClient.delete(`/blogs/${id}`);

// Comments
export const getAllComments = (params?: { search?: string }) =>
  apiClient.get("/comments", { params }).then((res) => res.data);

export const getCommentById = (id: number) => apiClient.get(`comments/${id}`);

export const createComment = (data: Comments) =>
  apiClient.post("/comments", data);

export const updateComment = (id: number, data: Comments) =>
  apiClient.put(`/comments/${id}`, data);

export const deleteComment = (id: number) =>
  apiClient.delete(`/comments/${id}`);

// Faqs
export const getAllFaqs = (params?: { search?: string }) =>
  apiClient.get("/faqs", { params }).then((res) => res.data);

export const getFaqById = (id: number) => apiClient.get(`faqs/${id}`);

export const createFaq = (data: Faqs) => apiClient.post("/faqs", data);

export const updateFaq = (id: number, data: Faqs) =>
  apiClient.put(`/faqs/${id}`, data);

export const deleteFaq = (id: number) => apiClient.delete(`/faqs/${id}`);

// Categories
export const getAllCategories = (params?: { search?: string }) =>
  apiClient.get("/categories", { params }).then((res) => res.data);

export const getCategoryById = (id: number) =>
  apiClient.get(`categories/${id}`);

export const createCategory = (data: Categories) =>
  apiClient.post("/categories", data);

export const updateCategory = (id: number, data: Categories) =>
  apiClient.put(`/categories/${id}`, data);

export const deleteCategory = (id: number) =>
  apiClient.delete(`/categories/${id}`);
