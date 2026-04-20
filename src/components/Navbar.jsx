import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, mode, setMode, logout } = useAuth();;

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
            {!user ? (
              <>
                <Link
                  to="/auth"
                  onClick={() => setMode("login")}
                  className="btn btn-secondary"
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  onClick={() => setMode("signup")}
                  className="btn btn-primary"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <p>User : {user.email}</p>
                <button className="btn btn-secondary" onClick={() => logout()}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
