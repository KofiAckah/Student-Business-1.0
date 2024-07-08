import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { dateOnly, timeOnly } from "./extractTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";

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

  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  let lastDisplayedDate = "";

  return (
    <div className="h-[27rem] bg-secondary-100 overflow-auto">
      <div className="flex sticky top-0 bg-white p-2 items-center">
        <div className="w-12 h-12 overflow-hidden mx-3 rounded-full border border-green-400">
          {image !== "" ? (
            <img
              src={`http://localhost:3005/uploads/${image}`}
              alt="User"
              className="w-full h-full object-cover"
            />
          ) : (
            <FontAwesomeIcon icon={faUser} className="w-12 h-12" />
          )}
        </div>
        <p>{name}</p>
      </div>
      <div className="text-center border border-black mx-32 my-2 rounded-3xl text-red-600">
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <p>Do not pay in advance, including for delivery</p>
      </div>
      {messages.map((message, index) => {
        const messageDate = dateOnly(message.createdAt);
        const displayDate = messageDate !== lastDisplayedDate;
        lastDisplayedDate = messageDate;
        return (
          <div key={index} ref={lastMessageRef}>
            {displayDate && <p className="text-center">{messageDate}</p>}
            <div
              className={`w-full flex ${
                message.senderId !== id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  message.senderId === id
                    ? "bg-white self-end mr-20"
                    : "bg-[#d9fec2] self-start ml-20"
                } p-2 m-2 rounded-lg w-[fit-content] text-primary-400`}
              >
                <p className={``}>{message.message}</p>
                <p
                  className={`${
                    message.senderId === id ? "text-left" : "text-right"
                  } text-secondary-200 text-xs`}
                >
                  {timeOnly(message.createdAt)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
