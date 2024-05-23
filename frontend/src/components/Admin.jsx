import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight,faAngleLeft,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { fetchProducts } from '../services/ProductDataService';
import { NavLink } from 'react-router-dom';

function Admin() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetchProducts()
        .then(response => {
          const updatedProducts = response.data.map(product => {
            let totalStock = 0;

            product.colors.forEach(color => {
              color.sizes.forEach(size => {
                totalStock += size.stock;
              });
            });

            return {...product, stock: totalStock};
          });

          setProducts(updatedProducts);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }, []);

    const renderStockInfo = (colors) => {
      return colors.map(color => (
        <div className='admin-colors' key={color.name}>
          <div>{color.name}</div>
          <hr />
          <div className='admin-sizes-container'>
          {color.sizes.map(size => (
            <div className="admin-sizes" key={size.name} >
              <div>{size.name}</div>
              <div>{size.stock}</div> 
            </div>
          ))}
          </div>
          
        </div>
      ));
    };

  return (
    <div className='admin-container'>
      <h1>Admin Panel</h1>
      <div className='admin-btn-container'>
      <div className='admin-search-box'>
          <input type="text" name="search" className="admin-searcher" placeholder="Ürün Ara..." />
          <span className="admin-search-icon"> <FontAwesomeIcon icon={faMagnifyingGlass}/>  </span>
        </div>
        <NavLink to="/addproduct"><button className='admin-btn4'>Ürün Ekle</button></NavLink>
      </div>
      <div className='admin-products-table'>
        <div className='admin-table-headers'>
            <div>ID</div>
            <div>Resim</div>
            <div>İsim</div>
            <div>Açıklama</div>
            <div>Stok</div>
            <div>Ürün</div>
        </div>
        <div className='admin-table-list'>
            {products.map((product, index) => (
                <div className='admin-table-row' key={index}>
                <div>{product.id}</div>
                <div><img src={product.colors[0].photos[0]} alt="" /></div>
                <div>{product.name}</div>
                <div>{product.description}</div>
                <div>{renderStockInfo(product.colors)}</div>
                <div>
                    <div className='admin-product-btn'>
                    <NavLink to={`/updateproduct/${product.id}`}><button className='admin-btn2'>Güncelle</button></NavLink> 
                    <button className='admin-btn3'>Sil</button>
                    </div>
                </div>
                </div>
            ))}
        </div>
      </div>
      <div className='admin-page-control-container'>
        <div className='admin-page-control'>
        <button className='admin-btn5'><FontAwesomeIcon icon={faAngleLeft} /></button>
        <div>0</div>
        <button className='admin-btn5'><FontAwesomeIcon icon={faAngleRight} /></button>
        </div>
        </div>
    </div>
  );
}

export default Admin;
