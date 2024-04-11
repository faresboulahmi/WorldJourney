import { FaSearch, FaVirus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Logout from "./Logout";
import { FaXmark } from "react-icons/fa6";
import AdminHeader from "./AdminHeader";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [nav, setNav] = useState("right-[-100%] w-0");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  var createCounter = function (n) {
    n = 10;
    return n++;
  };
  createCounter;

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
    setNav("right-[-100%] w-0");
  }, [location.search, location.href]);
  return (
    <header className="bg-[#FEFCFB] max-w-full ">
      <div className="flex flex-row-reverse sm:flex-row justify-between items-center max-w-6xl mx-auto p-3 ">
        <div className="hidden sm:inline">
        <Link to="/">
          <h1 className="font-bold  text-sm sm:text-xl flex flex-wrap ">
            <span className="text-gray-900">World</span>
            <span className="text-orange-500">Journey</span>
          </h1>
        </Link>
        </div>
        <button onClick={() => setNav("right-0 w-full")} className="sm:hidden ">
                <GiHamburgerMenu className="text-2xl" />
              </button>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-3 rounded-lg flex items-center ml-10 sm:w-[200px] lg:w-64"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent font-semibold focus:outline-none w-24   sm:w-40 lg:w-64 text-orange-500 "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-gray-900" />
          </button>
        </form>
        <ul className="w-0 sm:w-fit flex justify-center items-center  gap-4 flex-grow-2">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 font-semibold hover:underline hover:text-orange-500">
              Home
            </li>
          </Link>
          <Link to="/Tour">
            <li className=" hidden sm:inline text-slate-700 font-semibold hover:underline  hover:text-orange-500">
              Tour
            </li>
          </Link>

          {/* {switch between Dashboard for admin and wishlist for user} */}
          {currentUser ? (
            <div >
              {currentUser.role === "admin" ||
              currentUser.role === "MainAdmin" ? (
                
                <div className="hidden sm:inline w-full ">
                  <AdminHeader />
                </div>
              ) : (
                <Link to="/WishList">
                  <li className="hidden sm:inline text-slate-700 font-semibold hover:underline  hover:text-orange-500">
                    WishList
                  </li>
                </Link>
              )}
            </div>
          ) : (
            !currentUser && (
              <Link to="/WishList">
                <li className="hidden sm:inline text-slate-700 font-semibold hover:underline  hover:text-orange-500">
                  WishList
                </li>
              </Link>
            )
          )}
        </ul>
        <ul className="w-0 sm:w-fit flex gap-4 flex-grow-2">
          {location.pathname === "/sign-in" ||
          location.pathname === "/sign-up" ||
          location.pathname === "/profile" ? null : (
            <>
              <Link to="/profile">
                {currentUser ? (
                  <img
                    className="rounded-full h-8 w-8 object-cover m-4 sm:m-2"
                    src={currentUser.avatar}
                    alt="profile"
                  />
                ) : (
                  <li className=" text-slate-700 font-semibold hover:underline p-2 hover:text-orange-500">
                    {" "}
                    Sign in
                  </li>
                )}
              </Link>
              <div className="hidden sm:inline ">
                <Logout />
              </div>
            </>
          )}
        </ul>
             
      </div>
      <div
        className={`fixed  ${nav} transition-all h-full max-w-full flex flex-col items-end p-3 top-0 bg-[#FEFCFB] z-40`}
      >
        <button onClick={() => setNav("right-[-100%] w-0")}>
          <FaXmark className="text-3xl" />
        </button>
        <ul className="flex gap-4 flex-grow-2  w-full flex-col items-center">
          {location.href.slice(-1) !== "/" && (
            <Link to="/" className="w-full">
              <li className=" bg-white w-[90%] mx-auto my-2 p-4 text-center font-semibold  rounded-lg text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-white transition-all">
                Home
              </li>
            </Link>
          )}
          <Link to="/Tour" className="w-full">
            <li className="bg-white w-[90%] mx-auto my-2 p-4 text-center font-semibold  rounded-lg text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-white transition-all">
              Tour
            </li>
          </Link>

          {/* {switch between Dashboard for admin and wishlist for user} */}
          {currentUser ? (
            <div className="w-full">
              {currentUser.role === "admin" ||
              currentUser.role === "MainAdmin" ? (
                <AdminHeader />
              ) : (
                <Link to="/WishList" className="w-full">
                  <li className="bg-white w-[90%] mx-auto my-2 p-4 text-center font-semibold  rounded-lg text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-white transition-all">
                    WishList
                  </li>
                </Link>
              )}
            </div>
          ) : (
            !currentUser && (
              <Link to="/WishList" className="w-full">
                <li className="bg-white w-[90%] mx-auto my-2 p-4 text-center font-semibold  rounded-lg text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-white transition-all">
                  WishList
                </li>
              </Link>
            )
          )}
        </ul>
        <ul className="flex gap-4 flex-col items-center flex-grow-2 mx-auto my-2 w-full ">
          {location.pathname === "/sign-in" ||
          location.pathname === "/sign-up" ||
          location.pathname === "/profile" ? null : (
            <div className="w-[90%] mx-auto  flex-col flex items-center gap-4">
              <Link to="/profile" className="w-full ">
                {currentUser ? (
                  <li className=" bg-white w-full mx-auto my-2 p-4 text-center font-semibold  rounded-lg text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-white transition-all">
                    {" "}
                    Profile
                  </li>
                ): (
                  <li className=" bg-white w-full  mx-auto my-2 p-4 text-center font-semibold  rounded-lg text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-white transition-all">
                    {" "}
                    Sign in
                  </li>

                )}
              </Link>
              <div className="w-full bg-orange-500 rounded-lg p-3 hover:bg-white hover:border-2 hover:border-orange-500 transition-all">
              <Logout />
              </div>
            </div>
          )}
        </ul>
      </div>
    </header>
  );
}
