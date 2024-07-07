import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
export default function MessagesUsers({ username, image }) {
  return (
    <div className={`flex items-center border-b border-red-400 p-2`}>
      <div className="overflow-hidden w-16 h-16 mr-3 rounded-full border border-green-400">
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
      <p className="font-semibold">{username}</p>
    </div>
  );
}
