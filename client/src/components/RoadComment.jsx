import React, { useEffect, useState } from "react";
import { getCookies } from "../utilities/cookies";
import { SlOptions } from "react-icons/sl";

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
  const [isSecured, setIsSecured] = useState(false);
  //   useEffect(() => {
  //     if (getCookies("Token")) {
  //       setIsSecured(true);
  //     } else {
  //       setIsSecured(false);
  //     }
  //   }, []);
  return (
    <div className="container h-fit mb-10 rounded-2xl scroll-auto px-3">
      <div className="font-semibold pb-4">Comments:</div>
      <div>
        {isSecured ? (
          <div className="font-semibold text-4xl pl-2 pb-4">
            No comments found!
          </div>
        ) : (
          <div className="w-[70%]">
            {commentsItem.map((item, index) => (
              <div>
                <div
                  key={index}
                  className="flex justify-between items-center p-3 rounded-xl bg-gray-200"
                >
                  <div>
                    {" "}
                    <div className="font-semibold">{item.user}</div>
                    <div>{item.comment}</div>
                  </div>
                  <div>
                    <button>
                      <SlOptions />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="ml-12 my-2 p-2 bg-gray-100 rounded flex justify-between items-center">
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
                  <div className="ml-14 p-2 bg-gray-100 rounded flex justify-between items-center">
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
                  <div className="ml-16 my-2 p-2 bg-gray-100 rounded flex justify-between items-center">
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
  );
};

export default RoadComment;
