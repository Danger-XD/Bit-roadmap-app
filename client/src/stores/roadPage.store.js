// All the api of single page of roadmap
import { create } from "zustand";
import axios from "axios";
import { handleError } from "../utilities/toasts";

export const roadPageStore = create((set) => ({
  userInfoForAuth: {},
  userInfoForAuthRequest: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/personal/info`,
        { withCredentials: true }
      );
      console.log(response.data);
      set({ userInfoForAuth: response.data });
    } catch (error) {
      handleError(error.message);
    }
  },
  upVoteBoolRequest: async (postId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/post/upvote/toggle/${postId}`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      handleError(error.message);
    }
  },
  // To check if a post is upvoted or not!
  postUpvoteCheck: {},
  postUpvoteCheckRequest: async (postId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/post/upvote/check/boolean/${postId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      set({ postUpvoteCheck: response?.data });
    } catch (error) {
      handleError(error.message);
    }
  },
  // Get all the data of a post
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
  // get all the comments of a post
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
  // create a comment
  createCommentRequest: async (postId, comment) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/post/comment/c/create/${postId}`,
        { comment },
        { withCredentials: true }
      );
    } catch (error) {
      handleError(error.message);
    }
  },
}));
