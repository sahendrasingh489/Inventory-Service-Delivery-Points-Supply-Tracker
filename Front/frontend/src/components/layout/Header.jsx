// src/components/layout/Header.jsx
import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav 
      className="navbar bg-white shadow-sm px-4 py-3 d-flex justify-content-between"
      style={{ marginLeft: '260px' }}
    >

      {/* Left Title */}
      <h5 className="fw-bold m-0"></h5>

      {/* Right Section */}
      <div className="d-flex align-items-center gap-4">

        {/* Notification */}
        <div className="position-relative" style={{ cursor: "pointer" }}>
          🔔
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-8px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              fontSize: "10px",
              padding: "2px 6px"
            }}
          >
            3
          </span>
        </div>

        {/* User Dropdown */}
        <div className="dropdown">

          <div
            className="d-flex align-items-center gap-2"
            data-bs-toggle="dropdown"
            style={{ cursor: "pointer" }}
          >

            {/* Avatar */}
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold"
              }}
            >
              A
            </div>

            {/* Name */}
            <div>
              <div className="fw-semibold">Admin User</div>
              <small className="text-muted">Admin</small>
            </div>

          </div>

          {/* Dropdown Menu */}
          <ul className="dropdown-menu dropdown-menu-end shadow border-0 p-2">

            <li>
              <button className="dropdown-item rounded">👤 Profile</button>
            </li>

            <li>
              

                        <Link to="/settings" className="dropdown-item rounded">⚙ Settings</Link>
            </li>

            <li><hr className="dropdown-divider" /></li>

            <li>
              <a href="/login" className="dropdown-item text-danger rounded">
                🚪 Logout
              </a>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
};

export default Header;