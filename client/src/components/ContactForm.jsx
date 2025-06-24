import React from "react";

const ContactForm = () => {
  return (
    <div className="shadow-effect h-fit rounded-2xl p-5">
      <div>
        <h1 className="capitalize font-bold text-3xl text-center mb-5">have any questions?</h1>
      </div>
      <form action="">
        <div>
          <label className="text-gray-600" for="">Full Name</label>
          <input className="w-full shadow-effect rounded-2xl h-[2.2rem] pl-3" type="text" />
        </div>
        <div className="my-4">
          <label className="text-gray-600" for="">Subject</label>
          <input className="w-full shadow-effect rounded-2xl h-[2.2rem] pl-3" type="text" />
        </div>
        <div className="my-4"> 
          <label className="text-gray-600" for="">Email</label>
          <input className="w-full shadow-effect rounded-2xl h-[2.2rem] pl-3" type="email" />
        </div>
        <div className="mb-5">
          <label className="text-gray-600" for="">Message</label>
          <input className="w-full shadow-effect rounded-2xl h-[2.2rem] pl-3" type="textarea" />
        </div>
        <div>
          <button className="w-full bg-black text-white text-xl h-[2.6rem] rounded-2xl font-bold tracking-wider mb-4" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
