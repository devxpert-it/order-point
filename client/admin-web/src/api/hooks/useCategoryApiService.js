import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteCategory,
  getCategories,
  getCategory,
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
