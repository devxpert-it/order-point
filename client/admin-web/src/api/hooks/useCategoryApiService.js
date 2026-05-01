import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/categoryApiService.js";

export const useCategoryApiService = ({ pageNumber, pageSize, sortBy }) => {
  return useQuery({
    queryKey: ["categories", { pageNumber, pageSize, sortBy }],
    queryFn: () => getCategories({ pageNumber, pageSize, sortBy }),
  });
};
