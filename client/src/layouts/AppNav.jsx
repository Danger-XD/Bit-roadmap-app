import { Link } from "react-router";

const navItems = [
    {page:"/", option:"Home"},
    {page:"/roadmap",option:"Roadmap"},
    {page:"/contact",option:"Contact us"}
];
const logItems = [{page:"/login", option:"Login"},
    {page:"/",option:"Logout"}
]
const AppNav = () => {
  return (
    <>
      <div className="navbar container">
        <nav className="h-24 mb-8 flex justify-between items-center">
          <div className="logo font-extrabold text-4xl"><Link to={"/"}><span className="text-orangy">Bit</span>Road</Link></div>
          <div>
            <ul className="flex">
              {navItems.map((item, index) => (
                <li key={index} className="font-bold text-xl tracking-wide mx-3">
                  <Link to={item.page}>
                    {item.option}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="flex">
              {logItems.map((item, index) => (
                <li key={index} className="font-bold text-xl tracking-wide mx-3">
                  <Link to={item.page}>
                    {item.option}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default AppNav;
