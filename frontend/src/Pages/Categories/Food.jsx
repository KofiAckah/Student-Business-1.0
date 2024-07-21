import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

// Component for Clothes category page
import NavBar from "../../Components/NavBar";
import CategoryNav from "../../Components/CategoryNav";
import MainImage from "../../assets/food.jpg";

export default function Food() {
  const [products, setProducts] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3005/category/food", {
          withCredentials: true,
        });
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
      <div className="w-full bg-black relative">
        <img
          src={MainImage}
          alt="MainImage"
          className="lg:h-[30rem] object-cover mx-auto w-full opacity-80"
        />
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl md:text-4xl font-black text-center">
          Fresh and delicious food.
        </p>
        <div className="absolute top-0">
          <button
            className={`text-lg px-2 bg-white rounded-br-md ${
              showCategory ? "bg-primary-400 text-white" : "text-black"
            }`}
            onClick={() => setShowCategory(!showCategory)}
          >
            Food{" "}
            <FontAwesomeIcon icon={showCategory ? faCaretUp : faCaretDown} />
          </button>
          {showCategory && <CategoryNav />}
        </div>
      </div>
      <h2 className="text-center text-lg md:text-xl font-semibold mt-3">
        {products.length === 0
          ? "No product Available Now"
          : "Latest Products On Food"}
      </h2>
      <div className="flex flex-wrap sm:gap-2 my-4 lg:w-2/3 mx-5 lg:mx-auto">
        {products.map((product, index) => (
          <Link
            key={index}
            to={`/product/${product._id}`}
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
    </div>
  );
}
