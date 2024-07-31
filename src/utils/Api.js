import axios from "axios";
import { BackendBaseURL } from "./constant";

export const signup = async (email, pass) => {
  // console.log(location);
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(`${BackendBaseURL}/signup`, {
        email,
        pass,
      });
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};
