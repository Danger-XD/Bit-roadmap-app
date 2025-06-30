import React, { useEffect, useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { useParams } from "react-router";
import { roadPageStore } from "../stores/roadPage.store";
import { getCookies } from "../utilities/cookies";

const RoadOperation = () => {
  const { postId } = useParams();
  const [upvote, setUpvote] = useState();
  const { upVoteBool, upVoteBoolRequest } = roadPageStore();
  const handleClick = async () => {
    await upVoteBoolRequest(postId);
  };
  useEffect(()=>{
    if(getCookies("Token")){
      setUpvote(true)
    }else{
      setUpvote(false)
    }
  },[])
  return (
    <div className={upvote?"w-full h-10 flex":"hidden"} >
      <div>
        {upvote ? (
          <button onClick={handleClick} className="flex items-center p-3">
            Upvoted &nbsp; <FaThumbsUp className="text-orangy" />
          </button>
        ) : (
          <button onClick={handleClick}>
            Upvote &nbsp;
            <FaRegThumbsUp className="text-orangy" />
          </button>
        )}
      </div>
    </div>
  );
};

export default RoadOperation;

{/* <div className="comment-btn">
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
</div> */}