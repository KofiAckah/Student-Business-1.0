import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import NavBar from "../../Components/NavBar";

export default function EditProduct() {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

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
        enqueueSnackbar(error.response.data.msg, { variant: "error" });
      }
    };
    fetchProduct();
  }, [enqueueSnackbar, id]);

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3005/user/edit-product/${id}`,
        product,
        {
          withCredentials: true,
        }
      );
      enqueueSnackbar(res.data.msg, { variant: "success" });
      navigate("/profile");
    } catch (error) {
      enqueueSnackbar(error.response.data.msg, { variant: "error" });
    }
  };
  return (
    <div>
      <div className="bg-secondary-100">
        <NavBar />
        <div className="w-full py-10">
          <div className="md:grid grid-cols-3 xl:grid-cols-4 mx-4 sm:mx-10 gap-10">
            <div className="p-3 md:h-[33rem] px-5 bg-white rounded-2xl mb-5">
              <div className="flex flex-col items-center rounded-full overflow-hidden border-2 border-red-400 w-32 h-32 md:w-40 md:h-40 mx-auto bg-secondary-100">
                {product.image !== "" ? (
                  <img
                    src={`http://localhost:3005/uploads/${product.image}`}
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
              <div className="text-center mt-5">
                <h1 className="text-2xl font-semibold text-gray-800">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-sm text-gray-500">{product.price}</p>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>
            </div>
            <div className="col-span-2 xl:col-span-3 bg-white rounded-2xl p-5">
              <form onSubmit={handleEditProduct}>
                <div className="mb-5">
                  <label htmlFor="name" className="text-sm text-gray-500">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={(e) =>
                      setProduct({ ...product, name: e.target.value })
                    }
                    className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-red-400"
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="category" className="text-sm text-gray-500">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={product.category}
                    onChange={(e) =>
                      setProduct({ ...product, category: e.target.value })
                    }
                    className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-red-400"
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="price" className="text-sm text-gray-500">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                    className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-red-400"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="description"
                    className="text-sm text-gray-500"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={(e) =>
                      setProduct({ ...product, description: e.target.value })
                    }
                    className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-red-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-400 text-white p-3 rounded hover:bg-primary-500"
                >
                  Edit Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
