import { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { Logo, CompanyName } from "../Components/Default";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCirclePlus,
  faUtensils,
  faBook,
  faShirt,
} from "@fortawesome/free-solid-svg-icons";

import NavBar from "../Components/NavBar";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3005/account/get-product",
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

  const categories = [
    {
      name: "Sell A Product",
      icon: faCirclePlus,
      link: "/sell",
    },
    { name: "Food", icon: faUtensils, link: "/food" },
    { name: "Student Needs", icon: faBook, link: "/student-needs" },
    { name: "Clothes", icon: faShirt, link: "/clothes" },
  ];

  return (
    <div className="bg-secondary-100">
      <NavBar />
      <div className="flex flex-col justify-center items-center w-full gradient h-56">
        <p className="text-white font-medium">
          Find anything in{" "}
          <span className="bg-black text-white px-2 py-1 rounded-md">
            <FontAwesomeIcon icon={faLocationDot} /> All KNUST
          </span>
        </p>
        <div className="flex items-center mt-2">
          <p className="md:text-3xl text-2xl">{CompanyName}</p>
          <img src={Logo} alt="logo" className="md:w-7 md:h-7 w-5 h-5 ml-3" />
        </div>
      </div>
      <div className="bg-white py-4">
        <h2 className="text-center text-lg md:text-xl font-semibold">
          Top Categories
        </h2>
        <div className="flex flex-wrap gap-2 my-4 lg:w-2/3 lg:mx-auto">
          {categories.map((category, index) => (
            <Link
              to={category.link}
              key={index}
              className="border border-primary-400 rounded-lg p-5 text-primary-400 hover:bg-primary-400 hover:text-white transition duration-300 ease-in-out w-40 mx-auto"
            >
              <div className="flex flex-col items-center justify-center">
                <FontAwesomeIcon icon={category.icon} size="3x" />
                <p>{category.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <h2 className="text-center text-lg md:text-xl font-semibold">
        Latest Products
      </h2>
      <div className="flex flex-wrap sm:gap-2 my-4 lg:w-2/3 mx-5 lg:mx-auto">
        {products.map((product, index) => (
          <Link
            key={index}
            to={`/product/${product.id}`}
            className="border border-primary-400 rounded-lg text-primary-400 bg-white w-36 h-52 sm:w-48 sm:h-64 overflow-hidden hover:shadow-lg mx-auto my-3"
          >
            <img
              src={`http://localhost:3005/uploads/${product.image}`}
              alt="Product"
              className="w-36 h-36 sm:w-48 sm:h-48 object-cover"
            />
            <div className="p-2">
              <h3 className="line-clamp-1 font-medium">{product.title}</h3>
              <p className="text-red-400">
                GH&#8373; {Number(product.price).toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="gradient h-10 w-full"></div>
    </div>
  );
}
