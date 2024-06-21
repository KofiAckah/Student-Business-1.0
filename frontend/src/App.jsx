import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
// Account Routes
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyOTP from "./Pages/VerifyOTP";
import ResetPassword from "./Pages/ResetPassword";
// Products Routes
import Sell from "./Pages/Sell";
import ShowProduct from "./Pages/ShowProduct";
import ViewSeller from "./Pages/ViewSeller";
// User Routes
import Profile from "./Pages/Profile";
import ViewProduct from "./Pages/ViewProduct";

import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/product/:id" element={<ShowProduct />} />
      <Route path="/seller/:id" element={<ViewSeller />} />
      {/* User Routes */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/view-items/:id" element={<ViewProduct />} />
      {/* Accounts Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}
