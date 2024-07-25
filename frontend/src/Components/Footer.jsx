import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className="gradient w-full h-full pb-4">
      <div className="grid grid-cols-2">
        <div className="mx-auto">
          <p className="text-green-400 font-semibold">Categories</p>
          <ul>
            <li className="text-white hover:text-green-400 transition-all ease-in-out duration-500 hover:pl-2">
              <Link to="/clothes">Clothes</Link>
            </li>
            <li className="text-white hover:text-green-400 transition-all ease-in-out duration-500 hover:pl-2">
              <Link to="/electronics">Electronics</Link>
            </li>
            <li className="text-white hover:text-green-400 transition-all ease-in-out duration-500 hover:pl-2">
              <Link to="/food">Food</Link>
            </li>
            <li className="text-white hover:text-green-400 transition-all ease-in-out duration-500 hover:pl-2">
              <Link to="/home-appliances">Home Appliances</Link>
            </li>
            <li className="text-white hover:text-green-400 transition-all ease-in-out duration-500 hover:pl-2">
              <Link to="/services">Services</Link>
            </li>
            <li className="text-white hover:text-green-400 transition-all ease-in-out duration-500 hover:pl-2">
              <Link to="/software">Software</Link>
            </li>
            <li className="text-white hover:text-green-400 transition-all ease-in-out duration-500 hover:pl-2">
              <Link to="/student-needs">Student Needs</Link>
            </li>
            <li className="text-white hover:text-green-400 transition-all ease-in-out duration-500 hover:pl-2">
              <Link to="/others">Others</Link>
            </li>
          </ul>
        </div>
        <div className="mx-auto">
          <p className="text-green-400 font-semibold">Company</p>
          <ul>
            <li className="text-white hover:text-green-400 transition-all ease-in-out duration-500 hover:pl-2">
              <Link to="/about">About</Link>
            </li>
            <li className="text-white hover:text-green-400 transition-all ease-in-out duration-500 hover:pl-2">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="text-white hover:text-green-400 transition-all ease-in-out duration-500 hover:pl-2">
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            {/* <li>
              <Link to="/terms-of-service">Terms of Service</Link>
            </li> */}
          </ul>
          <p className="text-green-400 font-semibold">Social</p>
          <ul className="">
            <li className="text-white hover:text-green-400 transition-all ease-in-out duration-500 hover:pl-2">
              <a href="https://www.facebook.com/">
                <FontAwesomeIcon icon={faFacebook} /> Facebook
              </a>
            </li>
            <li className="text-white hover:text-green-400 transition-all ease-in-out duration-500 hover:pl-2">
              <a href="https://www.instagram.com/">
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </a>
            </li>
            <li className="text-white hover:text-green-400 transition-all ease-in-out duration-500 hover:pl-2">
              <a href="https://www.twitter.com/">
                <FontAwesomeIcon icon={faXTwitter} /> Twitter
              </a>
            </li>
            <li className="text-white hover:text-green-400 transition-all ease-in-out duration-500 hover:pl-2">
              <a href="https://www.linkedin.com/">
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
