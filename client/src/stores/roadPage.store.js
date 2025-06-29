import { create } from "zustand";
import axios from "axios";
import { handleError } from "../utilities/toasts";

export const roadPageStore = create((set) => ({
  upVoteBool: true,
  upVoteBoolRequest: async (postId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/post/upvote/toggle/${postId}`,{},
        {
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (error) {
      handleError(error.message);
    }
  },
}));
