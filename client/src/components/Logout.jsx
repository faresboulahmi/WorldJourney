import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { url } from "../url";

export default function Logout() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate("");
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`${url}/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const swalButton = () => {
    Swal.fire({
      text: "do you want to log out ",
      showCancelButton: true,
      cancelButtonColor: "#4086F4",
      confirmButtonColor: "#FA7436",
    }).then((isConfirm) => {
      if (isConfirm.isConfirmed) {
        handleSignOut();

        navigate("/");
      }
    });
  };
  return (
    <>
      {currentUser ? (
        <div
          onClick={() => swalButton()}
          className="text-white font-semibold text-center bg-orange-500 p-2 rounded-lg cursor-pointer w-full "
        >
          Logout
        </div>
      ) : (
        <Link to="/sign-up" className="w-full">
          <li className=" text-white text-center  bg-orange-500 p-2  font-semibold rounded-lg cursor-pointer w-full hover:bg-white hover:text-orange-500 transition-all">
            {" "}
            Sign Up
          </li>
        </Link>
      )}
    </>
  );
}
