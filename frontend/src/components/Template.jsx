import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../App.css";
const Template = () => {
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
