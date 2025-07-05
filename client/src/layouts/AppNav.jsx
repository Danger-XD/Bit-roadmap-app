import { Link, NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import userStore from "../stores/users.store";
import { deleteCookies, getCookies } from "../utilities/cookies";
import { FaGripLines } from "react-icons/fa";

const navItems = [
  { page: "/", option: "Home" },
  { page: "/roadmap", option: "Roadmap" },
  { page: "/contact", option: "Contact us" },
];

const AppNav = () => {
  const { isAuthentic } = userStore();
  const [authentic, setAuthentic] = useState(isAuthentic);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthentic(false);
    deleteCookies("token");
  };
  useEffect(() => {
    if (getCookies("token")) {
      setAuthentic(true);
    } else {
      setAuthentic(false);
    }
  }, [userStore, handleLogout]);
  return (
    <>
      <div className="container flex justify-center">
        <nav className="h-fit w-[22rem] sm:w-full sm:h-16 mt-8 sm:mb-8 p-3 sm:px-4 md:px-10 flex justify-between items-center border-2 rounded-4xl">
          {/* Navbar when in phone */}
          <div className="w-full sm:hidden">
            <div
              className={
                showOptions
                  ? "hidden"
                  : "flex justify-between items-center w-full"
              }
            >
              <div className="font-extrabold text-2xl sm:hidden">
                <Link to={"/"}>
                  <span className="text-orangy">Bit</span>Road
                </Link>
              </div>
              <div className="sm:hidden">
                <div>
                  <button
                    type="button"
                    onClick={() => setShowOptions(!showOptions)}
                  >
                    <FaGripLines />
                  </button>
                </div>
              </div>
            </div>
            <div className={showOptions ? "flex flex-col w-full" : "hidden"}>
              <div className="flex justify-between items-center w-full pb-2">
                <div className="font-extrabold text-2xl sm:text-4xl">
                  <Link to={"/"}>
                    <span className="text-orangy">Bit</span>Road
                  </Link>
                </div>
                <div className="sm:hidden">
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowOptions(!showOptions)}
                    >
                      <FaGripLines />
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <ul className="flex flex-col">
                      {/* route options */}
                      {navItems.map((item, index) => (
                        <li
                          key={index}
                          className="font-bold text-xl tracking-wide"
                        >
                          <NavLink
                            to={item.page}
                            className={({ isActive }) =>
                              `${isActive ? "text-orangy" : "text-black"}`
                            }
                            onClick={() => setShowOptions(!showOptions)}
                          >
                            {item.option}
                          </NavLink>
                        </li>
                      ))}
                      {/* auth options */}
                      {authentic ? (
                        <li className="font-bold text-xl tracking-wide">
                          <Link
                            to={"/"}
                            onClick={() => {
                              handleLogout();
                              setShowOptions(!showOptions);
                            }}
                          >
                            Logout
                          </Link>
                        </li>
                      ) : (
                        <>
                          <li className="font-bold text-xl tracking-wide">
                            <Link
                              to={"/auth/login"}
                              onClick={() => setShowOptions(!showOptions)}
                            >
                              Login
                            </Link>
                          </li>
                          <li className="font-bold text-xl tracking-wide">
                            <Link
                              to={"/auth/signup"}
                              onClick={() => setShowOptions(!showOptions)}
                            >
                              Register
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navbar for whole screen */}
          <div className="hidden sm:flex sm:justify-between sm:items-center sm:w-full">
            <div>
              <div className="font-extrabold sm:text-3xl md:text-4xl">
                <Link to={"/"}>
                  <span className="text-orangy">Bit</span>Road
                </Link>
              </div>
            </div>
            <div>
              <ul className="flex">
                {navItems.map((item, index) => (
                  <li
                    key={index}
                    className="font-bold text-xl tracking-wide sm:mx-1 md:mx-2"
                  >
                    <NavLink
                      to={item.page}
                      className={({ isActive }) =>
                        `${isActive ? "text-orangy" : "text-black"}`
                      }
                    >
                      {item.option}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul className="flex">
                {authentic ? (
                  <li className="font-bold text-xl tracking-wide">
                    <Link to={"/"} onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                ) : (
                  <>
                    <li className="font-bold text-xl tracking-wide sm:mr-2 md:mx-3">
                      <Link to={"/auth/login"}>Login</Link>
                    </li>
                    <li className="font-bold text-xl tracking-wide">
                      <Link to={"/auth/signup"}>Register</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default AppNav;
