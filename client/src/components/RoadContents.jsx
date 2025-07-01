import { Link } from "react-router";
import { roadmapStore } from "../stores/roadmap.store.js";
import { useEffect } from "react";
import { BiUpvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";

const RoadContents = () => {
  // get the store
  const { responseItems, responseItemsRequest, filterItemsRequest } =
    roadmapStore();
  const handleSelection = async (e) => {
    await filterItemsRequest(e.target.value)
  };
  useEffect(() => {
    responseItemsRequest();
  }, []);
  return (
    <>
      <div className="category-filter absolute top-0 right-0">
        <label className="font-bold" name="category">
          Filter:
        </label>
        <select
          className="ml-3 shadow-effect p-2 rounded-2xl "
          name="category"
          id="category"
          onChange={handleSelection}
        >
          <option selected="selected" hidden disabled>
            Category
          </option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>
      <div>
        <div className="w-full mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {responseItems.map((item, index) => (
            <Link to={`/roadmap/one/${item._id}`} key={index}>
              <div className="h-full font-semibold flex justify-between px-5 py-2 border rounded-2xl hover:text-white hover:bg-orangy">
                <p>{item.title}</p>
                <div className="flex">
                  <p className="flex justify-center items-center"><BiUpvote />&nbsp;{item.upvoteCounts}</p>
                  <p className="flex justify-center items-center pl-3"><FaRegCommentAlt />&nbsp;{item.commentCounts}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default RoadContents;

{/* {responseItems.map((items, index) => (
  <div className="w-full flex flex-col items-center" key={index}>
    <h2 className="border w-fit my-7 shadow-2xl px-5 py-3 font-semibold rounded-2xl border-orangy capitalize ">
      {items.category}
    </h2>
    <div className="w-full sm:w-3xl grid grid-cols-3 gap-3">
      {responseItems.map((items, index) => (
        <Link to={"/roadmap"}>
          <div
            className="h-full flex justify-between px-5 py-2 border rounded-2xl"
            key={index}
          >
            <p>{items.title}</p>
            <p>⭐22k</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
))} */}