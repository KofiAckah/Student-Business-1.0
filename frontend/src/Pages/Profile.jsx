import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3005/user/get-profile", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (error) {
        enqueueSnackbar(error.response.data.msg, { variant: "error" });
      }
    };
    fetchProfile();
  }, [enqueueSnackbar]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3005/user/seller-products",
          {
            withCredentials: true,
          }
        );
        setProducts(res.data);
      } catch (error) {
        enqueueSnackbar(error.response.data.msg, { variant: "error" });
      }
    };
    fetchProducts();
  }, [enqueueSnackbar]);

  return (
    <div className="">
      <NavBar />
      <div className="w-full py-10">
        <div className="md:grid grid-cols-3 mx-10 gap-10">
          <div className="card h-[33rem] p-3 px-5">
            <div className="flex flex-col items-center rounded-full overflow-hidden border-2 border-red-400 w-32 h-32 md:w-40 md:h-40 mx-auto bg-secondary-100">
              {user.image !== "" ? (
                <img
                  src={`http://localhost:3005/uploads/${user.image}`}
                  alt="Product"
                  className="w-32 h-32 md:w-52 md:h-52 object-contain"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
                />
              )}
            </div>
            <p className="text-lg font-medium my-2 text-center">
              {user.username}
            </p>
            <p className="text-sm text-gray-500 my-1">{user.email}</p>
            <p className="text-sm text-gray-500 my-1">0{user.phone}</p>
            <p className="text-sm text-primary-400 my-1">Bio</p>
            <p className="text-sm text-gray-500 my-1">
              {user.bio !== "" ? user.bio : ""}
            </p>
          </div>
          {/*  */}
          <div className="col-span-2 card2">
            <p className="text-lg font-medium m-2">My Products</p>
            <div className="flex flex-wrap gap-2 my-4 mx-5">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="border border-primary-400 rounded-lg text-primary-400 bg-white mx-auto w-40 h-56 sm:w-48 sm:h-64 overflow-hidden hover:shadow-lg relative"
                >
                  <p className="text-red-400 absolute right-0 bg-primary-400 px-2">
                    GH&#8373; {Number(product.price).toFixed(2)}
                  </p>
                  <img
                    src={`http://localhost:3005/uploads/${product.image}`}
                    alt="Product"
                    className="w-40 h-40 sm:w-48 sm:h-48 object-cover"
                  />
                  <div className="">
                    <h3 className="line-clamp-1 font-medium p-2">
                      {product.title}
                    </h3>
                    <div className="flex justify-between">
                      <Link
                        to={`/view-items/${product._id}`}
                        className="bg-green-400 w-full"
                      >
                        View
                      </Link>
                      <Link className="bg-yellow-400 w-full">Edit</Link>
                      <Link className="bg-red-400 w-full">Del</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
