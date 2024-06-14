import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Logo, CompanyName } from "../Components/Default";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3005/account/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      enqueueSnackbar(res.data.msg, { variant: "success" });
      navigate("/");
    } catch (error) {
      console.log("ERROR: ", error.response.data.msg);
      enqueueSnackbar(error.response.data.msg, { variant: "error" });
    }
  };

  return (
    <div className="flex flex-col max-sm:justify-center max-sm:items-center w-screen h-screen">
      <div className="flex items-center justify-center mb-5 sm:my-10">
        <h1 className="text-lg md:text-xl mr-2">{CompanyName}</h1>
        <img src={Logo} alt="Logo" className="w-10 md:w-16" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        {" "}
        Welcome Back{" "}
      </h2>
      <div className="flex flex-col justify-center items-center ">
        <form
          onSubmit={handleSubmit}
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // required
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btnSubmit">
            Login
          </button>
        </form>
      </div>
      <div className="flex justify-between items-center w-8/12 md:w-1/2 xl:w-1/3 mx-auto mt-4">
        <Link
          to="/forgot-password"
          className="text-red-400 hover:text-red-300 active:text-primary-500 underline transition duration-300 ease-in-out "
        >
          Forgot Password?
        </Link>
        <Link
          to="/signup"
          className="bg-red-400 text-white py-1 px-3 rounded-lg hover:bg-red-300 transition duration-300 ease-in-out active:bg-primary-500"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

//   import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//   import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// <FontAwesomeIcon icon={faTimes} />
// <FontAwesomeIcon icon={faUser} />

// Another Method for the
// const response = await fetch("http://localhost:3005/account/login", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ email, password }),
// });

// if (!response.ok) {
//   console.log("Error occur in response!");
// }

// const data = await response.json();
// console.log("DATA: ", data);
