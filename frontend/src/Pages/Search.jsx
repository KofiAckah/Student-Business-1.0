import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faTimes } from "@fortawesome/free-solid-svg-icons";

// Components
import NavBar from "../Components/NavBar";

export default function Search() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [searchMode, setSearchMode] = useState("all");
  const { enqueueSnackbar } = useSnackbar();

  const handleAllSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3005/user/search-product?query=${query}`,
        {
          withCredentials: true,
        }
      );
      setProducts(res.data);
    } catch (error) {
      enqueueSnackbar(error.response.data.msg, { variant: "error" });
    }
  };

  // search-by-title
  const handleSearchByTitle = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3005/user/search-by-title?query=${query}`,
        {
          withCredentials: true,
        }
      );
      setProducts(res.data);
    } catch (error) {
      enqueueSnackbar(error.response.data.msg, { variant: "error" });
    }
  };

  const handleFilter = () => {
    switch (searchMode) {
      case "title":
        handleSearchByTitle();
        break;
      default:
        handleAllSearch();
    }
  };

  const handleClear = () => {
    setProducts([]);
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center w-full gradient h-64">
          <div className="flex my-2 sm:my-3 mt-5 sm:mt-7 w-10/12 md:w-2/3 xl:w-1/2 items-center">
            <input
              type="text"
              placeholder="Search for a product"
              className="loginInput"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="ml-4 text-white border border-white rounded-md p-1 px-2 group relative">
              <FontAwesomeIcon icon={faSliders} className="" />
              <div className="absolute left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-black invisible rounded group-hover:visible">
                Filter
              </div>
            </button>
          </div>
          <div className="mt-4">
            <button
              className="bg-primary-100 text-white p-2 rounded-md mr-4 w-20"
              onClick={handleAllSearch}
            >
              Search
            </button>
            <button
              disabled={query === ""}
              className={`bg-red-600 text-white p-2 rounded-md ml-4 w-20 ${
                query === "" && "cursor-not-allowed"
              }`}
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
          <div className="fixed right-0 bg-black bg-opacity-50 h-[70%] w-[70%] sm:w-[23rem] top-16">
            <FontAwesomeIcon
              icon={faTimes}
              bounce
              className="text-white h-5 w-5 cursor-pointer m-3"
            />
            <div>
              <button>Title</button>
              <button>Location</button>
              <button>Cateogery</button>
              <button>Condition</button>
              <button>Price</button>
            </div>
          </div>
        </div>
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

          {/* {products.length === 0 && !query && <p>Search for a product</p>} */}

          {/* {products.length === 0 && <p>No products found matching the query</p>} */}

          {/* {products.length === 0 && query && <p>Searching for products...</p>} */}
        </div>
      </div>
    </div>
  );
}
