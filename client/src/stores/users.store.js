// import.meta.env
import { create } from "zustand";
import axios from "axios";
import { handleError } from "../utilities/toasts.js";

const userStore = create((set) => ({
  signupResponse: {},
  signupRequest: async (userInfo) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/signup`,
        userInfo
      );
      set({ signupResponse: response.data });
    } catch (error) {
      handleError(error.response?.data?.message);
    }
  },
  isAuthentic: false,
  loginResponse: {},
  loginInfoRequest: async (userInfo) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/login`,
        userInfo
      );
      set({ loginResponse: response.data, isAuthentic: true });
    } catch (error) {
      handleError(error.response?.data?.message);
    }
  },
}));
export default userStore;
