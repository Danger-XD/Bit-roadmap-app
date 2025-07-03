import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { roadPageStore } from "../stores/roadPage.store.js";
import { getCookies } from "../utilities/cookies.js";
import { BiUpvote, BiSolidUpvote } from "react-icons/bi";

const RoadOperation = () => {
  const { postId } = useParams();
  const {
    upVoteBoolRequest,
    postUpvoteCheck,
    postUpvoteCheckRequest,
    singlePostInfoRequest,
  } = roadPageStore();

  const [showUpvote, setShowUpvote] = useState();
  const handleClick = async () => {
    await upVoteBoolRequest(postId);
    await postUpvoteCheckRequest(postId);
    await singlePostInfoRequest(postId);
  };

  const { post: upvoteChecker } = postUpvoteCheck;
  useEffect(() => {
    const token = getCookies("token");
    if (token) {
      setShowUpvote(true);
      const fetchData = async () => {
        await postUpvoteCheckRequest(postId);
        await singlePostInfoRequest(postId);
      };
      fetchData();
    } else {
      setShowUpvote(false);
    }
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
