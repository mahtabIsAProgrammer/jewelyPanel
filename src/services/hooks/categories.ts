import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../configs/api";

export const useCategoriesSearch = (filters?: {
  search?: string;
  category?: string;
}) => {
  return useQuery({
    queryKey: ["categories-search", filters],
    queryFn: () => getAllCategories(filters),
    placeholderData: (prev: TAny) => prev,
    enabled: true,
  });
};

// Get category by id
export const useGetCategoryById = (id?: number) => {
  return useQuery({
    queryKey: ["category-get", id],
    queryFn: async () => (id ? await getCategoryById(id!) : {}),
  });
};

// Create a category
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Categories) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories-search"],
      });
    },
  });
};

// Update a category
export const useUpdateCategory = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Categories) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories-search"],
      });
      queryClient.invalidateQueries({
        queryKey: ["category-get"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error.message || "Something went wrong."}`);
    },
  });
};

// Delete a category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories-search"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error.message || "Something went wrong."}`);
    },
  });
};
