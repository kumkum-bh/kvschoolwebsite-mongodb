import React, { useEffect, useState } from "react";
import api from "../api";
import { NavLink } from "react-router-dom";   
import "../styles/HeaderSecond.css";

export default function Header() {
  const [header, setHeader] = useState(null);


  const [open, setOpen] = useState(false);

  useEffect(() => {
    api
      .get(`/api/headersecond/get-header?schoolId=1`)
      .then((res) => setHeader(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  if (!header) return null;

  return (
    <header className="site-header">
      <div className="header-video-wrap">

        {/* BG VIDEO */}
        <video className="bg-video" autoPlay muted loop playsInline>
          {header.backgroundVideo && (
            <source src={`http://localhost:5000${header.backgroundVideo}`} type="video/mp4" />
          )}
        </video>

        {/* OVERLAY CONTENT */}
        <div className="header-overlay">
          <div className="header-inner">

            {/* LOGO */}
            <div className="logo">
              <img src={`http://localhost:5000${header.logo}`} alt="logo" />
            </div>

            {/* NAVIGATION MENU */}
            <nav className={`nav ${open ? "open" : ""}`}>
              {header.menuItems?.map((m, index) => (
                <NavLink to={m.link} key={index}>
                  {m.name}
                </NavLink>
              ))}
            </nav>

            {/* ADMIN + HAMBURGER MENU */}
            <div className="header-right">
              <NavLink className="admin-btn" to={header.adminButton.link}>
                {header.adminButton.text}
              </NavLink>

              <button
                className="menu-toggle"
                aria-label="menu"
                onClick={() => setOpen((prev) => !prev)}
              >
                <span className="hamburger"></span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
































