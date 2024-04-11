import React, { useEffect, useState } from "react";
import ReviewsCard from "../components/ReviewsCard";
import { useNavigate } from "react-router-dom";
import { url } from "../url";
import { FaSearch } from "react-icons/fa";

export default function ReviewsControle() {
    const navigate = useNavigate();
  const [sideBareData, setSideBareData] = useState({
    rating: 5,
    favorite: true,
  });
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const ratingFromUrl = urlParams.get("rating<");
    const favoriteFromUrl = urlParams.get("favorite");

    if (ratingFromUrl || favoriteFromUrl) {
      setSideBareData({
        rating: ratingFromUrl || 5 ,
        favorite: favoriteFromUrl === "true" ? true : false,
      });
    }
    const fetchReviews = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`${url}/api/reviews/getAdmin?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setReviews(data);
      setLoading(false);
    };
    fetchReviews();
  }, [location.search]);

  const handleChange = (e) => {
    setSideBareData({
      ...sideBareData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("rating", sideBareData.rating);
    urlParams.set("favorite", sideBareData.favorite);
    const searchQuery = urlParams.toString();
    navigate(`/reviews?${searchQuery}`)
  };

  const onShowMoreClick = async () => {
    const numberOfReviews = reviews.length;
    const starIndex = numberOfReviews;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", starIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`${url}/api/reviews/getAdmin?${searchQuery}`);
    if (data.length < 9) {
      setShowMore(false);
    }
    setReviews([...reviews, ...data]);
  };
  return (
    <div className="flex flex-col mt-8 min-h-[50%]">
        <form onSubmit={handleSubmit} className="flex flex-row  h-16 rounded-full bg-gray-200  max-w-fit m-auto ">
          <div className="flex items-center  min-w-[30%]">
            <input
              type="number"
              min={1}
              max={5}
              id="rating"
              placeholder="number of stars"
              className="border rounded-full h-full p-3 w-full bg-gray-200 hover:bg-gray-100 outline-none border-none"
              value={sideBareData.rating}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2 pr-2   bg-gray-200 rounded-full hover:bg-gray-100">
            <select
              onChange={handleChange}
              defaultValue={"true"}
              id="favorite"
              value={sideBareData.favorite}
              className=" p-3  bg-transparent  max-w-[70%] outline-none border-none"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          <button className="bg-orange-500 text-white p-3 rounded-full uppercase font-semibold hover:opacity-95">
            <FaSearch/>
          </button>
          </div>
        </form>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold  p-3 text-slate-700 mx-5 my-5">
          Reviews result
        </h1>
        <div className="p-7 flex flex-col gap-4 border-t min-h-[30vh]">
          {!loading && reviews.length === 0 && (
            <p className="text-xl text-slate-700">No Reviews found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
          {!loading &&
            reviews &&
            reviews.length > 0 &&
            reviews.map((review) => <ReviewsCard key={review._id} review={review} />)}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-blue-500 hover:underline p-7 text-ce$ w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
