import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "../components/UserCard";
import { url } from "../url";

export default function UserRole() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUser] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${url}/api/admin/get`);
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
    console.log(users.length);
  }, []);
  return (
    <div className="flex flex-row flex-wrap gap-8 p-4 max-w-6xl m-auto mt-4 min-h-[60vh]">
      {currentUser &&
        currentUser.role === "MainAdmin" && users.length === 0 ? (
          <div className="min-h-full min-w-full text flex justify-center items-center text-3xl font-semibold ">Loading...</div>
        ) :currentUser &&
        currentUser.role === "MainAdmin" &&
        users &&
        users.map((user) => <UserCard key={user._id} user={user} />)  } 
    </div>
  );
}
