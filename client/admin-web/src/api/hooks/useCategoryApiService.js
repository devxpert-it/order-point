import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/categoryApiService.js";

export const useCategoryApiService = ({
  pageNumber,
  pageSize,
  searchQuery,
  sortBy,
}) => {
  return useQuery({
    queryKey: ["categories", { pageNumber, pageSize, searchQuery, sortBy }],
    queryFn: () => getCategories({ pageNumber, pageSize, searchQuery, sortBy }),
  });
};
