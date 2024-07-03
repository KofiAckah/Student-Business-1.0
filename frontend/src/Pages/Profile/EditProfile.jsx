import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import NavBar from "../../Components/NavBar";

export default function EditProfile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3005/user/get-profile", {
          withCredentials: true,
        });
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setBio(res.data.bio);
        setDob(res.data.dob);
        setImage(res.data.image);
        setImagePreview(`http://localhost:3005/uploads/${res.data.image}`);
      } catch (error) {
        enqueueSnackbar(error.response.data.msg, { variant: "error" });
      }
    };
    fetchProfile();
  }, [enqueueSnackbar]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImagePreview(fileReader.result);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("bio", bio);
    formData.append("dob", dob);
    formData.append("image", image);

    try {
      await axios.put("http://localhost:3005/user/update-profile", formData, {
        withCredentials: true,
      });
      enqueueSnackbar("Profile updated successfully", { variant: "success" });
      navigate("/profile");
    } catch (error) {
      enqueueSnackbar(error.response.data.msg, { variant: "error" });
    }
  };

  return (
    <div className="bg-secondary-100">
      <NavBar />
      <h1 className="text-2xl md:text-3xl font-bold text-center my-4 sm:my-10">
        Personal Details
      </h1>
      <form
        onSubmit={handleEditProfile}
        className="flex flex-col items-center justify-center w-10/12 md:w-2/3 xl:w-1/2 mx-auto bg-white rounded-2xl shadow-2xl"
      >
        <div className="flex flex-col items-center rounded-full overflow-hidden border-2 border-red-400 w-32 h-32 md:w-40 md:h-40 mx-auto bg-secondary-100 mt-5">
          {image !== "" ? (
            <img
              src={imagePreview}
              alt="profile"
              className="w-32 h-32 md:w-52 md:h-52 object-contain"
            />
          ) : (
            <FontAwesomeIcon
              icon={faUser}
              className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
            />
          )}
        </div>
        <label htmlFor="image" className="custom-file-upload mt-2">
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
        <div className="my-2 sm:my-3 mt-5 sm:mt-7 w-10/12 md:w-2/3 xl:w-1/2">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="loginInput"
          />
        </div>
        <div className="my-2 sm:my-3 w-10/12 md:w-2/3 xl:w-1/2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="loginInput"
          />
        </div>
        <div className="my-2 sm:my-3 w-10/12 md:w-2/3 xl:w-1/2">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="number"
            name="phone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className="loginInput"
          />
        </div>
        <div className="my-2 sm:my-3 w-10/12 md:w-2/3 xl:w-1/2">
          <label htmlFor="bio">Bio</label>
          <textarea
            type="text"
            name="bio"
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
            className="loginInput h-20 sm:h-32"
            style={{ resize: "none" }}
          />
        </div>
        <div className="my-2 sm:my-3 w-10/12 md:w-2/3 xl:w-1/2">
          <label htmlFor="dob">Date of Birth</label>
          <p>{new Date(dob).toLocaleDateString()}</p>
          <input
            type="date"
            name="dob"
            id="dob"
            value={dob}
            // value={new Date(dob).toLocaleDateString()}
            onChange={(e) => setDob(e.target.value)}
            placeholder="Date of Birth"
            className="loginInput"
          />
        </div>
        <button className="btnSubmit w-10/12 md:w-2/3 xl:w-1/2 my-2 sm:my-3 mb-5 sm:mb-7">
          Update
        </button>
      </form>
      <div className="h-20"></div>
    </div>
  );
}
