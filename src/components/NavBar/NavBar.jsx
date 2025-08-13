import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ user, handleSignOut }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🍽 Bite Finder
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/restaurant">
                    Restaurants
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link text-warning fw-semibold">
                    Hi, {user.username}
                  </span>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-gradient ms-2" to="/restaurant/new">
                    + New
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-up">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-in">
                    Sign In
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
