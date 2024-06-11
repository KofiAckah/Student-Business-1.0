import { useState } from "react";
import { CompanyName, Logo } from "../Components/Default";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Nav() {
  const [open, setOpen] = useState(true);

  function handleMenu() {
    setOpen((prevOpen) => !prevOpen);
  }

  return (
    <div className="sticky bg-red-400 -top-2 shadow-2xl block z-10">
      {/* Nav Bar for Desktop */}
      <nav className="flex py-2 px-5 justify-between items-center">
        <Link to="/">
          <div className="flex items-center">
            <p className="md:text-4xl text-2xl">{CompanyName}</p>
            <img
              src={Logo}
              alt="logo"
              className="md:w-10 md:h-10 w-7 h-7 ml-3"
            />
          </div>
        </Link>
        <ul className="sm:flex hidden gap-5">
          <li>
            <Link smooth to="#home">
              Home
            </Link>
          </li>
          <li>
            <Link smooth to="#about">
              About
            </Link>
          </li>
          <li>
            <Link smooth to="#project">
              Messages
            </Link>
          </li>
          <li>
            <Link smooth to="#skill">
              Skills
            </Link>
          </li>
          <li>
            <Link smooth to="#contact">
              Contact
            </Link>
          </li>
        </ul>

        {/* Nav Bar for Mobile */}
        <FontAwesomeIcon
          onClick={handleMenu}
          icon={open ? faBars : faTimes}
          className="sm:hidden"
          bounce={open ? false : true}
        />
      </nav>
      <ul
        className={` ${
          open ? "hidden" : "block"
        } flex flex-col sm:hidden bg-secondary-200 justify-center items-center gap-5 p-5`}
      >
        <li>
          <Link smooth to="#home">
            Home
          </Link>
        </li>
        <li>
          <Link smooth to="#about">
            About
          </Link>
        </li>
        <li>
          <Link smooth to="#project">
            Messages
          </Link>
        </li>
        <li>
          <Link smooth to="#skill">
            Skills
          </Link>
        </li>
        <li>
          <Link smooth to="#contact">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
