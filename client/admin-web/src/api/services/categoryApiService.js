import apiClient from "../apiClient.js";

export const getCategories = async ({
  pageNumber,
  pageSize,
  searchQuery,
  sortBy,
}) => {
  const { data } = await apiClient.get("/categories", {
    params: { pageNumber, pageSize, searchQuery, sortBy },
  });

  return data;
};

export const getCategory = async (id) => {
  const { data } = await apiClient.get(`/categories/${id}`);

  return data;
};
