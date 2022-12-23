import React from "react";
import NavBar from "../components/NavBar";
import { useNavigate, Navigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo && !userInfo?.token) {
    return <Navigate to='/login' />;
  }
  return (
    <div>
      <NavBar />
      <div>
        <h1> Welcome ... !! </h1>
      </div>
    </div>
  );
}

export default Home;
