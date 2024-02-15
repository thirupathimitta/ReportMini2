import React from "react";
import { Link } from "react-router-dom";

interface Iprops {
  heading?: String;
  color: string;
}
const NavBar: React.FC<Iprops> = (props) => {
  return (
    <nav className={`navbar navbar-expand-sm ${props.color}`}>
      <div className="container">
        <Link className="navbar-brand " to="/">
          <p className="h4" style={{ color: "white" }}>
            <i className="bi bi-folder-fill me-1"></i>
            MINI <span className="text-warning">Project-02</span>
          </p>
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item me-4">
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Home
              </Link>
            </li>
            <li className="nav-item me-4">
              <Link
                to="/viewplan"
                style={{ textDecoration: "none", color: "white" }}
              >
                View-Plans
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
