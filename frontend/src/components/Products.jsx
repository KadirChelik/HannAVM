import React, { useState, useEffect, useReducer } from 'react';
import Product from './Product';
import { fetchProducts } from '../services/ProductDataService';
import { productReducer, initialState } from '../services/ProductReducer';
import Loading from './Loading';
function Products() {

    const [category,setCategory] = useState("seçtiklerimiz");
    const [state, dispatch] = useReducer(productReducer, initialState);

    useEffect(() => {
      dispatch({ type: 'FETCH_INIT' });
      fetchProducts()
        .then(response => {
          dispatch({ type: 'FETCH_PRODUCTS', payload: response.data });
        })
        .catch(error => {
          console.error('There was an error!', error);
          dispatch({ type: 'FETCH_FAILURE' });
        });
    }, []);
  
    const filteredProducts = category === 'all' ? state.products : state.products.filter(product => product.category.includes(category));
  
  const productList = filteredProducts.map(product => (
    <Product
      key={product.id}
      id={product._id}
      slider="false"
      name={product.name}
      photo1={product.colors[0].photos[0]}
      photo2={product.colors[0].photos[1]}
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
      </div>{state.isLoading ? <Loading /> :
                state.isError ? <p>Ürünler alınamadı.</p> :
                    <div className='products-container'>
                        {productList}
                    </div>
            }
    </div>
  );
}

export default Products;