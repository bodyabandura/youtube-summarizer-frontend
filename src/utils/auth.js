import cookie from "js-cookie";
import axios from "axios";
import { BackendBaseURL } from "./constant";

export const setCookie = (key, value) => {
  cookie.set(key, value, { expires: 1 });
};

export const removeCookie = (key) => {
  cookie.remove(key);
};

export const getCookie = (key) => {
  return cookie.get(key);
};

export const setAuthentication = (data) => {
  setCookie("token", data.token);
  setCookie("email", data.email);
  console.log("sdf");
};

export const logOut = () => {
  removeCookie("token");
};

export const isLogin = async () => {
  const token = getCookie("token");
  if (token) {
    return true;
  }
  // if (token) {
  //   const res = await axios.post(`${BackendBaseURL}/user/auth`, { token });
  //   return res.data;
  // }
  return false;
};
