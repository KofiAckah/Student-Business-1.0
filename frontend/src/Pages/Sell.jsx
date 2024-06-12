import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Logo, CompanyName } from "../Components/Default";
import { useSnackbar } from "notistack";
// import { Link } from "react-router-dom";

// Components
import NavBar from "../Components/NavBar";

export default function Sell() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSell = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);
    try {
      const res = await axios.post(
        "http://localhost:3005/account/post-product",
        formData,
        { withCredentials: true },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      enqueueSnackbar(res.data.msg, { variant: "success" });
      navigate("/");
    } catch (error) {
      console.log("ERROR: ", error.response.data.msg);
      enqueueSnackbar(error.response.data.msg, { variant: "error" });
    }
  };
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
          Sell Your Product{" "}
        </h2>
        <div className="flex flex-col justify-center items-center ">
          <form
            onSubmit={handleSell}
            className="flex flex-col items-center justify-center w-screen"
          >
            <div className="my-5 w-8/12 md:w-1/2 xl:w-1/3">
              <input
                className="loginInput"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
            <div className="my-5 w-8/12 md:w-1/2 xl:w-1/3">
              <input
                className="loginInput"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
            </div>
            <div className="my-5 w-8/12 md:w-1/2 xl:w-1/3">
              <input
                className="loginInput"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
            </div>
            <div className="my-5 w-8/12 md:w-1/2 xl:w-1/3 bg-green-500">
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
              />
            </div>
            <button className="btnSubmit">Sell</button>
          </form>
        </div>
      </div>
    </div>
  );
}
