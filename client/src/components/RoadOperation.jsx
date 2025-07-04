import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { roadPageStore } from "../stores/roadPage.store.js";
import { getCookies } from "../utilities/cookies.js";
import { BiUpvote, BiSolidUpvote } from "react-icons/bi";

const RoadOperation = () => {
  const { postId } = useParams();
  // all the store of api
  const {
    upVoteBoolRequest,
    postUpvoteCheck,
    postUpvoteCheckRequest,
    singlePostInfoRequest,
  } = roadPageStore();

  const [showUpvote, setShowUpvote] = useState();
  // To handle upvote button
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
    // if authorized show/hide button to upvote
    <div className={showUpvote ? "w-full h-10 flex" : "hidden"}>
      <div>
        {/* upvote button situation */}
        {upvoteChecker ? (
          // Upvoted button
          <button onClick={handleClick} className="flex items-center p-2">
            <BiSolidUpvote className="text-orangy text-2xl cursor-pointer" />{" "}
            &nbsp; Upvoted
          </button>
        ) : (
          // To upvote button
          <button onClick={handleClick} className="flex items-center p-2">
            <BiUpvote className="text-orangy text-2xl cursor-pointer" /> &nbsp;
            Upvote
          </button>
        )}
      </div>
    </div>
  );
};

export default RoadOperation;
