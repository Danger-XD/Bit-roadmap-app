import { useParams } from "react-router";
import { roadPageStore } from "../stores/roadPage.store.js";
import { useEffect } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";

const RoadDescription = () => {
  const { postId } = useParams();
  const { singlePostInfo, singlePostInfoRequest } = roadPageStore();
  const { category, title,upvoteCounts,commentCounts } = singlePostInfo;
  useEffect(() => {
    const fetchData = async (postId) => {
      await singlePostInfoRequest(postId);
    };
    fetchData(postId);
  }, [postId]);
  return (
    <div className="w-full h-fit px-2 sm:p-3 mb-2">
      <div className="flex justify-between mt-2 mb-1">
        {/* post category and id */}
        <div>
          <div className="text-xl sm:text-3xl mb-1">
            <span className="font-semibold">Title:</span>&nbsp;
            {title}
          </div>
          <div className="capitalize mb-1">
            <span className="font-semibold">Category:</span>&nbsp;
            {category}
          </div>
          <div>
            <span className="font-semibold">Post Id:</span>&nbsp;{postId}
          </div>
        </div>
        {/* post upvote and comment count */}
        <div>
          <div className="flex">
            <div className="flex items-center"><BiUpvote className="text-orangy text-xl sm:text-2xl" />&nbsp;{upvoteCounts}</div>
            <div className="flex items-center pl-2"><FaRegCommentAlt className="text-orangy text-xl" />&nbsp;{commentCounts}</div>
          </div>
        </div>
      </div>
      {/* post description */}
      <div>
        <span className="font-semibold">Description:</span> Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Reiciendis officiis nesciunt
        molestiae temporibus alias numquam sit voluptatem quasi esse ea?
      </div>
    </div>
  );
};

export default RoadDescription;
