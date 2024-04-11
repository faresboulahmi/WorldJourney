import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TourCard from "../components/TourCard";
import { url } from "../url";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const navigate = useNavigate();
  const [sidebaredata, setSidebaredata] = useState({
    searchTerm: "",
    // maxPeople: 1,
    sort: "createdAt",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [tour, setTour] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      orderFromUrl ||
      sortFromUrl
    ) {
      setSidebaredata({
        searchTerm: searchTermFromUrl || "",
        order: orderFromUrl || "desc",
        sort: sortFromUrl || "createdAt",
      });
    }
    const fetchTour = async () => {
      setLoading(true);
      setShowMore(false);
      urlParams.set("sort", sidebaredata.sort);
      urlParams.set("order", sidebaredata.order);
      const searchQuery = urlParams.toString();
      const res = await fetch(`${url}/api/tour/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setTour(data);
      setLoading(false);
    };

    fetchTour();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm" ) {
      setSidebaredata({ ...sidebaredata, [e.target.id]: e.target.value });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebaredata({ ...sidebaredata, sort, order });
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebaredata.searchTerm);
    urlParams.set("sort", sidebaredata.sort);
    urlParams.set("order", sidebaredata.order);
    const searchQuery = urlParams.toString();
    navigate(`/tour?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfTour = tour.length;
    const startIndex = numberOfTour;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("sort", sidebaredata.sort);
    urlParams.set("order", sidebaredata.order);
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
    <div className="flex flex-col min-h-[50%]">
      <div className="p-7 border-b-2 md:border-r-2 ">
      <form onSubmit={handelSubmit} className="flex flex-row h-16 rounded-full bg-gray-200  max-w-fit m-auto ">
    <div className="flex items-center  min-w-[30%]">
      <input
        type="text"
        id="searchTerm"
        placeholder="Search..."
        className="border rounded-full h-full p-3 w-full bg-gray-200 hover:bg-gray-100 outline-none border-none "
        value={sidebaredata.searchTerm}
        onChange={handleChange}
      />
    </div>
    <div className="flex items-center gap-2 pr-2   bg-gray-200 rounded-full hover:bg-gray-100">
      <select
        onChange={handleChange}
        defaultValue={"created_at_desc"}
        id="sort_order"
        className="  p-3  bg-transparent  max-w-[70%] outline-none border-none"
      >
        <option value="regularPrice_desc">Price high to low</option>
        <option value="regularPrice_asc">Price low to hight</option>
        <option value="createdAt_desc">Latest</option>
        <option value="createdAt_asc">Oldest</option>
      </select>
    <button className="bg-orange-500 text-white p-3 rounded-full uppercase font-semibold hover:opacity-95">
      <FaSearch/>
    </button>
    </div>
  </form>
      </div>
      <div className="flex-1">
        <h1 className="max-w-6xl m-auto text-3xl font-semibold  p-3 text-slate-700 my-5 ">
          Tour results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4 border-t justify-center min-h-[30vh]">
          {!loading && tour.length === 0 && (
            <p className="text-xl text-slate-700">No Tour found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
          {!loading &&
            tour &&
            tour.map((tour) => <TourCard key={tour._id} tour={tour} />)}
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
