import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
  updateComment,
} from "../configs/api";

export const useCommentSearch = (filters?: {
  search?: string;
  category?: string;
}) => {
  return useQuery({
    queryKey: ["comments-search", filters],
    queryFn: () => getAllComments(filters),
    placeholderData: (prev: TAny) => prev,
    enabled: true,
  });
};

// Get comment by id
export const useGetCommentById = (id?: number) => {
  return useQuery({
    queryKey: ["comment-get", id],
    queryFn: async () => (id ? await getCommentById(id!) : {}),
  });
};

// Create a comment
export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Comments) => createComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments-search"],
      });
    },
  });
};

// Update a comment
export const useUpdateComment = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Comments) => updateComment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments-search"],
      });
      queryClient.invalidateQueries({
        queryKey: ["comment-get"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error.message || "Something went wrong."}`);
    },
  });
};

// Delete a comment
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments-search"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error.message || "Something went wrong."}`);
    },
  });
};
