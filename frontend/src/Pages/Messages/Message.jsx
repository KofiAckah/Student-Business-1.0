import axios from "axios";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
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
                selectedUser === user.username ? "bg-secondary-100" : "bg-white"
              }`}
            >
              <MessagesUsers username={user.username} image={user.profilePic} />
            </div>
          ))}
        </div>
        <div className="md:col-span-2 relative bg-white h-full overflow-auto">
          {selectedUser ? (
            <div>
              <Conversation selectedUser={sendId} userObject={userObject}/>
              <div className="bg-white">
                <SendMessage selectedUser={sendId} />
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
      <div className="h-20"></div>
    </div>
  );
}
