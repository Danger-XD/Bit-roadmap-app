// All the api of single page of roadmap
import { create } from "zustand";
import axios from "axios";
import { handleError } from "../utilities/toasts";

export const roadPageStore = create((set) => ({
  upVoteBool: false,
  upVoteBoolRequest: async (postId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/post/upvote/toggle/${postId}`,
        {},
        {
          withCredentials: true,
        }
      );
      set({ upVoteBool: response?.data.post });
    } catch (error) {
      handleError(error.message);
    }
  },
  singlePostInfo: {},
  singlePostInfoRequest: async (postId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts/roadmap/${postId}`
      );
      set({ singlePostInfo: response?.data.post });
    } catch (error) {
      handleError(error.message);
    }
  },
  singlePostComment: [],
  singlePostCommentRequest: async (postId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/post/comment/c/comments/${postId}`
      );
      set({ singlePostComment: response.data.post });
    } catch (error) {
      handleError(error.message);
    }
  },
}));
