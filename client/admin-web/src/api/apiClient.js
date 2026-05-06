import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7180/api",
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const problemDetails = error.response?.data;
    error.problemDetails = problemDetails ?? null;

    return Promise.reject(error);
  },
);

export default apiClient;
