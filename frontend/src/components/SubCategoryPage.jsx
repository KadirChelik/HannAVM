import React, { useState } from 'react';
import FilterSidebar from './FilterSidebar';
import ProductList from './ProductList';
import { useMatch } from 'react-router-dom';

function SubCategoryPage() {
  const match = useMatch('/:mainCategory/:subCategory');
  const [filters, setFilters] = useState({});
  const { mainCategory, subCategory } = match.params;

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  const pageTitles = {
    'indirim': 'İndirimdekiler',
    'kadin': 'Kadın',
    'erkek': 'Erkek',
    'cocuk': 'Çocuk',
    'aksesuar': 'Aksesuar',
    'ic-giyim': 'İç Giyim',
    'tisort': 'Tişört',
    'gomlek': 'Gömlek',
    'tesettur': 'Tesettür',
    'buyuk-beden': 'Büyük Beden',
    'hirka': 'Hırka',
    'ayakkabi': 'Ayakkabı',
    'sort': 'Şort',
    'esofman': 'Eşofman',
    'takim-elbise': 'Takım Elbise',
    'canta': 'Çanta',
    'parfum': 'Parfüm',
    'taki': 'Takı',
    'basortusu': 'Başörtüsü',
    'gunes-gozlugu': 'Güneş Gözlüğü',
    'cuzdan': 'Cüzdan',
    'sapka': 'Şapka',
  };

  const pageTitle = pageTitles[mainCategory] || location.pathname.slice(1);

  const subCategoryCapitalized = pageTitles[subCategory]|| subCategory.charAt(0).toUpperCase() + subCategory.slice(1);

  return (
    <div className='category-page'>
      <h1>{pageTitle} {subCategoryCapitalized}</h1>
      <div className='category-page-container'>
      <FilterSidebar onFilterChange={handleFilterChange} />
      <ProductList category={subCategory} filters={filters} />
      </div>
      </div>
  );
}

export default SubCategoryPage;