import image1 from "../assets/images/roadmap.jpg"

const HeroContents = () => {
  return (
    <div className="container my-0 sm:my-10 flex flex-col sm:flex-row">
      {/* Right part of Hero */}
      <div className="text-side flex flex-col justify-center text-center sm:text-start h-70 w-full sm:w-1/2">
        <h1 className="font-extrabold text-5xl sm:text-6xl">
          <span className="text-orangy">Bit</span>Road
        </h1>
        <br />
        <p className="capitalize font-semibold text-2xl sm:text-3xl">
          Get a clear, practical, and realistic{" "}
          <span className="text-orangy font-bold">roadmap</span> to achieve your{" "}
          <span className="text-orangy font-bold">goal</span>!
        </p>
      </div>
      {/* Left part of Hero */}
      <div className="image-side flex justify-center sm:justify-end h-70 w-full sm:w-1/2">
        <img
          className="rounded-2xl h-full"
          src={image1}
          alt="roadmap image"
        />
      </div>
    </div>
  );
};

export default HeroContents;
