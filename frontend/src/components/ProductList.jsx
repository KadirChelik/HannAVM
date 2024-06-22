// ProductList.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
function ProductList({ products }) {
  const isMobile = window.innerWidth < 768;
    return (
      <div>
        <div className={isMobile ? "filter-results-mobile" : 'filter-results'}>
          {products.map((product, index) => (
            <NavLink to={`/product/${product._id}`} key={index}>
              <div className="search-product">
                <div className="product-images">
                  <img src={product.colors[0].photos[0]} alt="" className="default-image" />
                  <img src={product.colors[0].photos[1]} alt="" className="hover-image" />
                </div>    
                <div className='product-info'>
                  <h5>{product.name}</h5>
                  <p>
                    <span className={product.discountedPrice ? 'old-price' : ""}>{product.price} TL</span> 
                    <span className='discounted-price'>{product.discountedPrice ? `${product.discountedPrice} TL` : ""}</span> 
                  </p>
                  <p>
                    <button>
                    <i className="fa-solid fa-cart-plus"></i> Sepete Ekle 
                    </button>
                  </p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    );
  }

export default ProductList;