import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../App.css";

const Template = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location]);
  return (
    <div>
      <Navbar />
      <div className="my-container">
        <Outlet/>   
        <Footer />    
      </div>
    </div>
  );
};

export default Template;
