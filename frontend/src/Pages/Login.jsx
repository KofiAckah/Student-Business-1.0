import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Logo, CompanyName } from "../Components/Default";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3005/account/login", {
        email,
        password,
      });
      setMessage(res.data.msg);
      alert("Login Successful");
      navigate("/");
    } catch (error) {
      setMessage(error.response.data.msg);
      alert("Login Failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <h1 className="text-lg md:text-xl">{CompanyName}</h1>
        <img src={Logo} alt="Logo" className="w-10 md:w-16" />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="loginInput"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </div>
        <div>
          <input
            className="loginInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

//   import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//   import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// <FontAwesomeIcon icon={faTimes} />
// <FontAwesomeIcon icon={faUser} />
