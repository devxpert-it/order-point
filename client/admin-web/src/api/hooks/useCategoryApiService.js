import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategory } from "../services/categoryApiService.js";

export const useGetCategories = ({
  pageNumber,
  pageSize,
  searchQuery,
  sortBy,
}) => {
  return useQuery({
    queryKey: [
      "categories",
      "list",
      { pageNumber, pageSize, searchQuery, sortBy },
    ],
    queryFn: () => getCategories({ pageNumber, pageSize, searchQuery, sortBy }),
  });
};

export const useGetCategory = (id) => {
  return useQuery({
    queryKey: ["categories", "detail", { id }],
    queryFn: () => getCategory(id),
  });
};
