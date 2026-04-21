import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="page">
      <div className="container">
        <div className="error-page">
          <p className="error-page-code">404</p>
          <h1 className="error-page-title">Page Not Found</h1>
          <p className="error-page-message">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn btn-primary btn-large">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}