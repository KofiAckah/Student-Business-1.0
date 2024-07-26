// import { Navigate, Routes, Route, redirect } from "react-router-dom";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
// Account Routes
import Login from "./Pages/Account/Login";
import SignUp from "./Pages/Account/Signup";
import ForgotPassword from "./Pages/Account/ForgotPassword";
import VerifyOTP from "./Pages/Account/VerifyOTP";
import ResetPassword from "./Pages/Account/ResetPassword";
// Products Routes
import Sell from "./Pages/Sell";
import ShowProduct from "./Pages/ShowProduct";
import ViewSeller from "./Pages/ViewSeller";
// User Routes
import Profile from "./Pages/Profile/Profile";
import EditProfile from "./Pages/Profile/EditProfile";
import ViewProduct from "./Pages/Profile/ViewProduct";
import EditProduct from "./Pages/Profile/EditProduct";
// Messages Routes
import Message from "./Pages/Messages/Message";
import Chat from "./Pages/Messages/Chat";
// Categories Rouets
import Clothes from "./Pages/Categories/Clothes";
import Food from "./Pages/Categories/Food";
import Electronics from "./Pages/Categories/Electronics";
import HomeAppliances from "./Pages/Categories/HomeAppliances";
import Services from "./Pages/Categories/Services";
import Software from "./Pages/Categories/Software";
import StudentNeeds from "./Pages/Categories/StudentNeeds";
import Others from "./Pages/Categories/Others";

import { useAuthContext } from "./Components/authContext";
import "./App.css";

export default function App() {
  const { auth } = useAuthContext();

  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 3600000); // 1 hour in milliseconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      {/* <Route path="/sell" element={<Sell />} /> */}
      <Route path="/sell" element={auth ? <Sell /> : <Login />} />
      <Route path="/product/:id" element={<ShowProduct />} />
      <Route path="/seller/:id" element={auth ? <ViewSeller /> : <Login />} />
      {/* User Routes */}
      <Route path="/profile" element={auth ? <Profile /> : <Login />} />
      <Route
        path="/edit-profile"
        element={auth ? <EditProfile /> : <Login />}
      />
      <Route
        path="/view-items/:id"
        element={auth ? <ViewProduct /> : <Login />}
      />
      <Route
        path="/edit-items/:id"
        element={auth ? <EditProduct /> : <Login />}
      />
      {/* Messages Routes */}
      <Route path="/messages" element={auth ? <Message /> : <Login />} />
      <Route path="/chat/:id" element={auth ? <Chat /> : <Login />} />
      {/* Categories Routes*/}
      <Route path="/clothes" element={<Clothes />} />
      <Route path="/food" element={<Food />} />
      <Route path="/electronics" element={<Electronics />} />
      <Route path="/home-appliances" element={<HomeAppliances />} />
      <Route path="/services" element={<Services />} />
      <Route path="/software" element={<Software />} />
      <Route path="/Student-needs" element={<StudentNeeds />} />
      <Route path="/others" element={<Others />} />
      {/* Accounts Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}
