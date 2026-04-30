import apiClient from "./apiClient.js";

export const getCategories = async ({ pageNumber, pageSize }) => {
  const { data } = await apiClient.get("/categories", {
    params: { pageNumber, pageSize },
  });

  return data;
};
