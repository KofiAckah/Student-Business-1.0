import { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { Logo, CompanyName } from "../Components/Default";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

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
  return (
    <div>
      <NavBar />
      <div className="flex flex-col max-sm:justify-center max-sm:items-center w-screen h-screen">
        <div className="flex items-center justify-center mb-5 sm:my-10">
          <h1 className="text-lg md:text-xl mr-2">{CompanyName}</h1>
          <img src={Logo} alt="Logo" className="w-10 md:w-16" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          {" "}
          Welcome to {CompanyName}{" "}
        </h2>
        <div className="flex flex-col justify-center items-center ">
          <h2 className="text-xl md:text-2xl font-bold text-center my-5">
            {" "}
            Products{" "}
          </h2>
          <div className="flex flex-wrap justify-center items-center w-screen">
            {products.map((product, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center w-8/12 md:w-1/2 xl:w-1/3 my-5"
              >
                <img
                  src={`http://localhost:3005/uploads/${product.image}`}
                  alt="Product"
                  className="w-11/12 h-52 md:h-72 object-cover"
                />
                <h3 className="text-lg font-bold my-2">{product.title}</h3>
                <p className="text-sm text-center">{product.description}</p>
                <p className="text-lg font-bold my-2">
                  Price: ${product.price}
                </p>
                <p className="text-sm">Posted by: {product.postedBy}</p>
              </div>
            ))}
          </div>
        </div>
        <Link to="/sell" className="mt-5">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sell Product
          </button>
        </Link>
      </div>
    </div>
  );
}
