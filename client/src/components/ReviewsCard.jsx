import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { url } from "../url";

export default function ReviewsCard({ review, tour }) {
  const { currentUser } = useSelector((state) => state.user);
  const createdAt = `${review.createdAt}`;
  const createdAtSlice = createdAt.slice(0, 10);
  const [revState, setRevState] = useState(review.favorite);
  const updateFavState = async (e) => {
    try {
      const res = await fetch(`${url}/api/reviews/update/${review._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          ...review,
          favorite: review.favorite === false ? true : false,
        }),
      });
      if (review.favorite === false) {
        showSuccessMessage("you added the comment to favorite");
        setRevState(true);
      } else {
        showSuccessMessage("the comment removed from  favorite");
        setRevState(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
  const swalDelete = (review) => {
    Swal.fire({
      text: "are you sure delete this comment ",
      showCancelButton: true,
      cancelButtonColor: "#4086F4",
      confirmButtonColor: "#FA7436",
    }).then((isConfirm) => {
      if (isConfirm.isConfirmed) {
        deleteComment(review);
      }
    });
  };
  const deleteComment = async (review) => {
    try {
      const resUpdate = await fetch(`${url}/api/tour/get/${review.productId}`);
      const dataUpdate = await resUpdate.json();
      const tours = dataUpdate;
      const resTour = await fetch(`${url}/api/tour/update/${review.productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          ...tours,
          totalReviews: tours.totalReviews - 1,
          reviews: tours.reviews - review.rating,
        }),
      });
      const res = await fetch(`${url}/api/reviews/delete/${review._id}`, {
        method: "DELETE",
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      showSuccessMessage("your comment has deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2   p-2 rounded-lg shadow-md hover:shadow-lg  transition-shadow my-auto">
      <div className="flex flex-row justify-between">
        <img
          src={review.avatar}
          className="object-cover w-7 h-7 rounded-full mr-4 mt-2"
          alt="profile"
        />
        <div className="flex flex-col  justify-start flex-1">
          <p className="font-semibold text-gray-500 ">{review.username}</p>
          <p className="font-semibold text-gray-500 ">{createdAtSlice}</p>
        </div>
        <div className="flex flex-row gap-1 justify-center items-center bg-gray-100 p-2 rounded-lg">
          {review.rating} <FaStar className="text-yellow-400 p-1 text-2xl" />
        </div>
      </div>
      <div className="flex flex-col items-start sm:flex-row flex-wrap gap-2 ml-10 justify-center sm:items-center">
        <p className="p-2 flex-1 text-gray-900 rounded-lg border-gray-900 text-start">
          {review.reviewText}
        </p>
        {tour &&
        currentUser &&
        review._id === `${currentUser._id}${tour._id}` ? (
          <button
            className="p-2 bg-red-800 text-white font-semibold rounded-lg "
            onClick={() => swalDelete(review)}
          >
            Delete
          </button>
        ) : (
          currentUser &&
          review.productId !== "" &&
          (currentUser.role === "admin" ||
            currentUser.role === "MainAdmin") && (
            <div className="flex max-h-12 justify-center flex-row-reverse gap-2">
              <button
                className=" p-2 border-2 border-red-500  text-red-500 font-semibold rounded-lg "
                onClick={() => swalDelete(review)}
              >
                Delete
              </button>
              {revState ? (
                <button
                  className="p-2 bg-gray-200 text-white font-semibold rounded-lg "
                  onClick={() => updateFavState()}
                >
                  <FaStar className="text-red-500" />
                </button>
              ) : (
                <button
                  className="p-2 bg-gray-200 text-white font-semibold rounded-lg "
                  onClick={() => updateFavState()}
                >
                  <FaStar className="text-white" />
                </button>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
