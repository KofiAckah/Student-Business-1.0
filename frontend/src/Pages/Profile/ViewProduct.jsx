import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";

// Components
import NavBar from "../../Components/NavBar";
import { formatCreationTime } from "../../Components/extractTime";

export default function ViewProduct() {
  const [product, setProduct] = useState("");
  const [comments, setComments] = useState([]);
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

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3005/user/get-comments/${id}`,
          {
            withCredentials: true,
          }
        );
        setComments(res.data);
      } catch (error) {
        enqueueSnackbar(error.response.data.msg, { variant: "error" });
      }
    };
    fetchComments();
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
      <div className="mb-10">
        <h2
          className={`text-center ${
            comments.length === 0 ? "mt-2" : "my-2 font-medium"
          }`}
        >
          {comments.length === 0
            ? "No Comment for this product"
            : "Comments Here"}
        </h2>
        {comments.map((comment) => (
          <div key={comment._id} className="flex p-2 mt-2">
            <div>
              <img
                src={`http://localhost:3005/uploads/${comment.userId.image}`}
                alt={`${comment.userId.username} Picture`}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="ml-4 w-10/12 relative">
              <p className="text-primary-400 font-bold w-full">
                {comment.userId.username}
              </p>
              <p>{comment.comment}</p>
              <p className="absolute text-sm text-gray-400 right-0">
                <span>
                  <FontAwesomeIcon icon={faClock} className="mr-1" />
                  {formatCreationTime(comment.createdAt)}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
