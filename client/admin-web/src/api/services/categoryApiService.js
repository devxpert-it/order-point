import apiClient from "../apiClient.js";

export const getCategories = async ({
  pageNumber,
  pageSize,
  searchQuery,
  status,
  sortBy,
}) => {
  const { data } = await apiClient.get("/categories", {
    params: { pageNumber, pageSize, searchQuery, status, sortBy },
  });

  return data;
};

export const getCategory = async (id) => {
  const { data } = await apiClient.get(`/categories/${id}`);

  return data;
};

export const deleteCategory = async (id) => {
  await apiClient.delete(`/categories/${id}`);
};
