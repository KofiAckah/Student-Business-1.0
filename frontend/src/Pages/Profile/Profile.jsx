import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

// Components
import NavBar from "../../Components/NavBar";
import NoProductImage from "../../assets/No data.gif";

export default function Profile() {
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

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
  }, [enqueueSnackbar, navigate]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3005/user/delete-product/${currentProductId}`,
        {
          withCredentials: true,
        }
      );
      enqueueSnackbar(`Product deleted successfully.`, {
        variant: "success",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      setIsModalOpen(false);
    } catch (error) {
      enqueueSnackbar("Failed to delete the product", { variant: "error" });
    }
  };

  return (
    <div className="bg-secondary-100">
      <NavBar />
      <div className="w-full py-10">
        <div className="md:grid grid-cols-3 xl:grid-cols-4 mx-4 sm:mx-10 gap-10">
          <div className="p-3 md:h-[33rem] px-5 bg-white rounded-2xl mb-5">
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
            <div className="max-md:flex justify-between max-sm:block">
              <p className="text-sm max-sm:text-center text-gray-500 my-1">
                {user.email}
              </p>
              <p className="text-sm max-sm:text-center text-gray-500 my-1">
                0{user.phone}
              </p>
            </div>
            <p className="text-sm text-primary-400 my-1">Bio</p>
            <p className="text-sm text-gray-500 my-1">
              {user.bio !== "" ? user.bio : ""}
            </p>
          </div>
          {/*  */}
          <div className="col-span-2 xl:col-span-3 bg-white rounded-2xl max-md:pb-5">
            <p className="text-xl md:text-3xl text-center font-medium m-2">
              My Products
            </p>
            <div className="flex flex-wrap gap-2 my-4 mx-5">
              {products.length === 0 && (
                <div>
                  <p className="text-center">No Product yet</p>
                  <img src={NoProductImage} alt="No Product" />
                </div>
              )}
              {products.map((product, index) => (
                <div
                  key={index}
                  className="h-56 p-3 border border-primary-500 rounded-lg md:w-96 mx-auto"
                >
                  <div className="flex gap-5 ">
                    <div className="h-40 w-40 overflow-hidden rounded-md">
                      <img
                        src={`http://localhost:3005/uploads/${product.image}`}
                        alt="Product"
                        className="h-40 w-40 object-cover object-center"
                      />
                    </div>
                    <div className="">
                      <h3 className="line-clamp-1 font-semibold">
                        {product.title}
                      </h3>
                      <p className="font-semibold">
                        GH&#8373; {Number(product.price).toFixed(2)}
                      </p>
                      <p className="text-gray-500 text-sm">
                        <span className="font-semibold text-orange-600">
                          Created:{" "}
                        </span>
                        {new Date(product.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-gray-500 text-sm">
                        <span className="font-semibold text-orange-600">
                          Updated:{" "}
                        </span>
                        {new Date(product.updatedAt).toLocaleDateString()}
                      </p>
                      <Link to={`/view-items/${product._id}`}>
                        <button className="bg-primary-500 p-2 text-white rounded-md hover:bg-primary-400 sm:mt-2 max-sm:text-sm">
                          View Product
                        </button>
                      </Link>
                    </div>
                  </div>
                  <hr className="my-2 border-primary-500" />
                  <div className="flex justify-between">
                    <Link
                      to={`/edit-items/${product._id}`}
                      className="text-green-400"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        setCurrentProductId(product._id);
                        setIsModalOpen(true);
                      }}
                      className="text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-4 rounded">
                    <p>Are you sure you want to delete this item?</p>
                    <div className="flex justify-between">
                      <button onClick={handleDelete} className="text-red-500">
                        Yes, Delete
                      </button>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-blue-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
