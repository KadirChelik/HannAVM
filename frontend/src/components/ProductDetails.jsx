import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../services/ProductDataService';
import { useCart } from './CartContext';
import Loading from './Loading';
function ProductDetails() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts().then(response => setProducts(response.data));
  }, []);

  const product = products.find(product => product.id === Number(id));

  if (!product) {
    return <Loading />;
  }
  
  const addToCart = () => {
    dispatch({ 
        type: 'ADD_TO_CART', 
        product: { 
            id: product.id, 
            name: product.name, 
            price: product.price, 
            photo1: product.photo1, 
            photo2: product.photo2, 
            discountedPrice: product.discountedPrice 
        } 
    });
};


  return (
    <div className='product-detail-container'>
      <div className='product-detail-img'>
      <img src={product.photo1} alt={product.name} />
      </div>
      <div className='product-details'>
      <h2>{product.name}</h2>
      <hr/>
      <h5>Ürün Özellikleri</h5>
      <p className='product-detail-desc'>{product.description}</p>
      <p>%65 Pamuk, %35 Polyester</p>
      <hr />
      <h5>Mevcut Seçenekler</h5>
      <div className='product-detail-options'>
      <div>
          <div>Beden</div>
        <select id="sizeSelect" >
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
      </div>
      <div>
        <div>Renk</div>
        <select id="colorSelect" >
          <option value="Kırmızı">Kırmızı</option>
          <option value="Mavi">Mavi</option>
          <option value="Yeşil">Yeşil</option>
        </select>
      </div>
      </div>
      <hr/>
      <p className='product-detail-price'>{product.price} TL</p>
      
      <button onClick={addToCart} className='product-detail-btn'>Sepete Ekle</button>
      </div>
      
    </div>
  );
}

export default ProductDetails;