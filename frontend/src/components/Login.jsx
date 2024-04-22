import { useContext, useState } from "react";
import { AuthContext } from "../context";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
    navigate("/");
  };
  return (
    <div className="wrapper">
      <h1>Hello Again!</h1>
      <p>Welcome back</p>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user"
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
