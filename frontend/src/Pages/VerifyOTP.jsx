import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { CompanyName, Logo } from "../Components/Default";

export default function VerifyOTP() {
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3005/account/verify-otp", {
        email,
        OTP,
      });
      enqueueSnackbar(res.data.msg, { variant: "success" });
      navigate("/reset-password");
    } catch (error) {
      console.log("ERROR: ", error.response.data.msg);
      enqueueSnackbar(error.response.data.msg, { variant: "error" });
    }
  };
  return (
    <div>
      <div className="flex flex-col max-sm:justify-center max-sm:items-center w-screen h-screen">
        <div className="flex items-center justify-center mb-5 sm:my-10">
          <h1 className="text-lg md:text-xl mr-2">{CompanyName}</h1>
          <img src={Logo} alt="Logo" className="w-10 md:w-16" />
        </div>
        <form
          onSubmit={handleVerifyOTP}
          className="flex flex-col items-center justify-center w-screen"
        >
          <div className="my-5 w-8/12 md:w-1/2 xl:w-1/3">
            <input
              className="loginInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="my-5 w-8/12 md:w-1/2 xl:w-1/3">
            <input
              className="loginInput"
              type="number"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
              placeholder="OTP"
            />
          </div>
          <button type="submit" className="btnSubmit">
            Verify OTP
          </button>
        </form>
        <div className="flex justify-between items-center w-8/12 md:w-1/2 xl:w-1/3 mx-auto mt-4">
          <Link
            to="/login"
            className="bg-red-400 text-white py-1 px-3 rounded-lg hover:bg-red-300 transition duration-300 ease-in-out active:bg-primary-500 "
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="bg-red-400 text-white py-1 px-3 rounded-lg hover:bg-red-300 transition duration-300 ease-in-out active:bg-primary-500"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
