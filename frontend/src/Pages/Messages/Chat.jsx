// Mobile View chating messages
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { Link, useParams } from "react-router-dom";

// Components
import SendMessage from "../../Components/SendMessage";
import Conversation from "../../Components/Conversation";

export default function Chat() {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  return (
    <div>
      <p>Hello World</p>
      <p>Bad</p>
      <p>Name: {id.username}</p>
      <div className="bg-white">
        <SendMessage
          receiverId={id}
          className="bg-white p-2 flex items-center"
        />
      </div>
    </div>
  );
}

// <Conversation selectedUser={sendId} userObject={userObject} />
