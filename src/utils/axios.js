import axios from "axios";
import { baseUrl } from "./constants";

export const request = axios.create({ baseURL: baseUrl });

request.interceptors.request.use((req) => {
  req.headers.authorization = sessionStorage.getItem("token") || sessionStorage.getItem('adminToken');
  
  return req;
});
