import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addToWishList, removeWishList } from "../redux/wishList/wishListSlice";
import { url } from "../url";

export default function FavoriteFunc({ tour }) {
  const { currentUser } = useSelector((state) => state.user);
  const [wish, setWish] = useState(false);
  const dispatch = useDispatch();
  const { wishList } = useSelector((state) => state.wishList);
  useEffect(() => {
    setWish(wishList.includes(tour));
    wishList.map((wish) => wish._id === tour._id && setWish(true));
    const updateWishList = async () => {
      try {
        const res = await fetch(`${url}/api/admin/update/${currentUser._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            ...currentUser,
            wishList: wishList,
          }),
        });
        const data = res.json();
      } catch (error) {
        console.log(error);
      }
    };
    updateWishList();
  }, [wishList]);

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

  const updateFav = () => {

    dispatch(addToWishList(tour));
    showSuccessMessage(`You add this tour  ${tour.name} to your whishList`);
    setWish(true);
  };
  const deleteFav = async () => {

    dispatch(removeWishList(tour));
    showSuccessMessage(`this tour  ${tour.name} removed from wishList`);
    setWish(false);

  };

  return (
    <div className="ml-4 mb-4">
      {location.href.slice(-7) !== "control" && wish ? (
        <button
          onClick={() => deleteFav()}
          className=" p-2 rounded-lg bg-gray-200"
        >
          <FaStar className="text-red-500" />
        </button>
      ) : location.href.slice(-7) !== "control" &&(
        <button
          onClick={() => updateFav()}
          className="p-2 rounded-lg bg-gray-200"
        >
          <FaStar className="text-white" />
        </button>
      )}
    </div>
  );
}
