import React from "react";
import { Outlet } from "react-router-dom";
import HeaderSecond from "./HeaderSecond";
import FooterSecond from "./FooterSecond";


export default function PublicLayout() {
  return (
    <>
      {/* Common Header for all parent pages */}
      <HeaderSecond />

      {/* Page Content */}
      <main
        style={{
          minHeight: "80vh",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Outlet />
      </main> 


      {/* Common Footer */}
      <FooterSecond />
    </>
  );
}

