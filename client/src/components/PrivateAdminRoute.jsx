import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateAdminRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.role === "admin" ||currentUser.role === "MainAdmin" ? <Outlet/> : <Navigate to='/'/>
 }
