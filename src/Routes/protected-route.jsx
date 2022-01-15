import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const allowedEmail = ["admin@teamop.us"];
const allowedPassword = ["teamopisreallyop"];

const checkIfAuthAllowed = (email, password) => {
  return allowedEmail.includes(email) && allowedPassword.includes(password);
};

export default function ProtectedRoute() {
  const {email,password} = useSelector((state) => state.user);

  return checkIfAuthAllowed(email, password) ? <Outlet /> : <Navigate to="/" />;
}
