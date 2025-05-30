import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createFaq,
  deleteFaq,
  getAllFaqs,
  getFaqById,
  updateFaq,
} from "../configs/api";

export const useFaqSearch = (filters?: {
  search?: string;
  category?: string;
}) => {
  return useQuery({
    queryKey: ["faqs-search", filters],
    queryFn: () => getAllFaqs(filters),
    placeholderData: (prev: TAny) => prev,
    enabled: true,
  });
};

// Get faq by id
export const useGetFaqById = (id?: number) => {
  return useQuery({
    queryKey: ["faq-get", id],
    queryFn: async () => (id ? await getFaqById(id!) : {}),
  });
};

// Create a faq
export const useCreateFaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Faqs) => createFaq(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["faqs-search"],
      });
    },
  });
};

// Update a faq
export const useUpdateFaq = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Faqs) => updateFaq(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["faqs-search"],
      });
      queryClient.invalidateQueries({
        queryKey: ["faq-get"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error.message || "Something went wrong."}`);
    },
  });
};

// Delete a faq
export const useDeleteFaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteFaq(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["faqs-search"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error.message || "Something went wrong."}`);
    },
  });
};
