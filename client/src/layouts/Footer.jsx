import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="container mt-14">
      <div className="w-full grid px-2 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-8">
        {/* Footer: short description box */}
        <div className="mb-6 sm:mb-0">
          <h3 className="font-extrabold text-4xl mb-4">
            <span className="text-orangy">Bit</span>Road
          </h3>
          <p className="font-semibold text-justify">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum,
            natus! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur optio nisi doloremque doloribus ad veritatis unde
            blanditiis facere itaque molestiae.
          </p>
        </div>
        {/* Footer: important links box */}
        <div className="w-full flex flex-col items-center mb-6 sm:mb-0">
          <div>
            <h3 className="font-bold text-3xl mb-2">Bit Apps</h3>
          </div>
          <div className="flex flex-col items-center font-semibold">
            <Link>About Us</Link>
            <Link>Contact Us</Link>
            <Link>Privacy Policy</Link>
            <Link>Refund Policy</Link>
            <Link>Tax & VAT Guideline</Link>
            <Link>Terms & Conditions</Link>
            <Link>Affiliates</Link>
            <Link>Account</Link>
          </div>
        </div>
        {/* Footer: newsletter subscription box */}
        <div className="flex justify-center w-full">
          <div className="flex flex-col px-5 py-8 w-[20rem] sm:w-full rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl text-white font-semibold bg-[url(https://cdn.pixabay.com/photo/2021/09/17/11/32/flowers-6632403_640.png)]">
            <h3 className="mb-2 text-xl text-white font-serif">
              Subscribe Our Newsletter!
            </h3>
            <form action="">
              <div>
                <input
                  type="email"
                  className="w-full pl-2 mb-2 bg-white text-black rounded h-10"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="border-4 border-black font-serif p-4 rounded-xl cursor-pointer hover:bg-pink-600 hover:text-white bg-white text-black"
                >
                  Subscribe Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer: Copy right and social media box */}
      <div className="flex justify-between items-center w-full mb-10 px-2 sm:px-6 py-4 border-2 rounded-4xl">
        <div className="font-semibold">BitApps@2024 CopyRight</div>
        <div className="flex items-center">
          <div className="mr-1 sm:mr-3">Follow Us:</div>
          <div className="mr-1 sm:mr-3 border rounded-4xl p-2 cursor-pointer">
            <Link to={"/"}>
              <FaFacebookF />
            </Link>
          </div>
          <div className="mr-1 sm:mr-3 border rounded-4xl p-2 cursor-pointer">
            <Link to={"/"}>
              <FaYoutube />
            </Link>
          </div>
          <div className="border rounded-4xl p-2 cursor-pointer">
            <Link to={"/"}>
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
