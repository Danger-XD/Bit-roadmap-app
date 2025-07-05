// All the api of single page of roadmap
import { create } from "zustand";
import axios from "axios";
import { handleError, handleSuccess } from "../utilities/toasts";

export const roadPageStore = create((set) => ({
  // To get username for auth
  userInfoForAuth: {},
  userInfoForAuthRequest: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/personal/info`,
        { withCredentials: true }
      );
      set({ userInfoForAuth: response.data });
    } catch (error) {
      handleError(error?.response?.data.message);
    }
  },
  // To upvote toggle
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
      handleError(error?.response?.data.message);
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
      set({ postUpvoteCheck: response?.data });
    } catch (error) {
      handleError(error?.response?.data.message);
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
      handleError(error?.response?.data.message);
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
      handleError(error?.response?.data.message);
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
      handleError(error?.response?.data.message);
    }
  },
  // update a comment
  updateCommentRequest: async (commentId, comment) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/post/comment/c/update/${commentId}`,
        { comment },
        { withCredentials: true }
      );
      handleSuccess(response?.data.message);
    } catch (error) {
      handleError(error?.response?.data.message);
    }
  },
  // delete a comment
  deleteCommentRequest: async (commentId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/post/comment/c/delete/${commentId}`,
        { withCredentials: true }
      );
      if (response?.data.deleted) {
        handleSuccess(response.data.message);
      }
    } catch (error) {
      handleError(error?.response?.data.message);
    }
  },
  // get all replies
  getAllReplies: {},
  getAllRepliesRequest: async (commentId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/post/comment/reply/r/get/${commentId}`
      );

      if (response?.data.replies.length === 0) {
        handleError("No replies found!");
      } else {
        set({ getAllReplies: response?.data });
      }
    } catch (error) {
      handleError(error?.response?.data.message);
    }
  },
  // get reply number
  getReplyNumber: {},
  getReplyNumberRequest: async (commentId) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/post/comment/reply/r/number/${commentId}`
      );

      set({ getAllReplies: response?.data });
    } catch (error) {
      handleError(error?.response?.data.message);
    }
  },
  // create a reply
  createReplyRequest: async (commentId, reply) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/post/comment/reply/r/${commentId}`,
        { reply },
        { withCredentials: true }
      );
    } catch (error) {
      handleError(error?.response?.data.message);
    }
  },
  // update a reply
  updateReplyRequest: async (replyId, reply) => {
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL
        }/post/comment/reply/r/update/${replyId}`,
        { reply },
        { withCredentials: true }
      );
    } catch (error) {
      handleError(error.message);
    }
  },
  // delete a reply
  deleteReplyRequest: async (replyId) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_BASE_URL
        }/post/comment/reply/r/delete/${replyId}`,
        { withCredentials: true }
      );
      if (response?.data.deleted) {
        handleSuccess(response.data.message);
      }
    } catch (error) {
      handleError(error.message);
    }
  },
}));
