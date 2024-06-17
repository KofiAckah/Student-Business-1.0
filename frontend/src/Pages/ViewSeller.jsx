import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faEnvelope,
  faUser,
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
      <div>
        <div className="bg-secondary-100 rounded-full w-32 h-32 sm:w-40 sm:h-40 overflow-hidden border border-red-400">
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
        <p>{seller.username}</p>
        <p>{seller.email}</p>
        <p>{seller.yearJoin}</p>
        <p>0{seller.phone}</p>
      </div>
    </div>
  );
}
