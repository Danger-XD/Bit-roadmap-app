import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { handleError, handleSuccess } from "../utilities/toasts";
import userStore from "../stores/users.store";
import { setCookies } from "../utilities/cookies";

const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const { loginInfoRequest } = userStore();
  const navigate = useNavigate();
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setLoginInfo((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      handleError("Fields cannot be empty!");
      return;
    }
    const { status, message, token } = await loginInfoRequest(loginInfo);
    if (status) {
      setCookies("token", token);
      handleSuccess(message);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };
  return (
    <>
      <div className="w-[20rem] sm:w-[22rem] h-fit py-8 mt-10 sm:mt-0 mb-24 shadow-effect flex-job flex-col rounded">
        <h2 className="font-extrabold text-3xl sm:text-4xl">Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="my-4">
            <label className="text-gray-600">Email</label>
            <input
              className="shadow-effect rounded-2xl w-full h-[2.2rem] pl-3"
              type="text"
              name="email"
              value={loginInfo.email}
              onChange={handleChanges}
            />
          </div>
          <div className="mb-5">
            <label className="text-gray-600">Password</label>
            <input
              className="shadow-effect rounded-2xl w-full h-[2.2rem] pl-3"
              type="password"
              name="password"
              value={loginInfo.password}
              onChange={handleChanges}
            />
          </div>
          <div>
            <button
              className="cursor-pointer bg-black text-white text-xl w-full h-[2.5rem] rounded-2xl font-bold tracking-wider mb-4"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div>
          <Link className="text-orangy font-semibold" to="/auth/signup">
            Create an account?
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
