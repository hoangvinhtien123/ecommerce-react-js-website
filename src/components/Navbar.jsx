import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, setMode, logout } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path) => location.pathname === path;

  return (
    <header>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar-container">
          {/* Brand */}
          <Link to="/" className="navbar-brand">
            Shop<span>Hub</span>
          </Link>

          {/* Nav Links */}
          <div className="navbar-links">
            <Link
              to="/"
              className={`navbar-link${isActive("/") ? " navbar-link--active" : ""}`}
            >
              Home
            </Link>
            <Link
              to="/checkout"
              className={`navbar-link${isActive("/checkout") ? " navbar-link--active" : ""}`}
            >
              Cart
              {cartCount > 0 && (
                <span className="navbar-cart-badge">{cartCount}</span>
              )}
            </Link>
          </div>

          {/* Auth */}
          <div className="navbar-auth">
            {!user ? (
              <div className="navbar-auth-links">
                <Link
                  to="/auth"
                  onClick={() => setMode("login")}
                  className="btn btn-ghost-nav"
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  onClick={() => setMode("signup")}
                  className="btn btn-primary btn-nav"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="navbar-user">
                <div className="navbar-user-avatar">
                  {user.email.charAt(0).toUpperCase()}
                </div>
                <span className="navbar-greeting">{user.email}</span>
                <button className="btn btn-ghost-nav" onClick={() => logout()}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
