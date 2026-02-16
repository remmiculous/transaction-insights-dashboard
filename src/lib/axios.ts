import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://696e0139d7bacd2dd7155c6a.mockapi.io/barter-tech",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    return Promise.reject(new Error(message));
  },
);
