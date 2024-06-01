import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs"; // Yeni eklendi
import "../App.css";

const Template = ({ isAdmin, setIsAdmin, authControl, setAuthControl }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  
  return (
    <div>
      <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} authControl={authControl} setAuthControl={setAuthControl} />
      <div className="my-container">
        {/* Breadcrumbs bileşenini ekleyin */}
        <Breadcrumbs />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Template;
