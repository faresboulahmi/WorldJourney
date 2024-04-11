import React from "react";
import { MdLocationOn } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import FavoriteFunc from "./FavoriteFunc";
import { url } from "../url";

export default function TourCard({ tour }) {
  const { currentUser } = useSelector((state) => state.user);
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
  const swalDelete = (tour) => {
    Swal.fire({
      text: "are you sure delete this comment ",
      showCancelButton: true,
      cancelButtonColor: "#4086F4",
      confirmButtonColor: "#FA7436",
    }).then((isConfirm) => {
      if (isConfirm.isConfirmed) {
        deleteTour(tour);
      }
    });
  };

  const deleteTour = async (tour) => {
    try {
      const res = await fetch(`${url}/api/tour/delete/${tour._id}`, {
        method: "DELETE",
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      showSuccessMessage("this tour Deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white  shadow-md hover:shadow-lg  transition-shadow overflow-hidden rounded-lg w-[80%] mx-auto   sm:w-[300px] md:w-[240px] relative ">
      <Link to={`/tour/${tour._id}`}>
        <img
          src={tour.imageUrls}
          alt="tour cover"
          className="h-[180px] sm:h-[180px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="flex flex-row gap-2 justify-between">
          <div className="flex-1 flex flex-col gap-2 justify-between ">
            <div className="p-3 flex flex-col gap-2 max-w-[250px]">
              <p className="truncate text-lg font-semibold text-slate-700 ">
                {tour.name}
              </p>
              <div className="flex items-center gap-1 ">
                <MdLocationOn className="h-4 text-green-700 " />
                <p className="text-sm  text-gray-600 truncate w-full">
                  {tour.address}
                </p>
              </div>
              <div className="text-slate-700">
                {`${tour.description}`.slice(0, 25)}...
              </div>
              {tour.offer ? (
                <div className="flex flex-col gap-2 ">
                  <div className="flex flex-row gap-8">
                    <p className="truncate bg-slate-300 w-fit px-2 font-medium rounded-lg line-through ">
                      ${tour.regularPrice}
                    </p>
                    <p className="text-orange-700 w-fit px-2 bg-orange-300 font-semibold rounded-lg">
                      ${tour.discountPrice.toLocaleString("en-Us")}
                    </p>
                  </div>
                  <p className="text-slate-500 font-semibold">
                    {tour.maxPeople} max person
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-1 ">
                  <p className="text-orange-700 w-fit px-2 bg-orange-300 font-semibold rounded-lg my-1">
                    ${tour.regularPrice.toLocaleString("en-US")}
                  </p>
                  <p className="text-slate-500 font-semibold">
                    {tour.maxPeople} max person
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute  bottom-0 right-4">
        {currentUser && <FavoriteFunc tour={tour} />}
      </div>

      {tour && location.href.slice(-13) === "/tour-control" && (
        <div className="flex flex-row justify-between p-4 ">
          <button
            className="border-2 border-red-500 rounded-lg text-red-500 font-semibold p-2 hover:bg-red-500 hover:text-white transition-all"
            onClick={() => swalDelete(tour)}
          >
            Delete
          </button>
          <Link to={`/update-tour/${tour._id}`}>
            <button className="border-2 border-blue-500 rounded-lg text-blue-500 font-semibold p-2 hover:bg-blue-500 hover:text-white transition-all">
              Update
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
