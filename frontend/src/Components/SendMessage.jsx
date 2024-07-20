import { useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export default function SendMessage({
  // eslint-disable-next-line react/prop-types
  receiverId,
  // eslint-disable-next-line react/prop-types
  className,
  // eslint-disable-next-line react/prop-types
  productId,
  // eslint-disable-next-line react/prop-types
  productImage,
}) {
  const [message, setMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const id = receiverId;

  const sendMessage = async () => {
    if (message === "") {
      enqueueSnackbar("Please fill the form", { variant: "error" });
      return;
    }
    try {
      await axios.post(
        `http://localhost:3005/message/send/${id}`,
        {
          to: id,
          message,
          image: productImage,
          link: productId,
        },
        {
          withCredentials: true,
        }
      );
      setMessage("");
      enqueueSnackbar("Message sent", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.response.data.msg, { variant: "error" });
    }
  };

  return (
    <div className={`${className}`}>
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
