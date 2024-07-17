// Mobile View chating messages
import axios from "axios";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import Message from "./Message";

// Components
import SendMessage from "../../Components/SendMessage";
import Conversation from "../../Components/Conversation";

export default function Chat() {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [userObject, setUserObject] = useState({});
  const [isWide, setIsWide] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3005/message/chatted-users`,
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
    const foundUser = users.find((user) => user._id === id);
    if (foundUser) {
      setUserObject(foundUser);
    }
    const handleResize = () => {
      setIsWide(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [enqueueSnackbar, id, users]);
  return (
    <div>
      {isWide ? (
        <Message />
      ) : (
        <div>
          <Conversation
            selectedUser={id}
            userObject={userObject}
            className="h-[86vh]"
          />
          <div className="bg-white">
            <SendMessage
              receiverId={id}
              className="bg-white p-2 flex items-center sticky bottom-0 w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
