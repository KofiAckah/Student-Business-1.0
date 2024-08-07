import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import NoMessage from "../../assets/Email capture.gif";

// Components
import NavBar from "../../Components/NavBar";
import MessagesUsers from "../../Components/MessagesUsers";
import Conversation from "../../Components/Conversation";
import SendMessage from "../../Components/SendMessage";

export default function Message() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sendId, setSendId] = useState(null);
  const [userObject, setUserObject] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [isWide, setIsWide] = useState(window.innerWidth >= 768);

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

    const handleResize = () => {
      setIsWide(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [enqueueSnackbar]);

  return (
    <div className="md:bg-secondary-100">
      <NavBar />
      {isWide ? (
        // Desktop View
        <div className="md:grid md:grid-cols-3 md:m-10 lg:mx-20 xl:mx-32 2xl:mx-44 h-[33rem]">
          <div className="overflow-auto h-full bg-white border-r border-secondary-100">
            <h2 className="text-center text-xl font-bold pb-2 sticky top-0 bg-white border-b border-primary-300">
              My Messages
            </h2>
            {/* to={`/messages/${user.username}`} */}
            {users.map((user, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedUser(user.username);
                  setSendId(user._id);
                  setUserObject(user);
                }}
                className={`${
                  selectedUser === user.username
                    ? "bg-secondary-100"
                    : "bg-white"
                } cursor-pointer`}
              >
                <MessagesUsers
                  username={user.username}
                  image={user.profilePic}
                />
              </div>
            ))}
          </div>
          <div className="md:col-span-2 relative bg-white h-full overflow-auto max-md:hidden">
            {selectedUser ? (
              <div>
                <Conversation
                  selectedUser={sendId}
                  userObject={userObject}
                  className="h-[27rem]"
                />
                <div className="bg-white">
                  <SendMessage
                    receiverId={sendId}
                    className="bg-white p-2 flex items-center"
                  />
                </div>
              </div>
            ) : (
              <div className="flex-col items-center justify-center h-96">
                <img
                  src={NoMessage}
                  alt="No Message"
                  className="w-96 h-96 mx-auto"
                />
                <p className="text-center mt-10 text-lg">
                  Select a message to view chats
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Mobile View
        <div>
          <h2 className="text-center text-xl font-bold pb-2 sticky top-0 bg-white border-b border-primary-300">
            My Messages
          </h2>
          {users.map((user, index) => (
            <Link
              to={`/chat/${user._id}`}
              key={index}
              onClick={() => {
                setUserObject(user);
              }}
            >
              <MessagesUsers username={user.username} image={user.profilePic} />
            </Link>
          ))}
        </div>
      )}
      <div className="h-4"></div>
    </div>
  );
}
