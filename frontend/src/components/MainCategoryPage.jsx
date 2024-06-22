import React, { useState, useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import FilterSidebar from './FilterSidebar';
import ProductList from './ProductList';
import { fetchProducts } from '../services/ProductDataService';
import { productReducer, initialState } from '../services/ProductReducer';
import Loading from './Loading';

function MainCategoryPage() {
  const location = useLocation();
  const [filters, setFilters] = useState({});
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  useEffect(() => {
    let newFilters = {};

    const categoryMap = {
      '/indirim': 'indirim',
      '/kadin': 'kadın',
      '/erkek': 'erkek',
      '/cocuk': 'çocuk',
      '/aksesuar': 'aksesuar'
    };

    const category = categoryMap[location.pathname];
    if (category) {
      newFilters = { Kategori: [category] };
    }

    setFilters(newFilters);
  }, [location.pathname]);

  useEffect(() => {
    applyFilters();
  }, [filters, state.products]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const applyFilters = () => {
    let filtered = state.products;

    filtered = filtered.filter(product => {
      return Object.keys(filters).every(filterCategory => {
        if (filters[filterCategory].length > 0) {
          let filterValues = [];

          if (filterCategory !== 'Fiyat') {
            filterValues = filters[filterCategory].map(filter => filter.split(' (')[0]);
          }

          if (filterCategory === 'Kategori') {
            return filterValues.every(filterValue => product.category.includes(filterValue));
          } else if (filterCategory === 'Beden') {
            return filterValues.every(filterValue =>
              product.colors.some(color =>
                color.sizes.some(size => size.name.includes(filterValue) && size.stock > 0)
              )
            );
          } else if (filterCategory === 'Marka') {
            return filterValues.every(filterValue => product.brand.includes(filterValue));
          } else if (filterCategory === 'Renk') {
            return filterValues.every(filterValue => product.colors.some(color => color.name.includes(filterValue)));
          } else if (filterCategory === 'Kalıp') {
            return filterValues.every(filterValue => product.fit.includes(filterValue));
          } else if (filterCategory === 'Fiyat') {
            const [minPrice, maxPrice] = filters[filterCategory];
            const productPrice = parseFloat(product.price);
            return productPrice >= minPrice && productPrice <= maxPrice;
          }
        }
        return true;
      });
    });

    setFilteredProducts(filtered);
  };

  const pageTitles = {
    '/indirim': 'İndirimdekiler',
    '/kadin': 'Kadın',
    '/erkek': 'Erkek',
    '/cocuk': 'Çocuk',
    '/aksesuar': 'Aksesuar',
  };

  const pageTitle = pageTitles[location.pathname] || location.pathname.slice(1);
  const isMobile = window.innerWidth < 768;
  return (
    <div className='category-page'>
      <div className='category-page-header'>
        {isMobile ? (<FilterSidebar onFilterChange={handleFilterChange} products={filteredProducts} activeFilters={filters} />) :""}
      <div className='category-page-h1'>
      <h1>{pageTitle}</h1>
      </div>
      </div>
      <div className='category-page-container'>
      {isMobile ? "" :(<FilterSidebar onFilterChange={handleFilterChange} products={filteredProducts} activeFilters={filters} />)}
        {state.isLoading ? <Loading /> : state.isError ? <p>Ürünler alınamadı.</p> : <ProductList products={filteredProducts} />}
      </div>
    </div>
  );
}

export default MainCategoryPage;
