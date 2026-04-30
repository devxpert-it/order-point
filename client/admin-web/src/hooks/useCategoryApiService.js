import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categoryApiService.js";

export const useCategoryApiService = ({ pageNumber, pageSize }) => {
  return useQuery({
    queryKey: ["categories", { pageNumber, pageSize }],
    queryFn: () => getCategories({ pageNumber, pageSize }),
  });
};
