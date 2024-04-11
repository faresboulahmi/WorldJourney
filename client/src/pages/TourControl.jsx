import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TourCard from "../components/TourCard";
import { url } from "../url";

export default function TourControl() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [tour, setTour] = useState([]);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    const fetchTour = async () => {
      setLoading(true);
      setShowMore(false);
      try {
        const res = await fetch(`${url}/api/tour/get?sort=createdAt&order=desc`);
        const data = await res.json();
        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        setTour(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTour();
  }, []);
  const onShowMoreClick = async () => {
    const numberOfTour = tour.length;
    const startIndex = numberOfTour;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`${url}/api/tour/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setTour([...tour, ...data]);
    
  };
  return (
    <div className="flex flex-row flex-wrap gap-8 p-2 max-w-6xl m-auto mt-8 min-h-[60vh]">
      {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
      {tour &&
        currentUser &&
        (currentUser.role === "admin" || currentUser.role === "MainAdmin") &&
        tour.map((tours) => (<TourCard key={tours._id} tour={tours} />))}
        {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-blue-500 hover:underline p-7 text-ce$ w-full"
            >
              Show more
            </button>
          )}

    </div>
  );
}
