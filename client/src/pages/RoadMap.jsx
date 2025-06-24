import PageLayout from "../layouts/PageLayout";
import RoadImage from "../components/RoadImage";
import RoadOperation from "../components/RoadOperation";
import RoadDescription from "../components/RoadDescription";

const RoadMap = () => {
  return (
    <PageLayout>
      <div className="container h-screen">
        <RoadImage />
        <RoadOperation />
        <RoadDescription/>
      </div>
    </PageLayout>
  );
};

export default RoadMap;
