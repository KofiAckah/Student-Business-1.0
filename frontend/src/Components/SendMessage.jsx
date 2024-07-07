import { useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export default function SendMessage({ selectedUser }) {
  const [message, setMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const id = selectedUser;

  const sendMessage = async () => {
    try {
      await axios.post(
        `http://localhost:3005/message/send/${id}`,
        {
          to: id,
          message,
        },
        {
          withCredentials: true,
        }
      );
      setMessage("");
    } catch (error) {
      enqueueSnackbar(error.response.data.msg, { variant: "error" });
    }
  };
  return (
    <div className="bg-white p-2 flex items-center">
      <textarea
        type="text"
        className="flex-1 border border-black h-20 p-2 rounded-lg mr-2"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ resize: "none" }}
      />
      <button
        onClick={sendMessage}
        className="bg-primary-300 text-white p-2 rounded-xl"
      >
        Send
      </button>
    </div>
  );
}
