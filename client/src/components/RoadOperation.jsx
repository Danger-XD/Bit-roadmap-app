import React, { useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";

const RoadOperation = () => {
  const [upvote, setUpvote] = useState(true);
  const [bookmark, setBookmark] = useState(true);
  return (
    <div className="w-full h-10 flex">
      <div className="upvote-btn">
        {upvote ? (
          <p className="flex items-center p-3">
            Upvoted &nbsp; <FaThumbsUp className="text-orangy" />
          </p>
        ) : (
          <p>
            Upvote &nbsp;
            <FaRegThumbsUp className="text-orangy" />
          </p>
        )}
      </div>
    <div className="comment-btn">
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
      </div>
    </div>
  );
};

export default RoadOperation;
