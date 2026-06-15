import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


export default function PublicLayout() {
  return (
    <>
      {/* Common Header for all parent pages */}
      <Header />

      {/* Page Content */}
      <main
        style={{
          minHeight: "80vh",
          padding: "1rem",
          display: "flex",
          justifyContent: "center", 
          alignItems: "flex-start", 
          flexDirection: "column",   
        }}
      >
        <Outlet />
      </main> 


      {/* Common Footer */}
      <Footer />
    </>
  );
}

