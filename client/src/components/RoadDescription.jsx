import { useParams } from "react-router";

const RoadDescription = () => {
  const {postId} = useParams();
  return (
    <div className="w-full h-fit p-3 mb-3">
      <div>
        <span className="font-semibold">Category:</span> Beginner
      </div>
      <div>
        <span className="font-semibold">Post Id:</span> {postId}
      </div>
      <div>
        <br />
        <span className="font-semibold">Description:</span> Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Reiciendis officiis nesciunt
        molestiae temporibus alias numquam sit voluptatem quasi esse ea?
      </div>
    </div>
  );
};

export default RoadDescription;
