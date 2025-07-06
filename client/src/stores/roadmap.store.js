import { create } from "zustand";
import { handleError } from "../utilities/toasts.js";
import axiosInstance from './../utilities/axiosInstance.js';

export const roadmapStore = create((set) => ({
  responseItems: [],
  responseItemsRequest: async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/posts/get/all/posts`
      );
      // console.log(response.data.data);
      if (!response) {
        throw new Error(response?.error);
      }
      set({ responseItems: response?.data.data });
    } catch (error) {
      handleError(error.message);
    }
  },
  filterItemsRequest: async (filterBy) => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/posts/get/by/category/${filterBy}`
      );
      // console.log(response.data.data);
      if (!response) {
        throw new Error(response?.error);
      }
      set({ responseItems: response?.data.data });
    } catch (error) {
      handleError(error.message);
    }
  },
}));
