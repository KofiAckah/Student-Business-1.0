import { useState } from "react";
import axios from "axios";
import { CompanyName, Logo } from "../Components/Default";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMessage,
  faBell,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3005/account/logout", {
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      enqueueSnackbar(error.response.data.msg, { variant: "error" });
    }
  };

  function handleMenu() {
    setOpen((prevOpen) => !prevOpen);
  }

  return (
    <div className="sticky top-0 shadow-2xl block z-10">
      <nav className="flex py-2 max-md:py-3 px-5 justify-between items-center bg-red-400">
        <Link to="/">
          <div className="flex items-center">
            <p className="md:text-4xl max-md:hidden text-2xl">{CompanyName}</p>
            <img
              src={Logo}
              alt="logo"
              className="md:w-10 md:h-10 w-7 h-7 md:ml-3"
            />
          </div>
        </Link>
        <ul className="flex gap-2 md:gap-5 items-center">
          <li>
            <Link to="/" className="group relative">
              <FontAwesomeIcon
                icon={faHome}
                className="p-2 rounded-lg text-white hover:text-red-400 hover:bg-white border border-white"
              />
              <div className="absolute left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-black rounded invisible group-hover:visible">
                Home
              </div>
            </Link>
          </li>
          <li>
            <Link className="group relative">
              <FontAwesomeIcon
                icon={faBell}
                className="p-2 rounded-lg text-white hover:text-red-400 hover:bg-white border border-white"
              />
              <div className="absolute left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-black rounded invisible group-hover:visible">
                Notifications
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/sell"
              className="p-2 rounded-lg bg-green-400 text-white hover:text-green-400 hover:bg-white border border-white px-5"
            >
              Sell
            </Link>
          </li>
          <li>
            <Link className="group relative">
              <FontAwesomeIcon
                icon={faMessage}
                className="p-2 rounded-lg text-white hover:text-red-400 hover:bg-white border border-white"
              />
              <div className="absolute left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-black rounded invisible group-hover:visible">
                Messages
              </div>
            </Link>
          </li>
          <li>
            <Link className="group relative">
              <FontAwesomeIcon
                icon={faUser}
                onClick={handleMenu}
                bounce={open ? false : true}
                className="p-2 rounded-lg text-white hover:text-red-400 hover:bg-white border border-white"
              />
              <div className="absolute left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-black rounded invisible group-hover:visible">
                Profile
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      <ul
        className={`${
          open ? "hidden" : "block"
        } bg-white w-24 absolute right-0 text-primary-400 font-medium border border-red-400 rounded-lg shadow-md overflow-hidden mr-2`}
      >
        <li className="hover:bg-red-400 w-full hover:text-white">
          <Link to="/profile" className="p-2">
            Profile
          </Link>
        </li>
        <li className="hover:bg-red-400 w-full hover:text-white">
          <Link to="/edit-profile" className="p-2">
            Settings
          </Link>
        </li>
        <li className="hover:bg-red-400 w-full hover:text-white">
          <Link onClick={handleLogout} className="p-2">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
