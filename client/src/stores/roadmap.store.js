import { create } from "zustand";
import axios from "axios";
import { handleError } from "../utilities/toasts";

export const roadmapStore = create((set) => ({
  responseItems: [],
  responseItemsRequest: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts/get/all/posts`
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
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts/get/by/category/${filterBy}`
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
