import React from "react";
import { useSelector } from "react-redux";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import Logo from "../image/logo.png";
import { FaGithub,  FaLinkedinIn } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import Swal from "sweetalert2";
import PalmTree from '../image/palmTree.png'
import Circle from '../image/circle.png'

import { Link } from "react-router-dom";

export default function Footer() {
  const {currentUser} = useSelector((state) => state.user)
  const showSuccessMessage = (message) => {
    const successMessage = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    successMessage.fire({
      icon: "success",
      title: message,
    });
  };
  return (
    <>
    {location.href.slice(-7) !== "sign-in" &&
    location.href.slice(-7) !== "sign-up"
    &&
    (
        <div className="flex flex-col w-full  m-auto relative bg-[#F7F8FC]">
        <div className="h-[40%] w-full bg-[#FEFCFB]  absolute top-0"></div>
        <div className=" relative flex flex-col justify-center">
          {currentUser && currentUser.role !== "MainAdmin" &&
            (
              <form className="max-w-6xl rounded-lg h-60 sm:h-46 lg:h-40 w-full mb-4 sm:w-[70%] relative p-4 sm:px-20 flex flex-col justify-center gap-8 bg-orange-500 m-auto md:py-[120px] " onSubmit={() => showSuccessMessage("success subscribe")}> 
            <img src={PalmTree} className="w-20 absolute top-0 right-0"/>
            <img src={Circle} className="w-40 absolute bottom-0 left-0 hidden sm:inline"/>
            <div className="font-semibold text-2xl text-white text-center">
              Subscribe and get exclusive <br /> deals & offer
            </div>
            <div className="flex flex-col sm:flex-row gap-2  justify-between items-center w-full bg-white rounded-lg p-1">
              <div className="text-gray-300 flex flex-row justify-center items-center">
                <MdOutlineDriveFileRenameOutline className="text-gray-300" />{" "}
                <input type="email" placeholder=" Enter your mail" required className="outline-none w-full text-slate-700 hover:font-semibold"/> 
               
              </div>
              <button
                className="bg-orange-500 px-4 py-2 rounded-lg m-1 w-full sm:w-fit "
              >
                Subscribe
              </button>
            </div>
          </form>
            )
          }
          <div className="bg-[#F7F8FC]">
          <div className="flex flex-col gap-4  px-4 pt-6 md:pt-8 md:py-2  max-w-6xl w-full mx-auto ">
            <div className="flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex flex-col gap-2">
                <div className="font-semibold text-sm flex flex-row gap-1 items-center">
                  WorldJourney <img src={Logo} className="h-4"/>
                </div>
                <div className="text-sm">
                  Book your trip in minute , <br /> get full Control for much
                  longer.
                </div>
                <div className="flex flex-row gap-2 ">
                  <Link to={`https://github.com/faresboulahmi`} target="_blanket">
                  <div className="bg-white rounded-full flex justify-center items-center hover:bg-orange-500 h-6 w-6 hover:text-white transition-all"><FaGithub /></div>
                  </Link>
                  <Link to={`https://www.linkedin.com/in/fares-boulahmi-342b61268/`} target="_blanket">
                  <div className="bg-white rounded-full flex justify-center items-center hover:bg-orange-500 h-6 w-6 hover:text-white transition-all"><FaLinkedinIn /></div>
                  </Link>
                  <Link to={`https://twitter.com/BoulahmiFares`} target="_blanket">
                  <div className="bg-white rounded-full flex justify-center items-center hover:bg-orange-500 h-6 w-6 hover:text-white transition-all"><IoLogoTwitter/></div>
                  </Link>
                </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between">
                    <div className="flex flex-col justify-start gap-2">
                      <div className="font-semibold hover:underline">Help Center</div>
                      <div className="font-semibold hover:underline">Privacy and Cookies</div>
                      <div className="font-semibold hover:underline">About Us</div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between">
                    <div className="flex flex-col justify-start gap-2">
                      <div className="font-semibold hover:underline">Careers</div>
                      <div className="font-semibold hover:underline">Travel Agents</div>
                      <div className="font-semibold hover:underline">Enjoy</div>
                    </div>
                </div>
              </div>
              <div className="border-t-2 border-gray-300 flex flex-row justify-between p-3 gap-4 mt-4 pb-6">
                  <div className="text-slate-500">Copyright , Fares Boulahmi 2024 </div>
                  <div className="text-slate-500">Terms & Conditions</div>
              </div>
            </div>
          </div>
          </div>
        </div>
        </div>
      )
     }</>
  );
}
