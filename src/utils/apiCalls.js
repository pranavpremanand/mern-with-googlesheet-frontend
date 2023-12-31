import axios from "axios";
import { api, baseUrl } from "./constants";
import { request } from "./axios";

// signup
export const signup = (data) => {
  return axios.post(`${baseUrl}${api.signup}`, data);
};

// login
export const login = (data) => {
  return axios.post(`${baseUrl}${api.login}`, data);
};

// get user data
export const getUserData = () => {
  return request(`${baseUrl}${api.getUser}`);
};

// get users list
export const getUsers = () => {
  return request(`${baseUrl}${api.users}`);
};

// get users list
export const changeIsBlockedStatus = (data) => {
  return request({
    url: `${baseUrl}${api.blockOrUnblockUser}`,
    method: "post",
    data,
  });
};
