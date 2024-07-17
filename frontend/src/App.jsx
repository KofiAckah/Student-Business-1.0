// import { Navigate, Routes, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
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

// import { useAuthContext } from "./Components/authContext";
import "./App.css";

export default function App() {
  // const { auth } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sell" element={<Sell />} />
      {/* <Route
        path="/sell"
        element={
          auth ? (
            <Sell />
          ) : (
            // : <Login />} />
            <Navigate to="/login" />
          )
        }
      /> */}
      <Route path="/product/:id" element={<ShowProduct />} />
      {/* <Route path="/product/:id" element={auth ? <ShowProduct /> : <Login />} /> */}
      <Route path="/seller/:id" element={<ViewSeller />} />
      {/* User Routes */}
      <Route path="/profile" element={<Profile />} />
      {/* <Route
        path="/profile"
        element={
          auth ? (
            <Profile />
          ) : (
            <Login />
            // <Navigate to="/login" />
          )
        }
      /> */}
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/view-items/:id" element={<ViewProduct />} />
      <Route path="/edit-items/:id" element={<EditProduct />} />
      {/* Messages Routes */}
      <Route path="/messages" element={<Message />} />
      <Route path="/chat/:id" element={<Chat />} />
      {/* Accounts Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}
