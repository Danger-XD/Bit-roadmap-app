import React, { useEffect, useState } from "react";
import { getCookies } from "../utilities/cookies";
import { SlOptions } from "react-icons/sl";
import { roadPageStore } from "../stores/roadPage.store.js";
import { useParams } from "react-router";

const commentsItem = [
  {
    comment: "HEllO FROM COMMENTS",
    user: "John Cena",
  },
  {
    comment: "HEllO FROM COMMENTS",
    user: "John Cena",
  },
  {
    comment: "HEllO FROM COMMENTS",
    user: "John Cena",
  },
  {
    comment: "HEllO FROM COMMENTS",
    user: "John Cena",
  },
  {
    comment: "HEllO FROM COMMENTS",
    user: "John Cena",
  },
  {
    comment: "HEllO FROM COMMENTS",
    user: "John Cena",
  },
  {
    comment: "HEllO FROM COMMENTS",
    user: "John Cena",
  },
  {
    comment: "HEllO FROM COMMENTS",
    user: "John Cena",
  },
];
const RoadComment = () => {
  const { postId } = useParams();
  const { singlePostComment, singlePostCommentRequest } = roadPageStore();
  useEffect(() => {
    const fetchData = async (postId) => {
      await singlePostCommentRequest(postId);
    };
    fetchData(postId);
    // if (getCookies("Token")) {
    //   setIsSecured(true);
    // } else {
    //   setIsSecured(false);
    // }
  }, [postId]);
  return (
    <div className="container h-fit mb-10 rounded-2xl scroll-auto px-3">
      <div className="font-semibold pb-4">Comments:</div>
      <div>
        <div className="bg-orange-300 rounded p-2 mb-4">
          <form action="">
            <div>
              <label htmlFor="comment"></label>
              <textarea
                name="comment"
                id=""
                className="resize-none bg-white w-full pl-2 pt-2"
                rows={4}
              ></textarea>
            </div>
            <div className="text-end">
              <button className="cursor-pointer bg-black text-white font-semibold px-4 py-1 rounded-xl">Submit</button>
            </div>
          </form>
        </div>
        <div>
          {singlePostComment.length === 0 ? (
            <div className="font-semibold text-4xl pb-4">
              No comments found!
            </div>
          ) : (
            <div className="w-full">
              {singlePostComment.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center py-3 px-6 rounded-xl bg-gray-200">
                    <div>
                      {" "}
                      <div className="font-semibold">{item.User.username}</div>
                      <div>{item.comment}</div>
                    </div>
                    <div>
                      <button>
                        <SlOptions />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col">
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
