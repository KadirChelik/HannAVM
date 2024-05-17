import React from 'react'
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
    <div className='category-box1'>
    <h5>Kadın</h5>
        <img src={image2} alt="" /></div>
    
    
    <div className='category-box'><h5>Aksesuar</h5><img src={image1} alt="" /></div>
      
  

    
    
    <div className='category-box'><h5>Çocuk</h5><img src={image4} alt="" /></div>
      

    
    <div className='category-box1'>
    <h5>Erkek</h5>
        <img src={image3} alt="" /></div>

    </div>
       
      
</div>

  )
}

export default CategoryBoxes