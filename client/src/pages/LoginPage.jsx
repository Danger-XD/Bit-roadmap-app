import { Link } from "react-router";
import Footer from "../layouts/Footer";

const LoginPage = () => {
  return (
    <div className="container h-screen flex flex-col justify-between items-center">
      <div className="w-full h-[6rem] mt-5">
        <Link to={"/"} className="font-extrabold text-4xl text-start"><span className="text-orangy">Bit</span>Road</Link>
      </div>
      <div>
        <div className="w-[22rem] h-[22rem] mb-14 shadow-effect flex-job flex-col rounded">
          <h2 className="font-extrabold text-4xl">Login</h2>
          <form action="">
            <div className="my-4">
              <label className="text-gray-600">Email</label>
              <input
                className="shadow-effect rounded-2xl w-full h-[2.2rem] pl-3"
                type="text"
                name="email"
              />
            </div>
            <div className="mb-5">
              <label className="text-gray-600">Password</label>
              <input
                className="shadow-effect rounded-2xl w-full h-[2.2rem] pl-3"
                type="password"
                name="password"
              />
            </div>
            <div>
              <button
                className="bg-black text-white text-xl w-full h-[2.5rem] rounded-2xl font-bold tracking-wider mb-4"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <div>
            <Link className="text-orangy font-semibold" to="/signup">
              Create an account?
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

export default LoginPage;
