import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7180/api",
});

export default apiClient;
