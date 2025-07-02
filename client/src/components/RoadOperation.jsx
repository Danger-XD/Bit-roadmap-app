import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { roadPageStore } from "../stores/roadPage.store.js";
import { getCookies } from "../utilities/cookies.js";
import { BiUpvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";

const RoadOperation = () => {
  const { postId } = useParams();
  const [showUpvote, setShowUpvote] = useState();
  const {
    upVoteBoolRequest,
    postUpvoteCheck,
    postUpvoteCheckRequest,
    singlePostInfoRequest,
  } = roadPageStore();
  const handleClick = async () => {
    await upVoteBoolRequest(postId);
    await postUpvoteCheckRequest(postId);
    await singlePostInfoRequest(postId);
  };
  const { post: upvoteChecker } = postUpvoteCheck;
  useEffect(() => {
    const token = getCookies("token");
    setShowUpvote(token);
    const fetchData = async (postId) => {
      await postUpvoteCheckRequest(postId);
    };
    showUpvote ? fetchData(postId) : "";
  }, [postId]);
  return (
    <div className={showUpvote ? "w-full h-10 flex" : "hidden"}>
      <div>
        {upvoteChecker ? (
          <button onClick={handleClick} className="flex items-center p-3">
            <BiSolidUpvote className="text-orangy text-2xl cursor-pointer" />{" "}
            &nbsp; Upvoted
          </button>
        ) : (
          <button onClick={handleClick} className="flex items-center p-3">
            <BiUpvote className="text-orangy text-2xl cursor-pointer" /> &nbsp;
            Upvote
          </button>
        )}
      </div>
    </div>
  );
};

export default RoadOperation;

{
  /* <div className="comment-btn">
  <p className="flex items-center p-3">
    Comments &nbsp; <FaCommentAlt className="text-orangy" />
  </p>
</div>
<div className="bookmark-btn">
  {bookmark ? (
    <p className="flex items-center p-3">
      Bookmarked &nbsp; <FaBookmark className="text-orangy" />
    </p>
  ) : (
    <p>
      Bookmark &nbsp;
      <FaRegBookmark className="text-orangy" />
    </p>
  )}
</div> */
}
