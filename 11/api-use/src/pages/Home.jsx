import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome, {user?.email || "Guest"}!</h1>
      <button onClick={logout}>Logout</button>
      <button onClick={() => navigate("/search")}>Search Countries</button>
    </div>
  );
};

export default Home;
