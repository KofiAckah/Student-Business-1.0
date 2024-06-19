import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import NavBar from "../Components/NavBar";

export default function Profile() {
  const [user, setUser] = useState({});
  const { enqueueSnackbar } = useSnackbar();

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
  return (
    <div className="">
      <NavBar />
      <div className="w-full py-10">
        <div className="grid grid-cols-3 mx-10 gap-10">
          <div className="card w-full h-full p-3 px-5">
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
            <p className="text-lg font-medium mt-2">{user.username}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500">{user.bio}</p>
            <p className="text-sm text-gray-500">{user.phone}</p>
          </div>
          <div className="col-span-2 h-96 bg-red-400"></div>
        </div>
      </div>
    </div>
  );
}
