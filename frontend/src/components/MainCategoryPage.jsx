import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterSidebar from './FilterSidebar';
import ProductList from './ProductList';
import { fetchProducts } from '../services/ProductDataService';
import Loading from './Loading';

function MainCategoryPage() {
  const location = useLocation();
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setLoading(false);
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
    setLoading(true);
    applyFilters();
  }, [filters, products]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const applyFilters = () => {
    let filtered = products;

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
    setLoading(false);
  };

  const pageTitles = {
    '/indirim': 'İndirimdekiler',
    '/kadin': 'Kadın',
    '/erkek': 'Erkek',
    '/cocuk': 'Çocuk',
    '/aksesuar': 'Aksesuar',
  };

  const pageTitle = pageTitles[location.pathname] || location.pathname.slice(1);

  return (
    <div className='category-page'>
      <h1>{pageTitle}</h1>
      <div className='category-page-container'>
        <FilterSidebar onFilterChange={handleFilterChange} products={filteredProducts} activeFilters={filters} />
        {loading ? <Loading /> : <ProductList products={filteredProducts} />}
      </div>
    </div>
  );
}

export default MainCategoryPage;
