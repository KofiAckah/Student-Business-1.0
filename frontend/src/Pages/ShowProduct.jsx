import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// Components
import NavBar from "../Components/NavBar";

export default function ShowProduct() {
  const [product, setProduct] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3005/account/get-product/${id}`,
          {
            withCredentials: true,
          }
        );
        setProduct(res.data);
      } catch (error) {
        enqueueSnackbar(error.response.data.msg, { variant: "error" });
      }
    };
    fetchProduct();
  }, [enqueueSnackbar, id]);
  return (
    <div>
      <NavBar />
      <div className="md:grid grid-cols-3 items-center">
        <div className="mt-2 sm:mt-4 w-10/12  mx-auto col-span-2 overflow-hidden">
          <img
            src={`http://localhost:3005/uploads/${product.image}`}
            alt={product.title}
            className="w-full h-72 sm:h-80 md:h-96 object-contain rounded-lg bg-gray-200 shadow-md"
          />
        </div>
        <div className="mx-auto w-10/12">
          <div className="bg-secondary-100 p-2 rounded-lg max-md:mt-4">
            <p className="text-primary-400 font-bold">{product.title}</p>
            <p className="text-red-400 font-semibold">
              GH&#8373; {product.price}
            </p>
            <p>
              <FontAwesomeIcon icon={faLocationDot} className="text-red-400" />{" "}
              {product.location}
            </p>
          </div>
          <div className="bg-secondary-100 p-2 rounded-lg mt-4">
            <p className="text-primary-400 font-bold">
              <FontAwesomeIcon icon={faUser} className="mr-1 text-red-400" />
              {product.postedBy}
            </p>
            <p className="text-primary-400 font-bold">Description:</p>
            <p>{product.description === "" ? "..." : product.description}</p>
          </div>
          <Link>
            <button className="bg-red-400 text-white font-semibold py-2 px-4 rounded-lg mt-4 mx-auto w-full hover:bg-white border border-red-400 hover:text-red-400">
              <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
              Contact Seller
            </button>
          </Link>
          <Link to={`/seller/${product.id}`}>
            <button className="bg-red-400 text-white font-semibold py-2 px-4 rounded-lg mt-4 mx-auto w-full hover:bg-white border border-red-400 hover:text-red-400">
              <FontAwesomeIcon icon={faUser} className="mr-3" /> View Seller
              Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
