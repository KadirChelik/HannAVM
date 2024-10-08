import React, { useState, useEffect, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import { fetchProducts, deleteProduct } from '../services/ProductDataService';
import { productReducer, initialState } from '../services/ProductReducer';
import Loading from './Loading';
import { NavLink } from 'react-router-dom';

function ProductManagement({isAdmin}) {
  if (!isAdmin) {
    console.log('isAdmin:', isAdmin);
    return (
      <div className='admin-main-container0'>
        <h1>Yetkili değilsiniz!</h1>
      </div>
    )
  }
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [confirmDeleteProductId, setConfirmDeleteProductId] = useState(null);

  useEffect(() => {
    dispatch({ type: 'FETCH_INIT' });
    fetchProducts()
      .then(response => {
        const sortedProducts = response.data.sort((a, b) => a.id - b.id);
        dispatch({ type: 'FETCH_PRODUCTS', payload: sortedProducts });
      })
      .catch(error => {
        console.error('There was an error!', error);
        dispatch({ type: 'FETCH_FAILURE' });
      });
  }, []);

  useEffect(() => {
    const updatedProducts = state.products.map(product => {
      let totalStock = 0;

      product.colors.forEach(color => {
        color.sizes.forEach(size => {
          totalStock += size.stock;
        });
      });

      return { ...product, stock: totalStock };
    });

    setProducts(updatedProducts);
    setSearchResults(updatedProducts);
  }, [state.products]);

  const renderStockInfo = colors => {
    return colors.map(color => (
      <div className='admin-colors' key={color.name}>
        <div>{color.name}</div>
        <hr />
        <div className='admin-sizes-container'>
          {color.sizes.map(size => (
            <div className='admin-sizes' key={size.name}>
              <div>{size.name}</div>
              <div>{size.stock}</div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  const handleDeleteProduct = productId => {
    setConfirmDeleteProductId(productId);
  };

  const confirmDelete = () => {
    if (confirmDeleteProductId) {
      deleteProduct(confirmDeleteProductId)
        .then(response => {
          fetchProducts()
            .then(response => {
              const sortedProducts = response.data.sort((a, b) => a.id - b.id);
              dispatch({ type: 'FETCH_PRODUCTS', payload: sortedProducts });
            })
            .catch(error => {
              console.error('There was an error!', error);
              dispatch({ type: 'FETCH_FAILURE' });
            });
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        })
        .finally(() => {
          setConfirmDeleteProductId(null);
        });
    }
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    if (event.target.value.trim() === '') {
      setSearchResults(products);
      return;
    }

    const searchTerm = event.target.value.trim().toLowerCase();
    const isNumericSearch = !isNaN(searchTerm);

    const results = products.filter(product => {
      if (isNumericSearch) {
        return product.id === parseInt(searchTerm);
      } else {
        const keywords = searchTerm.split(' ');
        return keywords.every(keyword =>
          product.name.toLowerCase().includes(keyword) ||
          product.colors.some(color => color.name.toLowerCase().includes(keyword)) ||
          (product.description && product.description.toLowerCase().includes(keyword)) ||
          (product.category && product.category.some(category => category.toLowerCase().includes(keyword)))
        );
      }
    });

    setSearchResults(results);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults(products);
  };

  return (
    <div className='admin-container'>
      <h1>Ürün Yönetimi</h1>
      <div className='admin-btn-container'>
        <div className='admin-search-box'>
          <input
            type='text'
            name='search'
            className='admin-searcher'
            placeholder='ID, İsim, Renk, Kategori veya Açıklama ara...'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button className='clear-button1' onClick={handleClearSearch}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
          <span className='admin-search-icon'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
        </div>
        <NavLink to='/admin/product-management/add-product'><button className='admin-btn4'>Ürün Ekle</button></NavLink>
      </div>
      <div className='admin-products-table'>
        <div className='admin-table-headers'>
          <div className='admin-table-header1'>ID</div>
          <div className='admin-table-header2'>Resim</div>
          <div className='admin-table-header3'>İsim</div>
          <div className='admin-table-header4'>Açıklama</div>
          <div className='admin-table-header5'>Stok</div>
          <div className='admin-table-header6'>Ürün</div>
        </div>
        {state.isLoading ? <Loading /> : state.isError ? <p>Ürünler alınamadı.</p> : (
          <div className='admin-table-list'>
            {searchResults.map((product, index) => (
              <div className='admin-table-row' key={index}>
                <div className='admin-table-col1'>{product.id}</div>
                <div className='admin-table-col2'>
                <NavLink to={`/product/${product._id}`}>
                  {product.colors && product.colors.length > 0 && product.colors[0].photos && product.colors[0].photos.length > 0 ? (
                    <img src={product.colors[0].photos[0]} alt='' />
                  ) : "-"}
                  </NavLink>
                </div>
                
                <div className='admin-table-col3'>{product.name}</div>
                <div className='admin-table-col4'>{product.description}</div>
                <div className='admin-table-col5'>{renderStockInfo(product.colors)}</div>
                <div className='admin-table-col6'>
                  <div className='admin-product-btn'>
                    <NavLink to={`/admin/product-management/update-product/${product._id}`}><button className='admin-btn2'>Güncelle</button></NavLink>
                    <button className='admin-btn3' onClick={() => handleDeleteProduct(product._id)}>Sil</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {confirmDeleteProductId && (
        <div className='admin-confirm-delete'>
          <p>Ürünü silmek istediğinizden emin misiniz?</p>
          <div className='admin-delete-buttons'>
            <button className='admin-confirm-btn' onClick={confirmDelete}>Evet</button>
            <button className='admin-cancel-btn' onClick={() => setConfirmDeleteProductId(null)}>Hayır</button>
          </div>
        </div>
      )}
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

export default ProductManagement;
