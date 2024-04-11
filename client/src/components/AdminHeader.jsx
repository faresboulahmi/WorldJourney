import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AdminHeader() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="adminHover bg-none sm:bg-[#FEFCFB] w-[90%]  mx-auto ">
      <div className=" cursor-pointer mb-4 sm:mb-0 bg-[#FEFCFB] text-center p-4 sm:p-0  rounded-lg text-orange-500 border-2 border-orange-500 sm:border-0 hover:bg-orange-500  hover:text-white sm:hover:text-orange-500 sm:hover:bg-[#FEFCFB] sm:text-slate-700 font-semibold sm:hover:underline ">
        Dashboard
      </div>
      <div className="hidden bottom-0 adminUl relative bg-red-500">
      <ul className="sm:fixed z-40 sm:top-18 sm:border-b-2 sm:border-b-slate-600  sm:bg-[#FEFCFB] sm:right-20 md:left-10  flex justify-between flex-col sm:flex-row sm:flex-wrap  gap-2 items-center  max-w-6xl mx-auto p-0 ">
        {currentUser && currentUser.role === "MainAdmin" && (
          <Link to="/users" className="w-full sm:w-fit">
            <li className=" bg-[#FEFCFB] text-center p-4  rounded-lg text-orange-500 border-2 border-orange-500 sm:border-0 hover:bg-orange-500  hover:text-white sm:hover:text-orange-500 sm:hover:bg-[#FEFCFB] sm:text-slate-700 font-semibold sm:hover:underline ">
              Users
            </li>
          </Link>
        )}
        <Link to="/tour-control" className="w-full sm:w-fit">
          <li className="bg-[#FEFCFB] text-center p-4  rounded-lg text-orange-500 border-2 border-orange-500 sm:border-0 hover:bg-orange-500  hover:text-white sm:hover:text-orange-500 sm:hover:bg-[#FEFCFB] sm:text-slate-700 font-semibold sm:hover:underline ">
            Tour Control
          </li>
        </Link>
        <Link to="/wishList" className="w-full sm:w-fit">
          <li className="bg-[#FEFCFB] text-center p-4  rounded-lg text-orange-500 border-2 border-orange-500 sm:border-0 hover:bg-orange-500  hover:text-white sm:hover:text-orange-500 sm:hover:bg-[#FEFCFB] sm:text-slate-700 font-semibold sm:hover:underline ">
            wishList
          </li>
        </Link>
        <Link to="/create-tour" className="w-full sm:w-fit">
          <li className="bg-[#FEFCFB] text-center p-4  rounded-lg text-orange-500 border-2 border-orange-500 sm:border-0 hover:bg-orange-500  hover:text-white sm:hover:text-orange-500 sm:hover:bg-[#FEFCFB] sm:text-slate-700 font-semibold sm:hover:underline ">
            Create tour
          </li>
        </Link>
        <Link to="/reviews" className="w-full sm:w-fit">
          <li className="bg-[#FEFCFB] text-center p-4  rounded-lg text-orange-500 border-2 border-orange-500 sm:border-0 hover:bg-orange-500  hover:text-white sm:hover:text-orange-500 sm:hover:bg-[#FEFCFB] sm:text-slate-700 font-semibold sm:hover:underline ">
            Reviews Control
          </li>
        </Link>
      </ul>
      </div>
    </header>
  );
}
