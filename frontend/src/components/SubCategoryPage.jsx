import React, { useState, useEffect, useReducer } from 'react';
import FilterSidebar from './FilterSidebar';
import ProductList from './ProductList';
import { useMatch } from 'react-router-dom';
import { fetchProducts } from '../services/ProductDataService';
import { productReducer, initialState } from '../services/ProductReducer';
import Loading from './Loading';

function SubCategoryPage() {
  const match = useMatch('/:mainCategory/:subCategory');
  const { mainCategory, subCategory } = match.params;
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
    const categoryMap = {
      'indirim': 'indirim',
      'kadin': 'kadın',
      'erkek': 'erkek',
      'cocuk': 'çocuk',
      'aksesuar': 'aksesuar',
      'ic-giyim': 'iç giyim',
      'tisort': 'tişört',
      'gomlek': 'gömlek',
      'tesettur': 'tesettür',
      'buyuk-beden': 'büyük beden',
      'hirka': 'hırka',
      'ayakkabi': 'ayakkabı',
      'sort': 'şort',
      'esofman': 'eşofman',
      'takim-elbise': 'takım elbise',
      'canta': 'çanta',
      'parfum': 'parfüm',
      'taki': 'takı',
      'basortusu': 'başörtüsü',
      'gunes-gozlugu': 'güneş gözlüğü',
      'cuzdan': 'cüzdan',
      'sapka': 'şapka',
    };

    const mainCategoryName = categoryMap[mainCategory] || mainCategory;
    const subCategoryName = categoryMap[subCategory] || subCategory;

    const newFilters = {
      Kategori: [mainCategoryName, subCategoryName]
    };

    setFilters(newFilters);
  }, [mainCategory, subCategory]);

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

  const pageTitle = pageTitles[mainCategory] || mainCategory.charAt(0).toUpperCase() + mainCategory.slice(1);
  const subCategoryCapitalized = pageTitles[subCategory] || subCategory.charAt(0).toUpperCase() + subCategory.slice(1);

  return (
    <div className='category-page'>
      <h1>{pageTitle} {subCategoryCapitalized}</h1>
      <div className='category-page-container'>
        <FilterSidebar onFilterChange={handleFilterChange} products={filteredProducts} activeFilters={filters} />
        {state.isLoading ? <Loading /> : state.isError ? <p>Ürünler alınamadı.</p> : <ProductList products={filteredProducts} />}
      </div>
    </div>
  );
}

export default SubCategoryPage;
