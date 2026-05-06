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

export const createCategory = async ({
  name,
  description,
  status,
  imageUrl,
}) => {
  const { data } = await apiClient.post("/categories", {
    name,
    description,
    status,
    imageUrl,
  });

  return data;
};

export const updateCategory = async (
  id,
  { name, description, status, imageUrl },
) => {
  await apiClient.put(`/categories/${id}`, {
    name,
    description,
    status,
    imageUrl,
  });
};

export const deleteCategory = async (id) => {
  await apiClient.delete(`/categories/${id}`);
};
