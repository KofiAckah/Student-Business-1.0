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
  const [displayFilter, setDisplayFilter] = useState(false);
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

  // search-by-location
  const handleSearchByLocation = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3005/user/search-by-location?query=${query}`,
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
      case "location":
        handleSearchByLocation();
        break;
      default:
        handleAllSearch();
    }
  };

  const handleClear = () => {
    setProducts([]);
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
              className="loginInput"
              onChange={(e) => setQuery(e.target.value)}
            />
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
              className="bg-primary-100 text-white p-2 rounded-md mr-4 w-20"
              onClick={handleFilter}
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
                className="w-[50%] sm:w-[8rem] mx-auto"
                // value={category}
                // onChange={handleCategoryChange}
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
              <label htmlFor="condition" className="mx-auto text-white mb-1">
                Condition
              </label>
              <select
                className="w-[50%] sm:w-[8rem] mx-auto"
                // value={condition}
                // onChange={(e) => setCondition(e.target.value)}
              >
                <option value="">Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
              <button className="searchFilterBtn">Price</button>
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
