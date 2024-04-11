import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import CreateReviews from "../components/CreateReviews";
import Contact from "../components/Contact";
import { Navigation, Pagination, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css/bundle";

import { FaShare, FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoLocationOutline, IoPeople } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import FavoriteFunc from "../components/FavoriteFunc";
import { useSelector } from "react-redux";
import { url } from "../url";

export default function Tour() {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const params = useParams();
  const [rateReview, setRateReview] = useState(5);
  const { currentUser } = useSelector((state) => state.user);
  SwiperCore.use([Navigation, Pagination]);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${url}/api/tour/get/${params.tourId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setTour(data);
        setLoading(false);
        setError(false);
        setRateReview((data.reviews / data.totalReviews).toFixed(1));
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchTour();
  }, [params.tourId]);

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-center my-7 text-2xl"> Loading...</p>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-center my-7 text-2xl"> Something Went Wrong!</p>
        </div>
      )}
      {tour && !loading && !error && (
        <div className="flex flex-col justify-start items-start flex-wrap min-h-screen">
          <div className="flex flex-col gap-2  w-full  md:w-4/6 p-8">
            <div className=" overflow-hidden rounded-lg relative">
              <Swiper navigation pagination>
                {tour.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <img src={url} className="aspect-[16/9] w-full " />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="absolute top-4 right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
                <FaShare
                  className="text-slate-500"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => {
                      setCopied(false);
                    }, 2000);
                  }}
                />
              </div>
              {copied && (
                <p className="absolute top-14 right-[5%] z-10 rounded-md bg-slate-100 p-2">
                  Link copied!
                </p>
              )}
            </div>
            <div className="flex flex-col gap-4 p-4 border-gray-200  border-2 rounded-lg relative">
              <div className="text-2xl font-semibold mt-4 mb-4">
                {tour.name}
              </div>
              <div className="flex flex-row gap-2  ">
                <div className="flex flex-row justify-center items-center gap-2">
                  <FaStar className="text-yellow-500 text-lg" /> {rateReview} (
                  {tour.totalReviews}){" "}
                </div>
                <div className="flex flex-row justify-center items-center gap-2 ml-8">
                  <FaLocationDot className="text-orange-500 text-lg" />{" "}
                  {tour.address}
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:  ">
                <div className="flex flex-row">
                  <div className="flex flex-row justify-center items-center gap-2 ">
                    <IoLocationOutline className="text-orange-500 text-lg" />{" "}
                    {tour.country}
                  </div>
                  <div className="flex flex-row justify-center items-center gap-2 ml-2">
                    <RiMoneyDollarCircleLine className="text-orange-500 text-lg" />{" "}
                    $
                    {tour.discountPrice
                      ? tour.discountPrice
                      : tour.regularPrice}
                    /par person
                  </div>
                </div>
                <div className="flex flex-row  items-center gap-2 ">
                  <IoPeople className="text-yellow-500 text-lg" />{" "}
                  {tour.maxPeople} MaxPeople
                </div>
              </div>
              <div className="text-lg font-semibold">Description</div>
              <div className="text-gray-700 mb-4">{tour.description}</div>
              <div className="absolute right-4 top-8">
                {currentUser && tour && <FavoriteFunc tour={tour} />}
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/6 md:fixed right-3 top-[70px] p-8">
            <Contact tour={tour} />
          </div>
          <div className="p-8 w-full md:w-4/6">
            <CreateReviews tour={tour} />
          </div>
        </div>
      )}
    </div>
  );
}
