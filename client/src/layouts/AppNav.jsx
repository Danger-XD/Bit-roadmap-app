import { Link, NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import userStore from "../stores/users.store";
import { deleteCookies, getCookies } from "../utilities/cookies";

const navItems = [
  { page: "/", option: "Home" },
  { page: "/roadmap", option: "Roadmap" },
  { page: "/contact", option: "Contact us" },
];

const AppNav = () => {
  const { isAuthentic } = userStore();
  const [authentic, setAuthentic] = useState(isAuthentic);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthentic(false);
    deleteCookies("Token");
  };
  useEffect(() => {
    if (getCookies("Token")) {
      setAuthentic(true);
    } else {
      setAuthentic(false);
    }
  }, [userStore, handleLogout]);
  return (
    <>
      <div className="container">
        <nav className="h-16 my-8 px-10 flex justify-between items-center border-2 rounded-4xl">
          <div className="logo font-extrabold text-4xl">
            <Link to={"/"}>
              <span className="text-orangy">Bit</span>Road
            </Link>
          </div>
          <div>
            <ul className="flex">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="font-bold text-xl tracking-wide mx-3"
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
                <li className="font-bold text-xl tracking-wide mx-3">
                  <Link to={"/"} onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              ) : (
                <>
                  <li className="font-bold text-xl tracking-wide mx-3">
                    <Link to={"/auth/login"}>Login</Link>
                  </li>
                  <li className="font-bold text-xl tracking-wide mx-3">
                    <Link to={"/auth/signup"}>Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default AppNav;
