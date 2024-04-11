import React, { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { url } from "../url";

export default function UserCard({ user }) {
  const { currentUser } = useSelector((state) => state.user);
  const createdAt = `${user.createdAt}`;
  const createdAtSlice = createdAt.slice(0, 10);
  const [role, setRole] = useState();
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
  const swalDelete = (user) => {
    Swal.fire({
      text: "are you sure delete this comment ",
      showCancelButton: true,
      cancelButtonColor: "#4086F4",
      confirmButtonColor: "#FA7436",
    }).then((isConfirm) => {
      if (isConfirm.isConfirmed) {
        deleteTour(user);
      }
    });
  };
  const swalUpdate = (user) => {
    Swal.fire({
      text: "are you sure to update this user role ",
      showCancelButton: true,
      cancelButtonColor: "#4086F4",
      confirmButtonColor: "#FA7436",
    }).then((isConfirm) => {
      if (isConfirm.isConfirmed) {
        updateRole(user);
      }
    });
  };

  const deleteTour = async (user) => {
    try {
      const res = await fetch(`${url}/api/admin/delete/${user._id}`, {
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

  const handleChange = (e) => {
    setRole(e.target.value);
  };
  const updateRole = async () => {
    try {
      const res = await fetch(`${url}/api/admin/update/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          ...user,
          role: role,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      showSuccessMessage(`that user role changed to ${role}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-col gap-2  p-2 rounded-lg shadow-md hover:shadow-lg  transition-shadow w-[330px] sm:w-[250px] m-auto">
      <div className="flex flex-col gap-2 justify-center items-center">
        <img src={user.avatar} className="rounded-full w-20 h-20" />
        <div className="text-center text-slate-700 font-semibold">
          {user.username}
        </div>
        <div className="text-center text-slate-700 font-semibold">
          {user.email}
        </div>
      </div>
      <div className="flex flex-col p-2 gap-2">
        <div className="text-center text-slate-700 font-semibold">
          {createdAtSlice}
        </div >
        <div className="text-center text-slate-700 font-semibold">
            this user role is : {user.role}
        </div>
        {currentUser && currentUser.role === "MainAdmin" && (
          <select
            className="border rounded-lg p-3"
            onChange={handleChange}
            id="role"
            defaultValue={user.role}
          >
            <option value="MainAdmin">MainAdmin</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        )}
        {currentUser && currentUser._id === user._id && <p className="text-sm text-red-400 font-semibold">be careful this is your account</p>}
      </div>
      {currentUser && currentUser.role === "MainAdmin" && (
        <div className="flex flex-row justify-between p-4 ">
          <button
            className="border-2 border-red-500 rounded-lg text-red-500 font-semibold p-2 hover:bg-red-500 hover:text-white transition-all"
            onClick={() => swalDelete(user)}
          >
            Delete
          </button>
          <button
            className="border-2 border-blue-500 rounded-lg text-blue-500 font-semibold p-2  hover:bg-blue-500 hover:text-white transition-all"
            onClick={() => swalUpdate(user)}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
}
