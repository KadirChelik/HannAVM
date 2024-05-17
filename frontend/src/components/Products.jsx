import React, { useState,useEffect } from 'react';
import Product from './Product';
import { fetchProducts } from '../services/ProductDataService';

function Products() {

    const [category,setCategory] = useState("seçtiklerimiz");
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
  
  const filteredProducts = category === 'all' ? products : products.filter(product => product.category.includes(category));

  const productList = filteredProducts.map(product => (
    <Product
      key={product.id}
      id={product.id}
      slider="false"
      name={product.name}
      photo1={product.photo1}
      photo2={product.photo2}
      price={product.price}
      discountedPrice={product.discountedPrice}
      description={product.description}
    />
  ));

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <div className="products">
      <h1>Trend Ürünler</h1>
      <div className='categories'>
        <button className={category === 'seçtiklerimiz' ? 'active' : ''} onClick={() => handleCategoryChange('seçtiklerimiz')}>Sizin İçin Seçtiklerimiz</button>
        <button className={category === 'yeni' ? 'active' : ''} onClick={() => handleCategoryChange('yeni')}>Yeniler</button>
        <button className={category === 'çok satanlar' ? 'active' : ''} onClick={() => handleCategoryChange('çok satanlar')}>Çok Satanlar</button>
      </div>
      <div className='products-container'>
        {productList}
      </div>
    </div>
  );
}

export default Products;