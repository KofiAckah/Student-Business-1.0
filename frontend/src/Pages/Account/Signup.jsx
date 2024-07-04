import axios from "axios";
import { CompanyName, Logo } from "../../Components/Default";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3005/account/register", {
        username: userName,
        email,
        password,
        confirmPassword,
        phone,
      });
      enqueueSnackbar(res.data.msg, { variant: "success" });
      enqueueSnackbar("Check email for verification", { variant: "info" });
      navigate("/login");
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
          onSubmit={handleSignUp}
          className="flex flex-col items-center justify-center w-screen"
        >
          <div className="my-5 w-8/12 md:w-1/2 xl:w-1/3">
            <input
              className="loginInput"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
            />
          </div>
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
              placeholder="Password"
            />
          </div>
          <div className="my-5 w-8/12 md:w-1/2 xl:w-1/3 relative">
            <input
              className="loginInput"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
            <FontAwesomeIcon
              onClick={() => setShowPassword(!showPassword)}
              icon={showPassword ? faEye : faEyeSlash}
              className="absolute right-3 top-2 text-primary-500 hover:text-primary-400 cursor-pointer"
            />
          </div>
          <div className="my-5 w-8/12 md:w-1/2 xl:w-1/3">
            <input
              className="loginInput"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />
          </div>
          <button type="submit" className="btnSubmit">
            Sign Up
          </button>
          <Link to="/login" className="my-5 text-blue-500">
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
}
