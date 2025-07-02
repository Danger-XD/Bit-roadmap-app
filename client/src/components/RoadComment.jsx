import React, { useEffect, useState } from "react";
import { getCookies } from "../utilities/cookies";
import { roadPageStore } from "../stores/roadPage.store.js";
import { useNavigate, useParams } from "react-router";
import { handleError } from "../utilities/toasts.js";

const RoadComment = () => {
  const { postId } = useParams();
  const {
    createCommentRequest,
    singlePostComment,
    singlePostCommentRequest,
    userInfoForAuth,
    userInfoForAuthRequest,
  } = roadPageStore();
  const { username: loggedInUser } = userInfoForAuth;
  const [commentInfo, setCommentInfo] = useState({ comment: "" });
  const [replyInfo, setReplyInfo] = useState({ reply: "" });
  const [showReplyBox, setShowReplyBox] = useState();
  const [showUpdateBox, setShowUpdateBox] = useState();
  const navigate = useNavigate();
  // To get the value written in the comment/reply box
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "comment") {
      setCommentInfo((state) => ({
        ...state,
        [name]: value,
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
    setCommentInfo({ comment: "" });
  };
  const handleReply = (id) => {
    setShowReplyBox(id);
    // const { _id: commentId } = item;
  };
  const handleReplyUpdate = (id) => {
    setShowUpdateBox(id);
    // const { _id: commentId } = item;
  };
  useEffect(() => {
    const fetchData = async (postId) => {
      await singlePostCommentRequest(postId);
      getCookies("token") ? await userInfoForAuthRequest() : "";
    };
    fetchData(postId);
  }, [postId]);
  return (
    <div className="container h-fit mb-10 rounded-2xl scroll-auto px-3">
      <div className="bg-orange-300 rounded p-2 mb-4">
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
                              onClick={() => handleReplyUpdate(item._id)}
                              className="font-semibold text-[14px] mr-6 cursor-pointer"
                            >
                              Update
                            </button>
                          </div>
                          <div>
                            <button className="font-semibold text-[14px] cursor-pointer">
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    {showReplyBox === item._id && (
                      <div className="bg-gray-200 rounded p-2 mb-4">
                        <form onSubmit={handleCommentSubmit}>
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
                    {showUpdateBox === item._id && (
                      <div className="bg-gray-200 rounded p-2 mb-4">
                        <form onSubmit={handleCommentSubmit}>
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
