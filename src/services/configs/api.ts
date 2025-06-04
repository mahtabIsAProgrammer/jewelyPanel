import apiClient from "./apiClient";

export const loginUser = async ({ email, userName, password }: TAny) =>
  apiClient.post("/login", { email, userName, password });

// users
export const getAllUsers = (params?: { search?: string }) =>
  apiClient.get("/users", { params }).then((res) => res.data);

export const getUserById = (id: string) => apiClient.get(`users/${id}`);

export const createUser = (data: Users) => apiClient.post("/users", data);

export const updateUser = (id: string, data: Users) =>
  apiClient.put(`/users/${id}`, data);

export const deleteUser = (id: string) => apiClient.delete(`/users/${id}`);

// products
export const getAllProducts = (params?: { search?: string }) =>
  apiClient.get("/products", { params }).then((res) => res.data);

export const getProductById = (id: string) => apiClient.get(`products/${id}`);

export const createProduct = (data: Products) =>
  apiClient.post("/products", data);

export const updateProduct = (id: string, data: Products) =>
  apiClient.put(`/products/${id}`, data);

export const deleteProduct = (id: string) =>
  apiClient.delete(`/products/${id}`);

// Blogs
export const getAllBlogs = (params?: { search?: string }) =>
  apiClient.get("/blogs", { params }).then((res) => res.data);

export const getBlogById = (id: string) => apiClient.get(`blogs/${id}`);

export const createBlog = (data: Blogs) => apiClient.post("/blogs", data);

export const updateBlog = (id: string, data: Blogs) =>
  apiClient.put(`/blogs/${id}`, data);

export const deleteBlog = (id: string) => apiClient.delete(`/blogs/${id}`);

// Comments
export const getAllComments = (params?: { search?: string }) =>
  apiClient.get("/comments", { params }).then((res) => res.data);

export const getCommentById = (id: string) => apiClient.get(`comments/${id}`);

export const createComment = (data: Comments) =>
  apiClient.post("/comments", data);

export const updateComment = (id: string, data: Comments) =>
  apiClient.put(`/comments/${id}`, data);

export const deleteComment = (id: string) =>
  apiClient.delete(`/comments/${id}`);

// Faqs
export const getAllFaqs = (params?: { search?: string }) =>
  apiClient.get("/faqs", { params }).then((res) => res.data);

export const getFaqById = (id: string) => apiClient.get(`faqs/${id}`);

export const createFaq = (data: Faqs) => apiClient.post("/faqs", data);

export const updateFaq = (id: string, data: Faqs) =>
  apiClient.put(`/faqs/${id}`, data);

export const deleteFaq = (id: string) => apiClient.delete(`/faqs/${id}`);

// Categories
export const getAllCategories = (params?: { search?: string }) =>
  apiClient.get("/categories", { params }).then((res) => res.data);

export const getCategoryById = (id: string) =>
  apiClient.get(`categories/${id}`);

export const createCategory = (data: Categories) =>
  apiClient.post("/categories", data);

export const updateCategory = (id: string, data: Categories) =>
  apiClient.put(`/categories/${id}`, data);

export const deleteCategory = (id: string) =>
  apiClient.delete(`/categories/${id}`);
