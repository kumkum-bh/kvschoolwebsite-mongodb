import React from "react";
import { useNavigate } from "react-router-dom";
import "../admin_styles/AdminHeaderSecond.css";

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <header className="admin-header">
      <div className="admin-header-video-wrap">

        {/* BACKGROUND VIDEO */}
        <video className="admin-bg-video" autoPlay muted loop playsInline>
          <source src="http://localhost:5000/assets/header.mp4" type="video/mp4" />
        </video>

        {/* OVERLAY */}
        <div className="admin-header-overlay">
          <div className="admin-header-inner">

            {/* LEFT: Logo */}
            <div className="admin-logo">
              <img src="http://localhost:5000/assets/logo1.jpg" alt="admin logo" />
            </div>

            {/* TEXT CONTENT */}
            <div className="admin-header-text">
              <h1>Admin Dashboard</h1>
              <p>Website Control Panel • Manage website content, update sections, and control everything easily.</p>
            </div>

            {/* RIGHT: Logout Button */}
            <button className="admin-logout-btn" onClick={handleLogout}>
              Logout
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
