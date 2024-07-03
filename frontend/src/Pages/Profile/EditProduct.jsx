import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../../Components/NavBar";

export default function EditProduct() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [categoryOthers, setCategoryOthers] = useState("");
  const [condition, setCondition] = useState("");
  const [negotiable, setNegotiable] = useState("");
  // const [imageName, setImageName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [categoryInfo, setCategoryInfo] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3005/user/view-product/${id}`,
          { withCredentials: true }
        );
        setTitle(res.data.title);
        setLocation(res.data.location);
        setDescription(res.data.description);
        setPrice(res.data.price);
        setCategory(res.data.category);
        setCategoryOthers(res.data.categoryOthers);
        setCondition(res.data.condition);
        setNegotiable(res.data.negotiable);
        setImage(res.data.image);
        setImagePreview(`http://localhost:3005/uploads/${res.data.image}`);
      } catch (error) {
        console.log("ERROR: ", error.response.data.msg);
        enqueueSnackbar(error.response.data.msg, { variant: "error" });
      }
    };
    getProduct();
  }, [id, enqueueSnackbar]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    // Set category info
    switch (e.target.value) {
      case "Clothes":
        setCategoryInfo(
          "Clothes: Fashionable items for all ages. Include shoes, bags, dress,and accessories."
        );
        break;
      case "Electronics":
        setCategoryInfo(
          "Electronics: Latest gadgets and devices. Include smartphones, laptops, cameras, and accessories."
        );
        break;
      case "Food":
        setCategoryInfo(
          "Food: Fresh and delicious food. Include snacks, drinks, and meals."
        );
        break;
      case "Home Appliances":
        setCategoryInfo(
          "Home Appliances: Useful items for your home. Include furniture, kitchenware, and appliances."
        );
        break;
      case "Services":
        setCategoryInfo(
          "Services: Offer your skills and expertise. Include tutoring, repair, and consultation."
        );
        break;
      case "Software":
        setCategoryInfo(
          "Software: Digital products and services. Include apps, games, anti-virus,and subscriptions."
        );
        break;
      case "Student Needs":
        setCategoryInfo(
          "Student Needs: Items for students. Include books, stationery, and gadgets."
        );
        break;
      case "Others":
        setCategoryInfo(
          "Others: Items you think are not in the category. Unique items and services."
        );
        break;
      default:
        setCategoryInfo("");
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImagePreview(fileReader.result);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("categoryOthers", categoryOthers);
    formData.append("condition", condition);
    formData.append("negotiable", negotiable);
    formData.append("image", image);

    try {
      const res = await axios.put(
        `http://localhost:3005/user/edit-product/${id}`,
        formData,
        console.log("formData 1: ", formData),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        console.log("formData 2: ", formData)
      );
      console.log("formData 3: ", formData);
      enqueueSnackbar(res.data.msg, { variant: "success" });
      navigate("/profile");
      console.log("formData 4: ", formData);
    } catch (error) {
      console.log("ERROR: ", error.response.data.msg);
      enqueueSnackbar(error.response.data.msg, { variant: "error" });
    }
  };

  return (
    <div className="bg-secondary-100">
      <NavBar />
      <h2 className="text-2xl md:text-3xl font-bold text-center my-4 sm:my-10">
        Edit your product
      </h2>
      <form
        onSubmit={handleEditProduct}
        className="flex flex-col items-center justify-center w-10/12 md:w-2/3 xl:w-1/2 mx-auto bg-white rounded-2xl shadow-2xl"
      >
        <div className="my-2 sm:my-3 mt-5 sm:mt-7 w-10/12 md:w-2/3 xl:w-1/2">
          <label htmlFor="title">Title</label>
          <input
            className="loginInput"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What are you selling?"
          />
        </div>
        <div className="my-2 sm:my-3 w-10/12 md:w-2/3 xl:w-1/2">
          <label htmlFor="location">Location</label>
          <input
            className="loginInput"
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Where is your product or service located?"
          />
        </div>
        <div className="my-2 sm:my-3 w-10/12 md:w-2/3 xl:w-1/2">
          <label htmlFor="description">Description</label>
          <textarea
            className="loginInput h-20 sm:h-32"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description your product or service"
            style={{ resize: "none" }}
          />
          <p className="text-sm italic text-gray-600">
            <FontAwesomeIcon icon={faCircleInfo} beat />
            Descripted the product for buyers to get more info about.
          </p>
        </div>
        <div className="my-2 sm:my-3 w-10/12 md:w-2/3 xl:w-1/2">
          <label htmlFor="price">Price</label>
          <input
            className="loginInput"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price for product or service"
          />
          <p className="text-sm italic text-gray-600">
            <FontAwesomeIcon icon={faCircleInfo} beat />
            Currency is in Cedis (GHS).
          </p>
        </div>
        <div className="my-2 sm:my-3 w-10/12 md:w-2/3 xl:w-1/2 flex items-center justify-between overflow-hidden">
          <label htmlFor="image" className="custom-file-upload">
            Change Image
          </label>
          <input
            style={{ display: "none" }}
            className="loginInput"
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 sm:w-40 sm:h-40 object-cover bg-gray-400 rounded-lg ml-2"
            />
          )}
        </div>
        <div className="my-2 sm:my-3 w-10/12 md:w-2/3 xl:w-1/2">
          <label htmlFor="category">Category</label>
          <select
            className="loginInput"
            value={category}
            onChange={handleCategoryChange}
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
          {categoryInfo && (
            <p className="text-sm italic text-gray-600">
              <FontAwesomeIcon icon={faCircleInfo} beat /> {categoryInfo}
            </p>
          )}
        </div>
        {category === "Others" ? (
          <div className="my-2 sm:my-3 w-10/12 md:w-2/3 xl:w-1/2">
            <label htmlFor="categoryOthers">Category Others</label>
            <input
              className="loginInput"
              type="text"
              id="categoryOthers"
              value={categoryOthers}
              onChange={(e) => setCategoryOthers(e.target.value)}
              placeholder="Specify your category"
              required
            />
          </div>
        ) : null}

        {category === "Clothes" ||
        category === "Electronics" ||
        category === "Home Appliances" ||
        category === "Others" ? (
          <div className="my-2 sm:my-3 w-10/12 md:w-2/3 xl:w-1/2">
            <label htmlFor="condition">Condition</label>
            <select
              className="loginInput"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option value="">Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>
        ) : null}
        <div className="my-2 sm:my-3 mx-auto">
          <label className="">Are you open to negotiation?</label>
          <br />
          <div className="flex w-full justify-between mx-auto">
            <div>
              <label htmlFor="Yes" className="mr-2">
                Yes
              </label>
              <input
                type="radio"
                id="Yes"
                name="negotiable"
                checked={negotiable}
                onChange={(e) => setNegotiable(e.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="No" className="mr-2">
                No
              </label>
              <input
                type="radio"
                id="No"
                name="negotiable"
                checked={!negotiable}
                onChange={(e) => setNegotiable(!e.target.checked)}
              />
            </div>
          </div>
        </div>
        <button className="btnSubmit w-10/12 md:w-2/3 xl:w-1/2 my-2 sm:my-3 mb-5 sm:mb-7">
          Save Changes
        </button>
      </form>
      <div className="h-20"></div>
    </div>
  );
}
