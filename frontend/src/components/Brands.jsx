import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
function Brands() { const responsive = {
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
  tablet: {
    breakpoint: { max: 1024, min: 844 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile1: {
    breakpoint: { max: 844, min: 464 },
    items: 4,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile2: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  }
};
return (
  <div className='slider'>
    <h1>Markalarımız</h1>
  <div className='brand-carousel'>
    <Carousel
    renderButtonGroupOutside={true} 
  customTransition="all 1s ease-in-out" 
  infinite
  autoPlay
  draggable
  swipeable
  autoPlaySpeed={1000}
  pauseOnHover 
  shouldResetAutoplay
  focusOnSelect={false}
  responsive={responsive}
  rewind={false}
  rewindWithAnimation={false}
  rtl={false}
  showDots={false}
  sliderClass=""
  transitionDuration={1000}>

<div className='brand-container'><img className='brand' src="/img/dockers.jpg" alt=""/></div>
<div className='brand-container'><img className='brand' src="/img/koton.png" alt=""/></div>
<div className='brand-container'><img className='brand' src="/img/kinetix.jpg" alt=""/></div>
<div className='brand-container'><img className='brand' src="/img/ltb.png" alt=""/></div>
<div className='brand-container'><img className='brand' src="/img/lumberjack.jpg" alt=""/></div>
<div className='brand-container'><img className='brand' src="/img/polo.jpg" alt=""/></div>
<div className='brand-container'><img className='brand' src="/img/simal.png" alt=""/></div>
<div className='brand-container'><img className='brand' src="/img/suvari.png" alt=""/></div>
<div className='brand-container'><img className='brand' src="/img/polaris.jpg" alt=""/></div>

</Carousel>
  </div>
  </div>
  
  
)
}

export default Brands