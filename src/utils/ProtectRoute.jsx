import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navigate, Outlet } from "react-router-dom";
import {verifiedUserRole } from "../redux/slice/userSlice";

function ProtectRoute({ allowedRoles }) {
  const dispatch = useDispatch();

  const {
    loginUserData,
    isloginLoading,
    authChecked,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (!authChecked) {
      // console.log("fdf")
    dispatch(verifiedUserRole())
    }
  }, [authChecked, dispatch]);

  // console.log(loginUserData,"poopkopjoi;i")
  // show loading until auth check completes
  if (!authChecked || isloginLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  // not logged in → redirect
  if (!loginUserData) {
    return <Navigate to="/" replace />;
  }

  const userRole = loginUserData?.user?.role;

  // role protection
  if (allowedRoles?.length && !allowedRoles.includes(userRole)) {
    return <Navigate to="/not-found" replace />;
  }

  return <Outlet />;
}

export default ProtectRoute;