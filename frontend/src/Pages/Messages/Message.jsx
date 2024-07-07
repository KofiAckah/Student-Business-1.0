import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

// Components
import NavBar from "../../Components/NavBar";
import MessagesUsers from "../../Components/MessagesUsers";
import Conversation from "../../Components/Conversation";

export default function Message() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3005/message/chatted-users",
          {
            withCredentials: true,
          }
        );
        setUsers(res.data);
      } catch (error) {
        enqueueSnackbar(error.response.data.msg, { variant: "error" });
      }
    };
    fetchUsers();
  }, [enqueueSnackbar]);

  return (
    <div className="bg-secondary-100">
      <NavBar />
      <div className="md:grid md:grid-cols-3 md:m-10 lg:mx-20 xl:mx-32 2xl:mx-44 h-[33rem]">
        <div className="overflow-auto h-full bg-white">
          <h2 className="text-center text-xl font-bold pb-2 sticky top-0 bg-white border-b border-primary-300">
            My Messages
          </h2>
          {/* to={`/messages/${user.username}`} */}
          {users.map((user, index) => (
            <div
              key={index}
              onClick={() => setSelectedUser(user.username)}
              className={`${
                selectedUser === user.username ? "bg-secondary-100" : "bg-white"
              }`}
            >
              <MessagesUsers username={user.username} image={user.profilePic} />
            </div>
          ))}
        </div>
        <div className="md:col-span-2 bg-red-600">
          <Conversation />
        </div>
      </div>
      <div className="h-20"></div>
    </div>
  );
}
