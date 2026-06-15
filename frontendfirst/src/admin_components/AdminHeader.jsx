import React from "react";
import { useNavigate } from "react-router-dom";
import "../admin_styles/AdminHeader.css";

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <header className="admin-header">
      <div className="admin-topbar">
        <div className="admin-top-left">
          <img src="/assets/logo.png" alt="logo" className="admin-logo" />

          <div className="admin-school-meta">
            <div className="admin-school-name">
              KV Noida – Admin Dashboard
            </div>

            <div className="admin-school-sub">
              Website Control Panel • Manage Content
            </div>
          </div>
        </div>

        <div className="admin-top-right">
          <button className="admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
