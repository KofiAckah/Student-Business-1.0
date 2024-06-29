import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

// Components
import NavBar from "../Components/NavBar";

export default function ViewProduct() {
  const [product, setProduct] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3005/user/view-product/${id}`,
          {
            withCredentials: true,
          }
        );
        setProduct(res.data);
      } catch (error) {
        console.log(error);
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
        <div className="mx-auto w-10/12 md:mt-10">
          <div className="bg-secondary-100 p-2 rounded-lg max-md:mt-4">
            <p className="text-primary-400 font-bold">{product.title}</p>
            <p className="text-red-400 font-semibold">
              GH&#8373; {Number(product.price).toFixed(2)}
            </p>
            <p>
              <FontAwesomeIcon icon={faLocationDot} className="text-red-400" />{" "}
              {product.location}
            </p>
          </div>
          <div className="bg-secondary-100 p-2 rounded-lg mt-4">
            <p className="text-primary-400 font-bold">
              Category: <span className="font-normal">{product.category}</span>
            </p>
            {product.categoryOthers && (
              <p className="text-primary-400 font-bold">
                Others:{" "}
                <span className="font-normal">{product.categoryOthers}</span>
              </p>
            )}
            <p className="text-primary-400 font-bold">Description:</p>
            <p>{product.description === "" ? "..." : product.description}</p>
            {product.condition && (
              <p className="text-primary-400 font-bold">
                Condition:{" "}
                <span className="font-normal">{product.condition}</span>
              </p>
            )}
            <p className="text-primary-400 font-bold">
              Negotiable:{" "}
              <span className="font-normal">
                {product.negotiable === true ? "Yes" : "No"}
              </span>
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold text-orange-600">Created: </span>
              {new Date(product.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold text-orange-600">Updated: </span>
              {new Date(product.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
