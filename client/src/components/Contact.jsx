import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Contact({ tour }) {
  const [message, setMessage] = useState({});
  const [people, setPeople] = useState(1);
  const { currentUser } = useSelector((state) => state.user);
  const selectHandel = [];
  const charge = 10;
  const maxPeople = tour.maxPeople;
  for (let i = 0; i < maxPeople; i++) {
    selectHandel.push(
      <option key={i} value={i + 1}>
        {i + 1} Member
      </option>
    );
  }
  const swalButton = () => {
    Swal.fire({
      text: "complete the field information first (name/date/number)",
      confirmButtonColor: "#FA7436",
    });
  };
  const selectChange = (e) => {
    setPeople(e.target.value);
  };

  const date = new Date();
  const onChange = (e) => {
    setMessage({ ...message, [e.target.id]: e.target.value });
  };

  return (
    <>
      {tour && (
          <div className="flex flex-col gap-2 border-2 rounded-lg p-2 ">
            <h2 className="text-lg font-semibold text-blue-500">
              {" "}
              Information
            </h2>
            <div className="flex flex-col border-2 p-2 rounded-lg gap-2">
              <input
                type="text"
                id="name"
                onChange={onChange}
                placeholder="your name"
                className="outline-none bg-gray-100 p-2 rounded-lg"
              />
              <input
                type="date"
                id="date"
                placeholder="dd-mm-yyyy"
                min={`${date.getDate()}-${
                  date.getMonth() + 1
                }-${date.getFullYear()}`}
                onChange={onChange}
                className="outline-none bg-gray-100 p-2 rounded-lg"
              />
              <input
                type="tel"
                id="number"
                placeholder="your number"
                onChange={onChange}
                className="outline-none bg-gray-100 p-2 rounded-lg"
              />
              <select
                onChange={selectChange}
                className="outline-slate-600 p-2 rounded-lg"
              >
                {selectHandel}
              </select>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <div className="flex flex-col gap-1 ">
                {tour.discountPrice > 0 ? (
                  <div className="flex flex-row justify-between">
                  <p className="text-gray-800 font-semibold  ">
                    Original Price
                  </p>
                  <p className="text-gray-900 font-bold line-through ">
                    {tour.regularPrice} $
                  </p>
                </div>
                ): (
                  <div className="flex flex-row justify-between">
                  <p className="text-gray-800 font-semibold  ">
                  Price/person
                  </p>
                  <p className="text-gray-900 font-bold line-through ">
                    {tour.regularPrice} $
                  </p>
                </div>
                )}
               {tour.discountPrice && (
                 <div className="flex flex-row justify-between">
                 <p className="text-gray-800 font-semibold  ">
                   discount Price/person
                 </p>
                 <p className="text-gray-900 font-bold  ">
                   {tour.discountPrice}$
                 </p>
               </div>
               )}
              </div>
              <div className="flex flex-row justify-between">
                <p className="text-gray-800 font-semibold ">Service Charge</p>
                <p className="text-gray-900 font-bold  ">+{charge}$</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="text-gray-900 font-bold text-lg ">Total :</p>
                <p className="text-gray-900 font-bold  ">
                  {tour.discountPrice ? +tour.discountPrice * +people + +charge : +tour.regularPrice * +people + +charge} $
                </p>
              </div>
            </div>
            {currentUser &&
            currentUser._id &&
            message.name &&
            message.date &&
            message.number ? (
              <Link
                to={`mailto:${tour.email}?subject=Regarding ${
                  tour.name
                }&body=Hi my Name is ${
                  message.name
                } I want to Apply in this tour  offer in the${
                  message.date
                } at the price of ${
                  tour.discountPrice * people + charge
                } for ${people} people and That ${
                  message.number
                } is my Number for direct contact`}
                className="bg-orange-500 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
              >
                Apply
              </Link>
            ) : currentUser && currentUser._id ? (
              <div
                className="bg-orange-500 cursor-pointer text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
                onClick={swalButton}
              >
                Apply
              </div>
            ) : (
              <Link
                to="/sign-in"
                className="bg-orange-500 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
              >
                Apply
              </Link>
            )}
          </div>
        )}
    </>
  );
}
