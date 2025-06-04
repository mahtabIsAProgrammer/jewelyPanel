import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../configs/api";

export const useProductSearch = (filters?: {
  search?: string;
  category?: string;
}) => {
  return useQuery({
    queryKey: ["products-search", filters],
    queryFn: () => getAllProducts(filters),
    placeholderData: (prev: TAny) => prev,
    enabled: true,
  });
};

// Get product by id
export const useGetProductById = (id?: string) => {
  return useQuery({
    queryKey: ["product-get", id],
    queryFn: async () => (id ? await getProductById(id!) : {}),
  });
};

// Create a product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Products) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products-search"],
      });
    },
  });
};

// Update a product
export const useUpdateProduct = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Products) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products-search"],
      });
      queryClient.invalidateQueries({
        queryKey: ["product-get"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error.message || "Something went wrong."}`);
    },
  });
};

// Delete a product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products-search"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error.message || "Something went wrong."}`);
    },
  });
};
