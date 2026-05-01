import apiClient from "../apiClient.js";

export const getCategories = async ({ pageNumber, pageSize, sortBy }) => {
  const { data } = await apiClient.get("/categories", {
    params: { pageNumber, pageSize, sortBy },
  });

  return data;
};
