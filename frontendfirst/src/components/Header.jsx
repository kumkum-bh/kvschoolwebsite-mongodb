// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import "../styles/Header.css";

// export default function Header() {
//   const location = useLocation();

//   const navItems = [
//     { name: "Home", path: "/" },
//     { name: "The School", path: "/school" },
//     { name: "Admissions", path: "/admissions" },
//     { name: "Academics", path: "/academics" },
//     { name: "Extra Curricular", path: "/extracurricular" },
//     { name: "Notices", path: "/notices" },
//     { name: "Gallery", path: "/gallery" },
//     { name: "Mandatory Disclosure", path: "/mandatory-disclosure" },
//     { name: "Contact", path: "/contact" },
//   ];

//   return (
//     <header className="site-header">
//       <div className="topbar">
//         <div className="top-left">
//           <img src="/assets/logo.png" alt="logo" className="logo" />
//           <div className="school-meta">
//             <div className="school-name">Kendriya Vidyalaya Sector-24 Noida</div>
//             <div className="school-sub">
//               CBSE Board Affiliated Co-Ed English Medium Senior Secondary School
//             </div>
//           </div>
//         </div>

//         <div className="top-right">
//           <Link to="/fee-payment">
//             <button className="payfee-btn">Pay Fee</button>
//           </Link>

//           <Link to="/admin-login">
//             <button className="login-btn">Admin Login</button>
//           </Link>
//         </div>
//       </div>

//       <nav className="main-nav">
//         <div className="nav-inner">
//           {navItems.map((item) => {
//             const active = location.pathname === item.path;
//             return (
//               <Link
//                 key={item.name}
//                 to={item.path}
//                 className={`nav-item ${active ? "active" : ""}`}
//               >
//                 {item.name}
//               </Link>
//             );
//           })}
//         </div>
//       </nav>
//     </header>
//   );
// }

















import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../api";
import "../styles/Header.css";

export default function Header() {
  const location = useLocation();

  const [header, setHeader] = useState(null);
  const [menu, setMenu] = useState([]);

  const fetchHeader = async () => {
    try {
      const res = await api.get("/api/admin-header/content");
      if (res.data.success && res.data.content) {
        setHeader(res.data.content);
      }
    } catch (err) {
      console.log("Header fetch error", err);
    }
  };


  const fetchMenu = async () => {
    try {
      const res = await api.get("/api/admin-header/menu");
      if (res.data.success && res.data.menu) {
        setMenu(res.data.menu); // ✅ only array
      }
    } catch (err) {
      console.log("Menu fetch error", err);
    }
  };



  useEffect(() => {
    fetchHeader();
    fetchMenu();
  }, []);

  if (!header) return null;

  return (
    <header className="site-header">

      {/* ---- TOP BAR ---- */}
      <div className="topbar">
        <div className="top-left">

          <img
            src={header.logo || "/assets/logo.png"}
            alt="logo"
            className="logo"
          />

          <div className="school-meta">
            <div className="school-name">{header.schoolName}</div>
            <div className="school-sub">{header.subHeading}</div>
          </div>
        </div>

        <div className="top-right">

          <Link to="/fee-payment">
            <button className="payfee-btn">
              {header.buttonText || "Pay Fee"}
            </button>
          </Link>

          <Link to="/admin-login">
            <button className="login-btn">Admin Login</button>
          </Link>

        </div>
      </div>

      {/* ---- NAV BAR ---- */}
      <nav className="main-nav">
        <div className="nav-inner">
          {menu.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item._id}
                to={item.path}
                className={`nav-item ${active ? "active" : ""}`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

    </header>
  );
}




































