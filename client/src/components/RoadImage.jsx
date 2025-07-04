import React from "react";

const RoadImage = () => {
  return (
    <div>
      {/* Mobile screen */}
      <div className="w-full sm:hidden flex justify-center">
        <img
          src="https://placehold.co/400x400"
          className="border-2"
          alt="Placeholder of Roadmap Image"
        />
      </div>
      {/* Tab screen */}
      <div className="w-full hidden sm:flex md:hidden justify-center">
        <img
          src="https://placehold.co/600x400"
          className="border-2"
          alt="Placeholder of Roadmap Image"
        />
      </div>
      {/* Over tab screen */}
      <div className="w-full hidden md:flex justify-center">
        <img
          src="https://placehold.co/800x400"
          className="border-2"
          alt="Placeholder of Roadmap Image"
        />
      </div>
    </div>
  );
};

export default RoadImage;
