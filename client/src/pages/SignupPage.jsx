import { useState } from "react";
import { Link, useNavigate } from "react-router";
import userStore from "../stores/users.store.js";
import { handleError, handleSuccess } from "../utilities/toasts.js";

const SignupPage = () => {
  // set initial information
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  // get instances from store
  const { signupResponse, signupRequest } = userStore();
  // navigate instance
  const navigate = useNavigate();
  // set value for change in form
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setRegisterInfo((state) => ({
      ...state,
      [name]: value,
    }));
  };
  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = registerInfo;
    if (!username || !email || !password) {
      handleError("All fields are required!");
      return;
    }
    try {
      await signupRequest(registerInfo); // status, message, user->id and email
      const { status, message, user } = signupResponse;
      if (status) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/auth/login");
        }, 1000);
      }
    } catch (error) {
      handleError(error.message);
    }
  };
  return (
    <>
      <div className="w-[19rem] sm:w-[24rem] h-fit py-8 mt-10 sm:mt-0 mb-24 shadow-effect flex justify-center items-center flex-col rounded">
        <h2 className="font-extrabold text-3xl sm:text-4xl">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label className="text-gray-600">Username:</label>
            <input
              className="shadow-effect rounded-2xl w-full h-[2.2rem] pl-3"
              type="text"
              name="username"
              value={registerInfo.username}
              onChange={handleChanges}
            />
          </div>
          <div className="my-3">
            <label className="text-gray-600">Email:</label>
            <input
              className="shadow-effect rounded-2xl w-full h-[2.2rem] pl-3"
              type="email"
              name="email"
              value={registerInfo.email}
              onChange={handleChanges}
            />
          </div>
          <div>
            <label className="text-gray-600">Password:</label>
            <input
              className="shadow-effect rounded-2xl w-full h-[2.2rem] pl-3"
              type="password"
              name="password"
              value={registerInfo.password}
              onChange={handleChanges}
            />
          </div>
          <div className="my-5">
            <button
              className="cursor-pointer bg-black text-white text-xl w-full h-[2.5rem] rounded-2xl font-bold tracking-wider"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div>
          <Link className="text-orangy font-semibold" to="/auth/login">
            Already have an account?
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
