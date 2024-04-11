import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay , Pagination} from "swiper/modules";
import SwiperCore from "swiper";

// import  { Autoplay } from 'swiper/core';

import "swiper/css/bundle";
import HomeImage from "../image/home.png";
import Location from "../image/location.png";
import Wallet from "../image/wallet.png";
import Check from "../image/check.png";
import TourCard from "../components/TourCard";
import ReviewsCard from "../components/ReviewsCard";
import { url } from "../url";


export default function Home() {
  const [tour, setTour] = useState([]);
  const [largeTour, setLArgeTour] = useState([]);
  const [reviews, setReviews] = useState([]);
  SwiperCore.use([Navigation, Autoplay ,Pagination]);
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`${url}/api/tour/get?limit=8&offer=true`);
        const data = await res.json();
        setTour(data);
        fetchLargeTour();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchLargeTour = async () => {
      try {
        const res = await fetch(
          `${url}/api/tour/get?maxPeople=8&maxPeople=9&maxPeople=10&limit=8&sort=createdAt&order=desc`
        );
        const data = await res.json();
        setLArgeTour(data);
        fetchReviews();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `${url}/api/reviews/getAdmin?favorite=true&rating>=4&limit=4`
        );
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTour();
  }, []);
  return (
    <div>
      {/* top */}
      <div className="flex  gap-4   flex-col md:flex-row max-w-6xl mx-auto p-3 ">
        <div className="flex flex-col gap-6  px-3 lg:mx-0 sm:mx-auto pt-28">
          <h1 className="text-gray-900 font-bold text-3xl lg:text-6xl">
            Get started your exciting
            <span className="text-orange-500"> journey</span> with us.
          </h1>
          <div className="text-gray-400 text-xs sm:text-sm font-semibold">
            A Team of experienced tourism professionals will provide you with
            the best advice and tips for your desire place.
          </div>
        </div>
        <img
          src={HomeImage}
          className="max-w-xl md:max-w-md md:p-8 lg:p-0 lg:pt-28 md:mx-auto md:pt-28 sm:pt-8 sm:p-28 sm:m-auto"
        />
      </div>
      {/* {second section} */}
      <div className="bg-gray-100">
        <div className="flex flex-col max-w-6xl mx-auto">
          {/* {text} */}
          <div className="flex flex-col justify-center pt-20">
            <h2 className="font-bold text-center text-gray-900 text-2xl lg:text-4xl">
              {" "}
              Things you need to do
              <span className="text-orange-500"> to do</span>{" "}
            </h2>
            <p className="text-gray-400 test-xs sm:text:sm font-semibold text-center pt-4 ">
              We ensure that you’ll embark on a perfectly planned,
              <br /> safe vacation at a price you can afford.{" "}
            </p>
          </div>
          {/* {card} */}
          <div className="flex flex-col md:flex-row  justify-center gap-4 pt-8 m-4 pb-12">
            <div className="flex flex-col gap-4 rounded-lg bg-[#FEFCFB] p-8 sm:w-full">
              <img src={Check} className="w-9" />
              <h3 className="font-bold text-lg">Sign Up</h3>
              <p className="text-gray-400">
                Completes all the work associated with planning and processing
              </p>
            </div>

            <div className="flex flex-col gap-4 rounded-lg bg-[#FEFCFB] p-8 sm:w-full">
              <img src={Wallet} className="w-9" />
              <h3 className="font-bold text-lg">Worth of Money</h3>
              <p className="text-gray-400">
                After successful access then book from exclusive deals & pricing
              </p>
            </div>

            <div className="flex flex-col gap-4 rounded-lg bg-[#FEFCFB] p-8 sm:w-full">
              <img src={Location} className="w-9" />
              <h3 className="font-bold text-lg">Exciting Travel</h3>
              <p className="text-gray-400">
                Start and explore a wide range of exciting travel experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* swiper  image cover*/}
      <div className="w-full">
      <Swiper
        navigation
        loop={true}
        autoplay={{ delay: 3000 }}
      >
        {tour &&
          tour.length > 0 &&
          tour.map((tour) => (
            <SwiperSlide key={tour._id}>
              <img src={tour.imageUrls[0]} className="object-cover w-full h-[500px]"/>
            </SwiperSlide>
          ))}
      </Swiper>

      </div>
      {/* tour With Offer  */}
      <div className="w-full bg-[#F7F8FC] py-8 sm:py-10 md:py-12 lg:py-14">
        <div className="max-w-6xl flex flex-col gap-4 justify-center m-auto">
          <div className="font-bold text-3xl text-center flex flex-col sm:flex-row gap-4 justify-center">
            Exclusive <p className="text-orange-500">deals & discounts</p>
          </div>
          <div className="text-center mb-8">
            Discover our fantastic early booking discounts <br />& start
            planning your journey.
          </div>
          <div>
            <Swiper
              loop={true}
              autoplay={{ delay: 3000 }}
              spaceBetween={20}
              pagination
              breakpoints={{
                480: { slidesPerView: 1 },
                600: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                992: { slidesPerView: 4 },
              }}
            >
              {tour &&
                tour.length > 0 &&
                tour.map((tour) => (
                  <SwiperSlide key={tour._id}>
                    <div className="m-auto my-8">
                    <TourCard tour={tour} />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* tour for large group */}
      {largeTour && largeTour.length >= 4 && (
        <div className="w-full bg-[#FEFCFB] py-8 sm:py-10 md:py-12 lg:py-14">
          <div className="max-w-6xl flex flex-col gap-4 justify-center m-auto">
            <div className="font-bold text-3xl text-center flex flex-col sm:flex-row gap-4 justify-center">
              Best <p className="text-orange-500">large group vocation</p>
            </div>
            <div className="text-center mb-8">
              Planning the perfect vacation with family or friends is an
              exciting endeavor! <br /> Here's how we can make the most out of
              your trip with our travel agency's all-inclusive offers!
            </div>
            <div >
              <Swiper
                loop={true}
                autoplay={{ delay: 3000 }}
                spaceBetween={20}
                pagination
                breakpoints={{
                  600: { slidesPerView: 1 },
                  768: { slidesPerView: 3 },
                  992: { slidesPerView: 4 },
                }}
              >
                {largeTour &&
                  largeTour.length >= 4 &&
                  largeTour.map((tour) => (
                    <SwiperSlide key={tour._id}>
                     <div className="m-auto my-8 ">
                     <TourCard tour={tour} />
                     </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
      {/*reviews section */}

      {reviews && reviews.length >= 4 && (
        <div className="w-full bg-[#F7F8FC] py-8 sm:py-10 md:py-12 lg:py-14">
          <div className="flex flex-col sm:flex-row justify-around gap-8 m-auto max-w-6xl px-8">
            <div className="flex flex-col">
              <div className="font-bold text-2xl">
                What people say <p className="text-orange-500">about us</p>
              </div>
              <div>
                Our Clients send us bunch of smilies <br /> with our services
                and we love them.
              </div>
            </div>

            <div className="max-w-md">
              {/* <div> */}
              <Swiper loop={true} autoplay={{ delay: 3000 }}>
                {reviews &&
                  reviews.length >= 4 &&
                  reviews.map((review) => (
                    <SwiperSlide key={review._id}>
                      <div className="m-2">
                        <ReviewsCard review={review} />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
              {/* </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
