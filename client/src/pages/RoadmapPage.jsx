import React from "react";
import RoadImage from "../components/RoadImage";
import RoadOperation from "../components/RoadOperation";
import RoadDescription from "../components/RoadDescription";

const RoadmapPage = () => {
  return (
    <div className="container h-screen">
      <RoadImage />
      <RoadOperation />
      <RoadDescription />
    </div>
  );
};

export default RoadmapPage;
