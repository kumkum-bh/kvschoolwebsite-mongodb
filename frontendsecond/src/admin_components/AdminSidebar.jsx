import React from "react";
import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Manage Main Site popup", path: "/admin/mainsitepopup" },
    { name: "Manage HeaderSecond", path: "/admin/manage-headersecond" },
    { name: "Registrations", path: "/admin/registrations" },
    { name: "All Classes Fee Structure", path: "/admin/classes"},
    { name: "Manage Teachers", path: "/admin/manage-teachers" },
    { name: "Manage Notices", path: "/admin/notices" },
    { name: "Manage Gallery", path: "/admin/gallery" },
    { name: "Manage Admission", path: "/admin/admission" },
    { name: "Manage Registrar Form", path: "/admin/registrar-form" },
    { name: "Manage Academics", path: "/admin/academics" },
    { name: "Manage Extra Curricular", path: "/admin/extracurricular" },
    { name: "Manage HomeSecond", path: "/admin/homesecond" },
    { name: "Manage Activity Table", path: "/admin/activitiestable" },
    { name: "Manage Mandatory Disclosure", path: "/admin/mandatory-disclosure" },
    { name: "Manage Contact", path: "/admin/contact" },
    // { name: "Manage Fee Structure", path: "/admin/manage-fees" },
  ];

  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>

      <ul className="sidebar-menu">
        {menu.map((item, i) => (
          <li key={i}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
