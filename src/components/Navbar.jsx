import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { mode, setMode } = useContext(AuthContext);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            Shop Hub
          </Link>
          <div className="navbar-links">
            <Link to="/" className="navbar-link">
              Home
            </Link>
            <Link to="/checkout" className="navbar-link">
              Cart
            </Link>
          </div>
          <div className="navbar-auth">
            <Link to="/auth" onClick={() => setMode("login")} className="btn btn-secondary">
              Login
            </Link>
            <Link to="/auth" onClick={() => setMode("signup")}  className="btn btn-primary">
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
