import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useLocalStorage } from "../../miscellaneous/hooks";
import MyAlgoWallet from "../../MyAlgoWallet/MyAlgoWallet";

export default function Navbar() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage(
    "access",
    ""
  );
  const [refreshToken, setRefreshToken, removeRefreshToken] = useLocalStorage(
    "refresh",
    ""
  );

  const handleLogout = async (event: any) => {
    event.preventDefault();
    removeAccessToken("access");
    removeRefreshToken("refresh");
    navigate("/admin/login");
  };

  return (
    <header className="admin_header">
      <nav className="navbar fixed-top navbar-expand-lg">
        <Link className="navbar-brand" to="/">
          Donkey Dao{" "}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Going to Website
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
            </li>
            <li className="nav-item header_btn">
              <MyAlgoWallet className="nav-link" />
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={handleLogout}>
                <FaSignOutAlt title="Sign Out" size={28} />
              </a>
            </li>
          </ul>
          <ul className="header_social">
            <li>
              <a href="#">
                <i className="fab fa-discord"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
