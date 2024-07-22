import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMessage,
  faCheck,
  faUser,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

// Components
import NavBar from "../Components/NavBar";
import SendMessage from "../Components/SendMessage";
import { formatCreationTime } from "../Components/extractTime";

export default function ShowProduct() {
  const [product, setProduct] = useState({});
  const [postComment, setPostComment] = useState([]);
  const [comments, setComments] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [showMessage, setShowMessage] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3005/account/get-product/${id}`,
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

  const handlePostComment = async () => {
    if (postComment === "") {
      enqueueSnackbar("Comment can't be empty", { variant: "error" });
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:3005/user/create-comment/${id}`,
        { comment: postComment },
        { withCredentials: true }
      );
      enqueueSnackbar(res.data.msg, { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.response.data.msg, { variant: "error" });
    }
  };

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
              <FontAwesomeIcon icon={faUser} className="mr-1 text-red-400" />
              {product.postedBy}
            </p>
            <p>
              Category:{" "}
              <Link className="text-red-400 font-bold">{product.category}</Link>
            </p>
            <p className="text-primary-400 font-bold whitespace-pre-wrap">
              Description:
            </p>
            <p>{product.description === "" ? "..." : product.description}</p>
          </div>
          <div>
            <button
              className="bg-red-400 text-white font-semibold py-2 px-4 rounded-lg mt-4 mx-auto w-full hover:bg-white border border-red-400 hover:text-red-400"
              onClick={() => setShowMessage(!showMessage)}
            >
              <FontAwesomeIcon icon={faMessage} className="mr-3" />
              {showMessage ? "Hide Message Form" : "Send A Message"}
            </button>
            {showMessage && (
              <SendMessage
                receiverId={product.userId}
                className="flex justify-between mt-4"
                productId={product.id}
                productImage={product.image}
              />
            )}
            <Link to={`/seller/${product.id}`}>
              <button className="bg-red-400 text-white font-semibold py-2 px-4 rounded-lg mt-4 mx-auto w-full hover:bg-white border border-red-400 hover:text-red-400">
                <FontAwesomeIcon icon={faUser} className="mr-3" /> View Seller
                Profile
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="md:grid grid-cols-3 items-center">
        <div className="bg-secondary-100 p-2 rounded-lg self-stretch mt-4 mb-2 max-md:w-72 md:mx-4 mx-auto md:h-60 md:order-2">
          <h1 className="font-semibold text-center text-lg">Safety tips</h1>
          <p>
            <FontAwesomeIcon icon={faCheck} className="mr-2 text-green-400" />
            Avoid paying in advance
          </p>
          <p>
            <FontAwesomeIcon icon={faCheck} className="mr-2 text-green-400" />
            Meet with the seller at a safe public place
          </p>
          <p>
            <FontAwesomeIcon icon={faCheck} className="mr-2 text-green-400" />
            Inspect the item and ensure it&apos;s exactly what you want
          </p>
          <p>
            <FontAwesomeIcon icon={faCheck} className="mr-2 text-green-400" />
            Only pay if you&apos;re satisfied
          </p>
        </div>
        <div className="mt-2 sm:mt-4 w-10/12  mx-auto col-span-2 overflow-hidden">
          <h1 className="font-semibold text-center text-lg">Comments</h1>
          {comments.length === 0 ? (
            <div>
              <p className="text-center">No comments yet</p>
              <p className="text-center">Be the first to comment</p>
            </div>
          ) : (
            comments.map((comment) => (
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
            ))
          )}
          <div className="bg-secondary-100 p-2 rounded-lg self-stretch mt-4 mb-2 flex items-center">
            <textarea
              className="loginInput h-20"
              type="text"
              id="description"
              value={postComment}
              onChange={(e) => setPostComment(e.target.value)}
              placeholder="Add a comment"
              style={{ resize: "none" }}
            />
            <button
              onClick={handlePostComment}
              className="mx-2 p-2 bg-red-400 text-white border-red-400 border hover:bg-white hover:text-red-400 rounded-lg"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
