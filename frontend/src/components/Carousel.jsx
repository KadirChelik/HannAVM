import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import resim1 from "/img/ornekresim-1.jpg";
import resim2 from "/img/ornekresim-2.jpg";
function DarkVariantExample() {
  return (
    <Carousel  interval={4000} fade indicators={false} className='my-z-index'  data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={resim1}
          alt="First slide"
        />
        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={resim2}
          alt="Second slide"
        />
        
      </Carousel.Item>
      
    </Carousel>
  );
}

export default DarkVariantExample;