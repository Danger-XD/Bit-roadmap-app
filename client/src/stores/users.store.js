import { create } from "zustand";
import axiosInstance from "./../utilities/axiosInstance.js";
import { handleError } from "../utilities/toasts.js";

const userStore = create((set) => ({
  signupRequest: async (userInfo) => {
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/signup`,
        userInfo
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed!";
      handleError(message);
    }
  },
  isAuthentic: false,
  // loginResponse: {},
  loginInfoRequest: async (userInfo) => {
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/login`,
        userInfo
      );
      set({ isAuthentic: true });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed!";
      handleError(message);
    }
  },
}));
export default userStore;
