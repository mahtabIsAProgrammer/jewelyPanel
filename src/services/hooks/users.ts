import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../configs/api";

export const useUserSearch = (filters?: { search?: string }) => {
  return useQuery({
    queryKey: ["users-search", filters],
    queryFn: () => getAllUsers(filters),
    placeholderData: (prev: TAny) => prev,
    enabled: true,
    staleTime: 1000 * 60,
  });
};

// Get user by id
export const useGetUserById = (id?: string) => {
  return useQuery({
    queryKey: ["user-get", id],
    queryFn: async () => (id ? await getUserById(id!) : {}),
  });
};

// Create a user
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Users) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users-search"],
      });
    },
  });
};

// Update a user
export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Users) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users-search"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-get"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error.message || "Something went wrong."}`);
    },
  });
};

// Delete a user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users-search"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error.message || "Something went wrong."}`);
    },
  });
};
