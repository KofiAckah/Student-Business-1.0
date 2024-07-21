import { Link } from "react-router-dom";

export default function CategoryNav(className) {
  return (
    <div className={`${className} bg-black bg-opacity-50 `}>
      <ul className="flex flex-col">
        <Link to="/clothes" className="left-0 text-white hover:bg-red-400 px-2">
          Clothes
        </Link>
        <Link
          to="/electronics"
          className="left-0 text-white hover:bg-red-400 px-2"
        >
          Electronics
        </Link>
        <Link to="/food" className="left-0 text-white hover:bg-red-400 px-2">
          Food
        </Link>
        <Link
          to="/home-appliances"
          className="left-0 text-white hover:bg-red-400 px-2"
        >
          Home Appliances
        </Link>
        <Link
          to="/services"
          className="left-0 text-white hover:bg-red-400 px-2"
        >
          Services
        </Link>
        <Link
          to="/software"
          className="left-0 text-white hover:bg-red-400 px-2"
        >
          Software
        </Link>
        <Link
          to="/student-needs"
          className="left-0 text-white hover:bg-red-400 px-2"
        >
          Student Needs
        </Link>
        <Link to="/others" className="left-0 text-white hover:bg-red-400 px-2">
          Others
        </Link>
      </ul>
    </div>
  );
}
