import { Link } from "react-router";

const roadmapItems = [
  {
    category: "role based roadmaps",
    roadmaps: [
      "Frontend",
      "Backend",
      "DevOps",
      "Full Stack",
      "Android",
      "Game",
    ],
  },
  {
    category: "skill based roadmaps",
    roadmaps: [
      "SQL",
      "Computer Science",
      "React",
      "JavaScript",
      "Python",
      "Node.js",
    ],
  },
];

const RoadContents = () => {
  return (
    <>
      <div className="container h-screen relative mt-[3rem]">
        <div className="category-filter absolute top-0 right-0">
          <label className="font-bold" for="category">
            Filter:
          </label>
          <select
            className="ml-3 shadow-effect p-2 rounded-2xl "
            name="category"
            id="category"
          >
            <option selected hidden disabled>
              Category
            </option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
        <div className="pt-10">
          {roadmapItems.map((items, index) => (
            <div className="w-full flex flex-col items-center" key={index}>
              <h2 className="border w-fit my-7 shadow-2xl px-5 py-3 font-semibold rounded-2xl border-orangy capitalize ">
                {items.category}
              </h2>
              <div className="w-full sm:w-3xl grid grid-cols-3 gap-3">
                {items.roadmaps.map((items, index) => (
                  <Link to={"/roadmap"}>
                    <div
                      className="h-full flex justify-between px-5 py-2 border rounded-2xl"
                      key={index}
                    >
                      <p>{items}</p>
                      <p>⭐22k</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RoadContents;
