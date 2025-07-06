import React, { useEffect, useState } from "react";
import { getCookies } from "../utilities/cookies";
import { roadPageStore } from "../stores/roadPage.store.js";
import { useNavigate, useParams } from "react-router";
import { handleError } from "../utilities/toasts.js";

const RoadComment = () => {
  const { postId } = useParams();
  const {
    userInfoForAuth,
    userInfoForAuthRequest,
    singlePostInfoRequest,
    singlePostComment,
    singlePostCommentRequest,
    createCommentRequest,
    updateCommentRequest,
    deleteCommentRequest,
    getAllReplies,
    getAllRepliesRequest,
    createReplyRequest,
    updateReplyRequest,
    deleteReplyRequest,
  } = roadPageStore();
  const { username: loggedInUser } = userInfoForAuth;
  // For user inputs
  const [commentInfo, setCommentInfo] = useState({ comment: "" });
  const [updateInfo, setUpdateInfo] = useState({ comment: "" });
  const [replyInfo, setReplyInfo] = useState({ reply: "" });
  const [updateReplyInfo, setUpdateReplyInfo] = useState({ reply: "" });
  // to show the form
  const [showReplyBox, setShowReplyBox] = useState();
  const [showUpdateBox, setShowUpdateBox] = useState();
  const [showReplyUpdateBox, setShowReplyUpdateBox] = useState();
  const [showReplies, setShowReplies] = useState(false);
  const navigate = useNavigate();
  // To get the value written in the comment/reply update box
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "comment") {
      setCommentInfo((state) => ({
        ...state,
        [name]: value,
      }));
    }
    if (name === "update") {
      setUpdateInfo((state) => ({
        ...state,
        comment: value,
      }));
    }
    if (name === "reply") {
      setReplyInfo((state) => ({
        ...state,
        [name]: value,
      }));
    }
    if (name === "replyUpdate") {
      setUpdateReplyInfo((state) => ({
        ...state,
        reply: value,
      }));
    }
  };
  // To submit comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!getCookies("token")) {
      navigate("/auth/login");
      handleError("Please login first!");
      window.scrollTo(0, 0);
      return;
    }
    const { comment } = commentInfo;
    if (comment.length === 0) {
      handleError("Cannot post an empty comment!");
      return;
    }
    await createCommentRequest(postId, comment);
    await singlePostCommentRequest(postId);
    await singlePostInfoRequest(postId);
    setCommentInfo({ comment: "" });
  };
  // to reply to a comment
  const handleReplySubmit = async (e, id) => {
    e.preventDefault();
    if (!replyInfo.reply.trim()) {
      handleError("Reply cannot be empty!");
      return;
    }
    await createReplyRequest(id, replyInfo.reply);
    setReplyInfo({ reply: "" });
    setShowReplyBox(null);
  };
  // to show/hide reply box
  const handleReplyBox = (id) => {
    setShowReplyBox(id);
    setShowUpdateBox(null);
    setShowReplyUpdateBox(null);
  };
  // to show/hide update box
  const handleUpdateBox = (id) => {
    setShowUpdateBox(id);
    setShowReplyBox(null);
  };
  const handleCommentUpdate = async (e, id) => {
    e.preventDefault();
    const { comment } = updateInfo;
    await updateCommentRequest(id, comment);
    await singlePostCommentRequest(postId);
    setShowUpdateBox(null);
  };
  const handleCancelButton = () => {
    setShowReplyBox(null);
  };
  // to delete a comment
  const handleDeleteComment = async (e, commentId) => {
    e.preventDefault();
    await deleteCommentRequest(commentId);
    await singlePostCommentRequest(postId);
    await singlePostInfoRequest(postId);
  };
  // to show update a reply box
  const handleReplyUpdateBox = (replyId) => {
    setShowReplyUpdateBox(replyId);
    setShowReplyBox(null);
    setShowUpdateBox(null);
  };
  // to update a reply
  const handleReplyUpdateSubmit = async (e, replyId) => {
    e.preventDefault();
    await updateReplyRequest(replyId, updateReplyInfo.reply);
    setUpdateReplyInfo({ reply: "" });
    setShowReplyUpdateBox(null);
  };
  // to delete a reply
  const handleDeleteReply = async (e, replyId) => {
    e.preventDefault();
    await deleteReplyRequest(replyId);
  };
  const handleShowReply = async (commentId) => {
    setShowReplies(!showReplies);
    if (showReplies) {
      await getAllRepliesRequest(commentId);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await singlePostCommentRequest(postId);
      if (getCookies("token")) {
        await userInfoForAuthRequest();
      }
    };
    fetchData();
  }, [postId]);
  return (
    <div className="container h-fit mb-10 rounded-2xl scroll-auto px-3">
      <div className="bg-orange-300 rounded p-2 mb-4">
        {/* Form to submit a comment */}
        <form onSubmit={handleCommentSubmit}>
          <div>
            <textarea
              name="comment"
              id="commentBox"
              className="resize-none bg-white w-full pl-2 pt-2"
              rows={4}
              placeholder="Add comment..."
              value={commentInfo.comment}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="text-end">
            <button
              type="submit"
              className="cursor-pointer bg-black text-white font-semibold px-4 py-2 rounded-xl"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div>
        <div className="font-semibold pb-4">Comments:</div>
        {/* Show comments */}
        <div>
          {singlePostComment.length === 0 ? (
            <div className="font-semibold text-4xl pb-4">
              No comments found!
            </div>
          ) : (
            <div className="w-full">
              {singlePostComment.map((item, index) => (
                <div key={index}>
                  <div className="py-2 px-4 mb-8 rounded-xl bg-gray-200 relative">
                    <div>
                      {" "}
                      <div className="font-semibold">{item.User.username}</div>
                      <div>{item.comment}</div>
                    </div>
                    <div className="absolute flex -bottom-6">
                      {/* Reply box button */}
                      <div>
                        <button
                          onClick={() => handleReplyBox(item._id)}
                          className="font-semibold text-[14px] mr-3 sm:mr-6 cursor-pointer"
                        >
                          Reply
                        </button>
                      </div>
                      {/* Show replies button */}
                      <div>
                        <button
                          onClick={() => handleShowReply(item._id)}
                          className="font-semibold text-[14px] mr-3 sm:mr-6 cursor-pointer"
                        >
                          {showReplies ? "Hide Replies" : " Show replies"}
                        </button>
                      </div>
                      {item.User.username === loggedInUser && (
                        <div className="flex">
                          {/* Update comment button */}
                          <div>
                            <button
                              onClick={() => {
                                handleUpdateBox(item._id);
                                setUpdateInfo({ comment: item.comment });
                              }}
                              className="font-semibold text-[14px] mr-3 sm:mr-6 cursor-pointer"
                            >
                              Update
                            </button>
                          </div>
                          {/* Delete comment button */}
                          <div>
                            <button
                              type="button"
                              onClick={(e) => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete this comment?"
                                  )
                                ) {
                                  handleDeleteComment(e, item._id);
                                }
                              }}
                              className="font-semibold text-[14px] cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    {/* Reply Box */}
                    {showReplyBox === item._id && (
                      <div className="bg-gray-200 rounded p-2 mb-4">
                        <form onSubmit={(e) => handleReplySubmit(e, item._id)}>
                          <div>
                            <textarea
                              name="reply"
                              id="replyBox"
                              className="resize-none bg-white w-full pl-2 pt-2"
                              rows={4}
                              placeholder="Write a reply..."
                              value={replyInfo.reply}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                          <div className="text-end">
                            <button
                              type="button"
                              onClick={handleCancelButton}
                              className="cursor-pointer mr-3 bg-black text-white font-semibold px-4 py-2 rounded-xl"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="cursor-pointer bg-black text-white font-semibold px-4 py-2 rounded-xl"
                            >
                              Reply
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                  <div>
                    {/* Update box */}
                    {showUpdateBox === item._id && (
                      <div className="bg-gray-200 rounded p-2 mb-4">
                        <form
                          onSubmit={(e) => handleCommentUpdate(e, item._id)}
                        >
                          <div>
                            <textarea
                              name="update"
                              id="commentUpdate"
                              className="resize-none bg-white w-full pl-2 pt-2"
                              rows={4}
                              value={updateInfo.comment}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                          <div className="text-end">
                            <button
                              type="submit"
                              className="cursor-pointer bg-black text-white font-semibold px-4 py-2 rounded-xl"
                            >
                              Update
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>

                  {/* Replies */}
                  {showReplies && (
                    <div className="flex flex-col h-fit mb-4">
                      {getAllReplies?.replies
                        ?.slice(0, 3)
                        .map((item, index) => (
                          <div>
                            <div
                              key={index}
                              className={`ml-${
                                index * 8 + 8
                              } my-2 py-3 px-6 mb-6 bg-gray-100 rounded flex justify-between items-center relative`}
                            >
                              <div>
                                <div>{item.user.username}</div>
                                <div>{item.reply}</div>
                              </div>
                              <div className="absolute flex -bottom-6">
                                {item.user.username === loggedInUser && (
                                  <div className="flex">
                                    <div>
                                      <button
                                        onClick={() => {
                                          handleReplyUpdateBox(item._id);
                                          setUpdateReplyInfo({
                                            reply: item.reply,
                                          });
                                        }}
                                        className="font-semibold text-[14px] mr-3 sm:mr-6 cursor-pointer"
                                      >
                                        Update
                                      </button>
                                    </div>
                                    <div>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          if (
                                            window.confirm(
                                              "Are you sure you want to delete this reply?"
                                            )
                                          ) {
                                            handleDeleteReply(e, item._id);
                                          }
                                        }}
                                        className="font-semibold text-[14px] cursor-pointer"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div>
                              {/* Reply Update box */}
                              {showReplyUpdateBox === item._id && (
                                <div className="bg-gray-200 rounded p-2 mt-8">
                                  <form
                                    onSubmit={(e) =>
                                      handleReplyUpdateSubmit(e, item._id)
                                    }
                                  >
                                    <div>
                                      <textarea
                                        name="replyUpdate"
                                        id="replyUpdate"
                                        className="resize-none bg-white w-full pl-2 pt-2"
                                        rows={4}
                                        value={updateReplyInfo.reply}
                                        onChange={handleChange}
                                      ></textarea>
                                    </div>
                                    <div className="text-end">
                                      <button
                                        type="submit"
                                        className="cursor-pointer bg-black text-white font-semibold px-4 py-2 rounded-xl"
                                      >
                                        Update
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Horizontal line */}
                  <div className="flex justify-center w-full">
                    <hr className="bg-gray-200 border-none h-[0.4px] w-[98%] mb-4" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadComment;
