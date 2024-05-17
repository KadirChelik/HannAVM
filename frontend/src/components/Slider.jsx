import React, { useState, useEffect } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Product from './Product';
import { fetchProducts } from '../services/ProductDataService';

function Slider() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);
  const productList= products.map(product => (
    <Product
      key={product.id}
      id={product.id}
      slider="true"
      name={product.name}
      photo1={product.photo1}
      photo2={product.photo2}
      price={product.price}
      discountedPrice={product.discountedPrice}
      description={product.description}
    />
  ));

  const responsive = {
    largescreen: {
      breakpoint: { max: 3000, min: 2024 },
      items: 8,
      slidesToSlide: 1 // optional, default to 1.
    },
    desktop1: {
      breakpoint: { max: 2084, min: 1600 },
      items: 6,
      slidesToSlide: 1 // optional, default to 1.
    },
    desktop2: {
      breakpoint: { max: 1600, min: 1324 },
      items: 5,
      slidesToSlide: 1 // optional, default to 1.
    },
    desktop3: {
      breakpoint: { max: 1324, min: 1024 },
      items: 4,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile1: {
      breakpoint: { max: 1024, min: 624 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile2: {
      breakpoint: { max: 624, min: 0 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  return (
    <div className='slider'>
      <h1>Şık Seçenekler</h1>
    <div className='slider-carousel'>
      <Carousel
      renderButtonGroupOutside={true} 
    customTransition="all 1s ease-in-out" 
    infinite
    autoPlay
    draggable
    swipeable
    minimumTouchDrag={80}
    autoPlaySpeed={5000}
    pauseOnHover 
    focusOnSelect={false}
    responsive={responsive}
    rewind={false}
    rewindWithAnimation={false}
    shouldResetAutoplay
    rtl={false}
    showDots={false}
    sliderClass=""
    transitionDuration={1000}>
  <div>{productList[0]}</div>
  <div >{productList[1]}</div>
  <div >{productList[2]}</div>
  <div >{productList[3]}</div>
  <div >{productList[4]}</div>
  <div >{productList[5]}</div>
  <div >{productList[6]}</div>
  <div >{productList[7]}</div>
  <div >{productList[8]}</div>
  <div >{productList[9]}</div>
  <div >{productList[10]}</div>
  <div >{productList[11]}</div>
</Carousel>
    </div>
    </div>
    
    
  )
}

export default Slider