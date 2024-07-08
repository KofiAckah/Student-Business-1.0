import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { extractTime } from "./extractTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Conversation({ selectedUser, userObject }) {
  const [messages, setMessages] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const id = selectedUser;
  // eslint-disable-next-line react/prop-types
  const image = userObject.profilePic;
  // eslint-disable-next-line react/prop-types
  const name = userObject.username;
  // eslint-disable-next-line react/prop-types
  // const linkId = userObject.id;
  // console.log(messages.receiverId);
  // eslint-disable-next-line react/prop-types

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:3005/message/${id}`, {
          withCredentials: true,
        });
        setMessages(res.data);
      } catch (error) {
        enqueueSnackbar(error.response.data.msg, { variant: "error" });
      }
    };
    fetchMessages();
  }, [id, enqueueSnackbar]);
  return (
    <div className="h-[27rem] bg-secondary-100 overflow-auto">
      <div className="flex">
        <div className="w-16 h-16 overflow-hidden mr-3 rounded-full border border-green-400">
          {image !== "" ? (
            <img
              src={`http://localhost:3005/uploads/${image}`}
              alt="User"
              className="w-full h-full object-cover"
            />
          ) : (
            <FontAwesomeIcon icon={faUser} className="w-16 h-16" />
          )}
        </div>
        <p>{name}</p>
      </div>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`w-full flex ${
            message.senderId !== id ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`${
              message.senderId === id
                ? "bg-red-500 text-white self-end"
                : "bg-green-500 text-white self-start"
            } p-2 m-2 rounded-lg w-[fit-content]`}
          >
            <p>{message.message}</p>
            <p>{extractTime(message.createdAt)}</p>
            <Link to={`/seller/${message.receiverId}`}>Press Here</Link>
            <pre>{message.receiverId}</pre>
          </div>
        </div>
      ))}
    </div>
  );
}
