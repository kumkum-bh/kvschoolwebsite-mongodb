import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "../admin_styles/Admin.css";
import AdminHeaderSecond from "./AdminHeaderSecond";

export default function AdminLayout() {
  return (
    <>
    {/* Header */}
    <AdminHeaderSecond />
    <div className="admin-container">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Right Side Page Content */}
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
    </>
  );
}

