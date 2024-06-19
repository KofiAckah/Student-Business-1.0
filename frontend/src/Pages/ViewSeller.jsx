import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMessage,
  faUser,
  faPhone,
  faCalendar,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import NavBar from "../Components/NavBar";

export default function ViewSeller() {
  const { id } = useParams();
  const [seller, setSeller] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3005/user/get-seller/${id}`,
          {
            withCredentials: true,
          }
        );
        setSeller(res.data);
      } catch (error) {
        enqueueSnackbar(error.response.data.msg, { variant: "error" });
      }
    };
    fetchSeller();
  }, [enqueueSnackbar, id]);
  return (
    <div>
      <NavBar />
      <div className="sm:flex justify-between items-center md:w-2/3 xl:w-1/2 m-5 max-sm:mx-2 md:mx-auto">
        <div className="bg-secondary-100 rounded-full w-32 h-32 sm:w-40 sm:h-40 overflow-hidden border-2 border-red-400 max-sm:mx-auto">
          {seller.image !== "" ? (
            <img
              src={`http://localhost:3005/uploads/${seller.image}`}
              alt="Product"
              className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
            />
          ) : (
            <FontAwesomeIcon
              icon={faUser}
              className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
            />
          )}
        </div>
        <div className="bg-secondary-100 text-primary-400 p-2 rounded-lg max-sm:mx-auto max-sm:w-10/12 max-sm:my-5 font-semibold">
          <p>
            <FontAwesomeIcon icon={faUser} className="text-red-400 mr-2" />{" "}
            {seller.username}
          </p>
          <p>
            {" "}
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-red-400 mr-2"
            />{" "}
            {seller.email}
          </p>
          <p>
            <FontAwesomeIcon icon={faCalendar} className="text-red-400 mr-2" />{" "}
            Joined:{" "}
            <span className="font-normal">
              {new Date(seller.yearJoin).toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>
      <div className="md:flex items-center text-primary-400 max-md:w-10/12 max-md:mx-auto lg:mx-32">
        <div className="bg-secondary-100 md:w-1/3 p-2 m-2 rounded-lg self-stretch mt-4 mb-2">
          <p className="font-semibold">Bio</p>
          {seller.bio !== "" ? <p>{seller.bio}</p> : <p>No Info</p>}
        </div>
        <div className="md:w-1/3 p-2 rounded-lg">
          <Link>
            <button className="bg-red-400 text-white font-semibold py-2 px-4 rounded-lg mt-4 mx-auto w-full hover:bg-white border border-red-400 hover:text-red-400">
              <FontAwesomeIcon icon={faMessage} className="mr-3" /> Message the
              Seller
            </button>
          </Link>
          <Link to={`tel:0${seller.phone}`}>
            <button className="bg-red-400 text-white font-semibold py-2 px-4 rounded-lg mt-4 mx-auto w-full hover:bg-white border border-red-400 hover:text-red-400">
              <FontAwesomeIcon icon={faPhone} className="mr-3" /> 0
              {seller.phone}
            </button>
          </Link>
        </div>
        <div className="bg-secondary-100 md:w-1/3 p-2 m-2 rounded-lg self-stretch mt-4 mb-2">
          <h1 className="font-semibold text-center text-lg">Safety tips</h1>
          <p>
            <FontAwesomeIcon icon={faCheck} className="mr-2 text-green-400" />
            Avoid paying in advance
          </p>
          <p>
            <FontAwesomeIcon icon={faCheck} className="mr-2 text-green-400" />
            Meet with the seller at a safe public place
          </p>
          <p>
            <FontAwesomeIcon icon={faCheck} className="mr-2 text-green-400" />
            Inspect the item and ensure it&apos;s exactly what you want
          </p>
          <p>
            <FontAwesomeIcon icon={faCheck} className="mr-2 text-green-400" />
            Only pay if you&apos;re satisfied
          </p>
        </div>
      </div>
    </div>
  );
}
