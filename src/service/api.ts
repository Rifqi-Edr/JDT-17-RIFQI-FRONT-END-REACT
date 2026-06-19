import axios from "axios";
import { ACCESS_TOKEN, BASE_URL } from "../constant";

const API = axios.create();

export const setAxiosConfig = (token: string) => {
  // bearerToken = token;
};

API.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = BASE_URL;
  axiosConfig.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;

  return axiosConfig;
});

export default API
