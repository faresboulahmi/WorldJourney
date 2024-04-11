import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ReviewsCard from "./ReviewsCard";
import { url } from "../url";

export default function CreateReviews({tour}) {
  const { currentUser } = useSelector((state) => state.user);
  const starReviews = [];
  const [formData, setFormData] = useState({
    productId: tour._id,
    username: currentUser ? currentUser.username : "unknown",
    rating: 5,
  });
  const navigate = useNavigate();
  const [repeat, setRepeat] = useState("not");
  const [reviews, setReviews] = useState([
    {
      productId: "",
      username: "Unknown",
      reviewText: "No one comment in this tour yet be the first one",
      rating: 5,
      avatar:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      _id: "",
    },
  ]);
  const [tours, setTours] = useState([]);
  const [render, setRender] = useState();
  useEffect(() => {
    const showReviews = async () => {
      try {
        const res = await fetch(`${url}/api/reviews/get?productId=${tour._id}`);
        const data = await res.json();
        if (data.length > 0) {
          setReviews(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    showReviews();
    const tourReview = async () => {
      try {
        const res = await fetch(`${url}/api/tour/get/${tour._id}`);
        const data = await res.json();
        setTours(data);
      } catch (error) {
        console.log(error);
      }
    };
    tourReview();
  }, [render , reviews]);

  // {make the user comment once}
  if (currentUser) {
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i]._id === `${currentUser._id}${tour._id}` && repeat === "not") {
        setRepeat("repeated");
      }
    }
  }
  // {star loop }
  for (let i = 1; i <= 5; i++) {
    starReviews.push(
      <div
        key={i}
        id="rating"
        onClick={() => {
          setFormData({ ...formData, rating: i });
        }}
        className="flex flex-col gap-1 justify-center items-center hover:bg-gray-100 p-2 rounded-lg"
      >
        {i}
        <FaStar className="text-yellow-400  p-1  text-2xl" />
      </div>
    );
  }

  // {swal button}
  const swirlButton = () => {
    Swal.fire({
      text: "you already comment in this tour",
      confirmButtonColor: "red",
    });
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


  // set Form data function
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${url}/api/reviews/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          _id: `${currentUser._id}${tour._id}`,
          avatar: currentUser.avatar,
        }),
      });
      const resTour = await fetch(`${url}/api/tour/update/${tour._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          ...tours,
          totalReviews: tours.totalReviews + 1,
          reviews: tours.reviews + formData.rating,
        }),
      });
      navigate(`/tour/${tour._id}`);
      showSuccessMessage("thank for your feedback");
      setRender(1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" flex flex-col gap-2">
      <form onSubmit={handelSubmit} className="border-2 p-2 rounded-lg">
        <div className="flex flex-row gap-2 p-2 ">
          {starReviews}
          <div className="flex flex-col gap-1 justify-center items-center bg-gray-100 p-2 rounded-lg">
            {formData.rating}{" "}
            <FaStar className="text-yellow-400 p-1 text-2xl" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-2  p-2">
          <input
            type="text"
            className="outline-2 bg-gray-100 flex-1 p-2 rounded-lg"
            placeholder="Your feedback"
            onChange={onChange}
            id="reviewText"
          />
          {reviews && reviews.length > 0 && repeat === "repeated" ? (
            <div
              onClick={() => swirlButton()}
              className="text-center font-semibold bg-orange-500  text-white p-2 rounded-lg cursor-pointer"
            >
              submit
            </div>
          ) : currentUser ? (
            <button
              // type="submit"
              className="text-center font-semibold bg-orange-500 p-2 rounded-lg text-white"
            >
              submit
            </button>
          ) : (
            <Link
              to={"/sign-in"}
              className="text-center  font-semibold bg-orange-500 p-2 rounded-lg text-white"
            >
              submit
            </Link>
          )}
        </div>
      </form>
      <div className="flex flex-col gap-4 border-gray-200 border-2 p-2 rounded-lg">
        {reviews &&
        
          reviews.length > 0 &&
          reviews.map((review) => (
            <ReviewsCard tour={tour} key={review._id} review={review} tours={tours} />
          ))}
      </div>
    </div>
  );
}
