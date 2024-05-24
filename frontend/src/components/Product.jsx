import React from 'react';

import { NavLink } from 'react-router-dom';

function NoDragNavLink({ to, children }) {
  const [downTime, setDownTime] = React.useState(0);
  const [upTime, setUpTime] = React.useState(0);

  const handleMouseDown = () => {
    setDownTime(new Date().getTime());
  };

  const handleMouseUp = () => {
    setUpTime(new Date().getTime());
  };

  const handleClick = (e) => {
    if (upTime - downTime > 200) {
      e.preventDefault();
    }
  };

  return (
    <NavLink 
      to={to} 
      onMouseDown={handleMouseDown} 
      onMouseUp={handleMouseUp} 
      onClick={handleClick} 
      draggable="false"
    >
      {children}
    </NavLink>
  );
}

function Product(props) {
  const { id,name, price,photo1,photo2,discountedPrice,slider} = props;
  
  return (
    <>

{slider==="true" ? 
<NoDragNavLink to={`/product/${id}`}>
<div className='slider-card'>
   <div className='slider-images'>
   <img src={photo1} alt=""/>
    </div>
    <div className='slider-card-info'>
    <h5>{name}</h5>
   <p><span className={discountedPrice ? 'old-price' :""}>{price} TL</span> <span className='discounted-price'>{discountedPrice ? `${discountedPrice} TL` : ""}</span> </p>
   </div>
 
  
  </div> 
</NoDragNavLink>
  
  : 
  <NavLink to={`/product/${id}`}>
    <div className="product">
    <div className="product-images">
      <img src={photo1} alt="" className="default-image" />
      <img src={photo2} alt="" className="hover-image" />
    </div>    
  <div className='product-info'>
  <h5>{name}</h5>
  <p><span className={discountedPrice ? 'old-price' :""}>{price} TL</span> <span className='discounted-price'>{discountedPrice ? `${discountedPrice} TL` : ""}</span> </p>
    <p><button ><i className="fa-solid fa-cart-plus"></i> Sepete Ekle </button></p>
  </div>
    
  </div>
  </NavLink>
  }
    </>
  );
}

export default Product;
