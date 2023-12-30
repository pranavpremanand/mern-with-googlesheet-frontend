import axios from "axios";
import { api, baseUrl } from "./constants";

// signup
export const signup = (data) => {
  return axios.post(`${baseUrl}${api.signup}`,data);
};

// login
export const login = (data) => {
  return axios.post(`${baseUrl}${api.login}`,data);
};
