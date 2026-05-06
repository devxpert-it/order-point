import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../services/categoryApiService.js";

export const useGetCategories = ({
  pageNumber,
  pageSize,
  searchQuery,
  status,
  sortBy,
}) => {
  return useQuery({
    queryKey: [
      "categories",
      "list",
      { pageNumber, pageSize, searchQuery, status, sortBy },
    ],
    queryFn: () =>
      getCategories({ pageNumber, pageSize, searchQuery, status, sortBy }),
  });
};

export const useGetCategory = (id) => {
  return useQuery({
    queryKey: ["categories", "detail", { id }],
    queryFn: () => getCategory(id),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body) => createCategory(body),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["categories", "list"],
      });
    },
  });
};

export const useUpdateCategory = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body) => updateCategory(id, body),
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["categories", "list"] }),
        queryClient.invalidateQueries({
          queryKey: ["categories", "detail", { id }],
        }),
      ]);
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteCategory(id),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["categories", "list"],
      });
    },
  });
};
