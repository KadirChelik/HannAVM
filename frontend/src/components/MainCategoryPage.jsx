// MainCategoryPage.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterSidebar from './FilterSidebar';
import ProductList from './ProductList';

function MainCategoryPage() {
  const location = useLocation();
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
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
      <FilterSidebar onFilterChange={handleFilterChange} />
      <ProductList category={location.pathname.slice(1)} filters={filters} />
      </div>
      </div>
  );
}

export default MainCategoryPage;