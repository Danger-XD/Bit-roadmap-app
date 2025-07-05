const instructionItem = [
  {
    reason: "Our roadmaps are expert-checked for accuracy and quality.",
  },
  {
    reason:
      "Step-by-step guidance to help you learn efficiently and stay on track.",
  },
  {
    reason:
      "Regularly updated to reflect industry trends and job market demands.",
  },
  {
    reason: "Covers beginner to advanced levels so anyone can follow along.",
  },
  {
    reason:
      "Includes project ideas and milestones to help build a strong portfolio.",
  },
  {
    reason: "Trusted by thousands of learners and developers worldwide.",
  },
  {
    reason:
      "Designed to save you time by removing guesswork from your learning journey.",
  },
];

const Instructions = () => {
  return (
    <div className="container flex flex-col my-[4rem] px-2 sm:px-0">
      <div className="w-full mb-6 ">
        <h1 className="text-4xl text-orangy font-bold text-center">
          Why Choose Our Roadmaps?
        </h1>
      </div>
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {instructionItem.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold text-lg">
                {index + 1}
              </div>
              <p className="text-lg font-medium text-gray-800">{item.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instructions;
