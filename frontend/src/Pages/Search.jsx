import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSliders,
  faTimes,
  faArrowUpAZ,
  faArrowDownZA,
  faArrowDownShortWide,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";

// Components
import NavBar from "../Components/NavBar";

export default function Search() {
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [searchMode, setSearchMode] = useState("all");
  const [category, setCategory] = useState("");
  const [displayFilter, setDisplayFilter] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [sortedProducts, setSortedProducts] = useState([]);

  const handleAllSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3005/user/search-product?query=${query}`,
        {
          withCredentials: true,
        }
      );
      setProducts(res.data);
      setSortedProducts(res.data);
    } catch (error) {
      enqueueSnackbar(error.response.data.msg, { variant: "error" });
    }
  };

  const handleSearchByTitle = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3005/user/search-by-title?query=${query}`,
        {
          withCredentials: true,
        }
      );
      setProducts(res.data);
      setSortedProducts(res.data);
    } catch (error) {
      enqueueSnackbar(error.response.data.msg, { variant: "error" });
    }
  };

  const handleSearchByLocation = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3005/user/search-by-location?query=${query}`,
        {
          withCredentials: true,
        }
      );
      setProducts(res.data);
      setSortedProducts(res.data);
    } catch (error) {
      enqueueSnackbar(error.response.data.msg, { variant: "error" });
    }
  };

  const handleSearchByCategory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3005/user/search-by-categoryandtitle?category=${category}&title=${query}`,
        {
          withCredentials: true,
        }
      );
      setProducts(res.data);
      setSortedProducts(res.data);
    } catch (error) {
      enqueueSnackbar(error.response.data.msg, { variant: "error" });
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearchByPriceRange = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3005/user/search-by-price-range?minPrice=${minPrice}&maxPrice=${maxPrice}`,
        {
          withCredentials: true,
        }
      );
      setProducts(res.data);
      setSortedProducts(res.data);
    } catch (error) {
      enqueueSnackbar(error.response.data.msg, { variant: "error" });
    }
  };

  const handleFilter = () => {
    switch (searchMode) {
      case "title":
        handleSearchByTitle();
        break;
      case "location":
        handleSearchByLocation();
        break;
      case "category":
        handleSearchByCategory();
        break;
      case "price":
        handleSearchByPriceRange();
        break;
      default:
        handleAllSearch();
    }
  };

  const sortProductsByNameInAscendingOrder = () => {
    const sorted = [...products].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    setSortedProducts(sorted);
  };

  const sortProductsByNameInDescendingOrder = () => {
    const sorted = [...products].sort((a, b) => {
      return b.title.localeCompare(a.title);
    });
    setSortedProducts(sorted);
  };

  const sortProductsByPriceInAscendingOrder = () => {
    const sorted = [...products].sort((a, b) => {
      return a.price - b.price;
    });
    setSortedProducts(sorted);
  };

  const sortProductsByPriceInDescendingOrder = () => {
    const sorted = [...products].sort((a, b) => {
      return b.price - a.price;
    });
    setSortedProducts(sorted);
  };

  const handleClear = () => {
    setProducts([]);
    setSortedProducts([]);
    setSearchMode("all");
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
              className={`loginInput ${searchMode === "price" ? "hidden" : ""}`}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div
              className={`${
                searchMode !== "price" ? "hidden" : ""
              } flex w-full justify-center`}
            >
              <div className="flex items-center justify-center flex-col mr-2">
                <label>Min Value</label>
                <input
                  type="number"
                  placeholder="Min value"
                  className={`loginInput`}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center flex-col">
                <label>Max Value</label>
                <input
                  type="number"
                  placeholder="Max value"
                  className={`loginInput`}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            <button
              className="ml-4 text-white border border-white rounded-md p-1 px-2 group relative"
              onClick={() => setDisplayFilter(true)}
            >
              <FontAwesomeIcon icon={faSliders} className="" />
              <div className="absolute left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-black invisible rounded group-hover:visible">
                Filter
              </div>
            </button>
          </div>
          <div className="mt-4">
            <button
              className="bg-primary-100 text-white p-2 rounded-md mr-4"
              onClick={handleFilter}
            >
              Search
            </button>
            <button
              className={`bg-red-600 text-white p-2 rounded-md ml-4 ${
                products.length === 0 ? "hidden" : ""
              } `}
              onClick={handleClear}
            >
              Clear Results
            </button>
          </div>
          <div
            className={`${
              displayFilter ? "block" : "hidden"
            } fixed bg-white h-[100rem] w-full bg-opacity-50`}
            onClick={() => setDisplayFilter(false)}
          ></div>
          <div
            className={`fixed right-0 bg-black bg-opacity-50 h-[70%] w-[70%] sm:w-[23rem] top-16 ${
              displayFilter ? "block" : "hidden"
            }`}
          >
            <FontAwesomeIcon
              icon={faTimes}
              bounce
              className="text-white h-5 w-5 cursor-pointer m-3 absolute right-0"
              onClick={() => {
                setDisplayFilter(false);
              }}
            />
            <div className="mt-10 flex flex-col items-start">
              <h2 className="mx-auto text-white text-lg">Filter By</h2>
              <button
                className={`searchFilterBtn ${
                  searchMode === "title" ? "bg-red-400" : ""
                }`}
                onClick={() => setSearchMode("title")}
              >
                Title
              </button>
              <button
                className={`searchFilterBtn ${
                  searchMode === "location" ? "bg-red-400" : ""
                }`}
                onClick={() => setSearchMode("location")}
              >
                Location
              </button>
              <label htmlFor="category" className="mx-auto text-white mb-1">
                Category
              </label>
              <select
                className={`w-[50%] sm:w-[8rem] mx-auto ${
                  searchMode === "category" ? "bg-red-400" : ""
                }`}
                value={category}
                onChange={handleCategoryChange}
                onClick={() => setSearchMode("category")}
              >
                <option value="">Category</option>
                <option value="Clothes">Clothes</option>
                <option value="Electronics">Electronics</option>
                <option value="Food">Food</option>
                <option value="Home Appliances">Home Appliances</option>
                <option value="Services">Services</option>
                <option value="Software">Software</option>
                <option value="Student Needs">Student Needs</option>
                <option value="Others">Others</option>
              </select>
              <button
                className={`searchFilterBtn ${
                  searchMode === "price" ? "bg-red-400" : ""
                }`}
                onClick={() => setSearchMode("price")}
              >
                Price
              </button>
              <button
                className={`searchFilterBtn bg-red-600 mt-5`}
                onClick={() => setSearchMode("all")}
              >
                Clear Filter
              </button>
            </div>
          </div>
        </div>
        {products.length !== 0 && searchMode === "title" && (
          <p className="mt-4">Results of Only Product Name</p>
        )}
        {products.length !== 0 && searchMode === "location" && (
          <p className="mt-4">Results of Only Location Name</p>
        )}
        {products.length !== 0 && searchMode === "category" && (
          <p className="mt-4">Results of Category : {category}</p>
        )}
        {products.length !== 0 && searchMode === "price" && (
          <>
            <p className="mt-4">Prices Reseults</p>
            <p className="">Min: {minPrice}</p>
            <p className="">Max: {maxPrice}</p>
          </>
        )}
        {products.length !== 0 && searchMode !== "price" && (
          <div className="">
            <FontAwesomeIcon
              icon={faArrowUpAZ}
              onClick={sortProductsByNameInAscendingOrder}
              className="border border-black p-1 rounded-md cursor-pointer mt-2 md:w-6 md:h-6 hover:bg-gray-200 mr-2"
            />
            <FontAwesomeIcon
              icon={faArrowDownZA}
              onClick={sortProductsByNameInDescendingOrder}
              className="border border-black p-1 rounded-md cursor-pointer mt-2 md:w-6 md:h-6 hover:bg-gray-200 ml-2"
            />
          </div>
        )}
        {products.length !== 0 && searchMode === "price" && (
          <div className="">
            <FontAwesomeIcon
              icon={faArrowDownShortWide}
              onClick={sortProductsByPriceInAscendingOrder}
              className="border border-black p-1 rounded-md cursor-pointer mt-2 md:w-6 md:h-6 hover:bg-gray-200 mr-2"
            />
            <FontAwesomeIcon
              icon={faArrowDownWideShort}
              onClick={sortProductsByPriceInDescendingOrder}
              className="border border-black p-1 rounded-md cursor-pointer mt-2 md:w-6 md:h-6 hover:bg-gray-200 ml-2"
            />
          </div>
        )}
        <div className="flex flex-wrap sm:gap-2 mb-4 lg:w-2/3 mx-5 lg:mx-auto">
          {sortedProducts.map((product, index) => (
            <Link
              key={index}
              to={`/product/${product._id}`}
              className="border border-primary-400 rounded-lg text-primary-400 bg-white w-36 h-52 sm:w-48 sm:h-64 overflow-hidden hover:shadow-lg mx-auto my-3 relative"
            >
              <img
                src={`http://localhost:3005/uploads/${product.image}`}
                alt="Product"
                className="w-36 h-36 sm:w-48 sm:h-48 object-cover"
              />
              <p
                className={
                  "absolute top-0 bg-primary-400 text-white px-2 line-clamp-1"
                }
              >
                {searchMode === "category" && product.category}
                {searchMode === "location" && product.location}
              </p>
              <div className="py-2">
                <h3
                  className={`line-clamp-1 font-medium px-2 ${
                    searchMode === "title" && "bg-primary-400 text-white"
                  }`}
                >
                  {product.title}
                </h3>
                <p
                  className={`text-red-400 px-2 ${
                    searchMode === "price" &&
                    "bg-primary-400 text-white font-medium"
                  }`}
                >
                  GH&#8373; {Number(product.price).toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
