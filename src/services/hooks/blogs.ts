import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../configs/api";

export const useBlogSearch = (filters?: {
  search?: string;
  category?: string;
}) => {
  return useQuery({
    queryKey: ["blogs-search", filters],
    queryFn: () => getAllBlogs(filters),
    placeholderData: (prev: TAny) => prev,
    enabled: true,
  });
};

// Get blog by id
export const useGetBlogById = (id?: number) => {
  return useQuery({
    queryKey: ["blog-get", id],
    queryFn: async () => (id ? await getBlogById(id!) : {}),
  });
};

// Create a blog
export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Blogs) => createBlog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs-search"],
      });
    },
  });
};

// Update a blog
export const useUpdateBlog = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Blogs) => updateBlog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs-search"],
      });
      queryClient.invalidateQueries({
        queryKey: ["blog-get"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error.message || "Something went wrong."}`);
    },
  });
};

// Delete a blog
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs-search"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error.message || "Something went wrong."}`);
    },
  });
};
