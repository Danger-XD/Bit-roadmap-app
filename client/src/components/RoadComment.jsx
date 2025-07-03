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
  } = roadPageStore();
  const { username: loggedInUser } = userInfoForAuth;
  const [commentInfo, setCommentInfo] = useState({ comment: "" });
  const [updateInfo, setUpdateInfo] = useState({ comment: "" });
  const [replyInfo, setReplyInfo] = useState({ reply: "" });
  const [showReplyBox, setShowReplyBox] = useState();
  const [showUpdateBox, setShowUpdateBox] = useState();
  const navigate = useNavigate();
  // To get the value written in the comment/reply/update box
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
  const handleReply = (id) => {
    setShowReplyBox(id);
    setShowUpdateBox(null);
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
  const handleDeleteComment = async (commentId) => {
    await deleteCommentRequest(commentId);
    await singlePostCommentRequest(postId);
    await singlePostInfoRequest(postId);
  };
  useEffect(() => {
    const fetchData = async () => {
      await singlePostCommentRequest(postId);
      getCookies("token") ? await userInfoForAuthRequest() : "";
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
        {/* Show comment section */}
        <div className="font-semibold pb-4">Comments:</div>
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
                      <div>
                        <button
                          onClick={() => handleReply(item._id)}
                          className="font-semibold text-[14px] mr-6 cursor-pointer"
                        >
                          Reply
                        </button>
                      </div>
                      {item.User.username === loggedInUser && (
                        <div className="flex">
                          <div>
                            <button
                              onClick={() => {
                                handleUpdateBox(item._id);
                                setUpdateInfo({ comment: item.comment });
                              }}
                              className="font-semibold text-[14px] mr-6 cursor-pointer"
                            >
                              Update
                            </button>
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete this comment?"
                                  )
                                ) {
                                  handleDeleteComment(item._id);
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
                        <form onSubmit={handleReply}>
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
                              onSubmit={handleReply}
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

{
  /* <div className="flex flex-col">
  <div className="ml-8 my-2 py-3 px-6 bg-gray-100 rounded flex justify-between items-center">
    <div className="">
      <div>Name</div>
      <div>REPLY TO THE COMMENT</div>
    </div>
    <div>
      <button>
        <SlOptions />
      </button>
    </div>
  </div>
  <div className="ml-16 py-3 px-6 bg-gray-100 rounded flex justify-between items-center">
    <div>
      <div>Name</div>
      <div>REPLY TO THE COMMENT</div>
    </div>
    <div>
      <button>
        <SlOptions />
      </button>
    </div>
  </div>
  <div className="ml-24 my-2 py-3 px-6 bg-gray-100 rounded flex justify-between items-center">
    <div>
      <div>Name</div>
      <div>REPLY TO THE COMMENT</div>
    </div>
    <div>
      <button>
        <SlOptions />
      </button>
    </div>
  </div>
</div>; */
}
