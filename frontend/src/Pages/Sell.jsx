import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Logo, CompanyName } from "../Components/Default";
import { useSnackbar } from "notistack";
// import { Link } from "react-router-dom";

// Components
import NavBar from "../Components/NavBar";

// category,
// categoryOthers,
// color,
// colorOthers,

export default function Sell() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [categoryOthers, setCategoryOthers] = useState("");
  const [color, setColor] = useState("");
  const [colorOthers, setColorOthers] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSell = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("categoryOthers", categoryOthers);
    formData.append("color", color);
    formData.append("colorOthers", colorOthers);
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
            <div className="my-5 w-8/12 md:w-1/2 xl:w-1/3">
              <select
                className="loginInput"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Category</option>
                <option value="Clothes">Clothes</option>
                <option value="Electronics">Electronics</option>
                <option value="Food">Food</option>
                <option value="Home Appliances">Home Appliances</option>
                <option value="Services">Services</option>
                <option value="Software">Software</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="my-5 w-8/12 md:w-1/2 xl:w-1/3">
              <input
                className="loginInput"
                type="text"
                value={categoryOthers}
                onChange={(e) => setCategoryOthers(e.target.value)}
                placeholder="Category Others"
              />
            </div>
            <div className="my-5 w-8/12 md:w-1/2 xl:w-1/3">
              <select
                className="loginInput"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="">Color</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Yellow">Yellow</option>
                <option value="Gray">Gray</option>
                <option value="Brown">Brown</option>
                <option value="Violet">Violet</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="my-5 w-8/12 md:w-1/2 xl:w-1/3">
              <input
                className="loginInput"
                type="text"
                value={colorOthers}
                onChange={(e) => setColorOthers(e.target.value)}
                placeholder="Color Others"
              />
            </div>
            <button className="btnSubmit">Sell</button>
          </form>
        </div>
      </div>
    </div>
  );
}
