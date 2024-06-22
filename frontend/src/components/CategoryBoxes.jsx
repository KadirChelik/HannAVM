import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from '/img/accesory-category1.png';
import image2 from '/img/resim1.jpg';
import image3 from '/img/man-category.jpg';
import image4 from '/img/resim2.jpg';
function CategoryBoxes() {
  return (
    <div className="category-boxes-container">
        <div className='header'><h1>Alışverişe Başlayın</h1></div>

    <div className='boxes-container'>

      <NavLink to="/kadin">

    <div className='category-box1'>
    <h5>Kadın</h5>
        <img src={image2} alt="" /></div>
    
      </NavLink>
    
    <NavLink to="/aksesuar">
    <div className='category-box'><h5>Aksesuar</h5><img src={image1} alt="" /></div>

    </NavLink>
      
  

    
    <NavLink to="/cocuk">

    <div className='category-box'><h5>Çocuk</h5><img src={image4} alt="" /></div>
    </NavLink>
      


    <NavLink to="/erkek">

    <div className='category-box1'>
    <h5>Erkek</h5>
        <img src={image3} alt="" /></div>

    </NavLink>

    </div>
       
      
</div>

  )
}

export default CategoryBoxes