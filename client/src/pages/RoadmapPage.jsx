import RoadImage from "../components/RoadImage";
import RoadOperation from "../components/RoadOperation";
import RoadDescription from "../components/RoadDescription";
import RoadComment from "../components/RoadComment";

const RoadmapPage = () => {
  return (
    <div className="container h-fit">
      <RoadImage />
      <RoadOperation />
      <RoadDescription />
      <RoadComment/>
    </div>
  );
};

export default RoadmapPage;
