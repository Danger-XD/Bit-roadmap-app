import { Link } from "react-router";
import Footer from './../layouts/Footer';

const SignupPage = () => {
  return (
    <div className="container h-screen flex flex-col justify-between items-center">
      <div className="w-full h-[6rem] mt-5">
        <Link to={"/"} className="font-extrabold text-4xl text-start"><span className="text-orangy">Bit</span>Road</Link>
      </div>
      <div>
        <div className="w-[24rem] h-[26rem] mb-16 shadow-effect flex-job flex-col rounded">
          <h2 className="font-extrabold text-4xl">Sign up</h2>
          <form action="">
            <div className="my-4">
              <label className="text-gray-600">Username:</label>
              <input
                className="shadow-effect rounded-2xl w-full h-[2.2rem] pl-3"
                type="text"
                name="username"
              />
            </div>
            <div className="my-3">
              <label className="text-gray-600">Email:</label>
              <input
                className="shadow-effect rounded-2xl w-full h-[2.2rem] pl-3"
                type="email"
                name="email"
              />
            </div>
            <div>
              <label className="text-gray-600">Password:</label>
              <input
                className="shadow-effect rounded-2xl w-full h-[2.2rem] pl-3"
                type="password"
                name="password"
              />
            </div>
            <div className="my-5">
              <button
                className="bg-black text-white text-xl w-full h-[2.5rem] rounded-2xl font-bold tracking-wider"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div>
            <Link className="text-orangy font-semibold" to="/login">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default SignupPage;
