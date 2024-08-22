import axios from "axios";
import { InternalAxiosRequestConfig, AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8854",
  timeout: 1000,
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

instance.interceptors.response.use((response: AxiosResponse) => {
  return response.data;
});

export default instance;
