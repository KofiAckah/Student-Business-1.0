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
// User Profile
import ViewSeller from "./Pages/ViewSeller";
import Profile from "./Pages/Profile";

import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/product/:id" element={<ShowProduct />} />
      <Route path="/seller/:id" element={<ViewSeller />} />
      <Route path="/profile" element={<Profile />} />
      {/* Accounts Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}
