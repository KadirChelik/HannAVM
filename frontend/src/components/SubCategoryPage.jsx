import React, { useState, useEffect } from 'react';
import FilterSidebar from './FilterSidebar';
import ProductList from './ProductList';
import { useMatch } from 'react-router-dom';
import { fetchProducts } from '../services/ProductDataService';
import Loading from './Loading';

function SubCategoryPage() {
  const match = useMatch('/:mainCategory/:subCategory');
  const { mainCategory, subCategory } = match.params;
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
    const categoryMap = {
      'indirim': 'indirim',
      'kadin': 'kadın',
      'erkek': 'erkek',
      'cocuk': 'çocuk',
      'aksesuar': 'aksesuar',
      'ic-giyim': 'iç Giyim',
      'tisort': 'tişört',
      'gomlek': 'gömlek',
      'tesettur': 'tesettür',
      'buyuk-beden': 'büyük beden',
      'hirka': 'hırka',
      'ayakkabi': 'ayakkabı',
      'sort': 'şort',
      'esofman': 'eşofman',
      'takim-elbise': 'takım Elbise',
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
  const subCategoryCapitalized = pageTitles[subCategory] || subCategory.charAt(0).toUpperCase() + subCategory.slice(1);

  return (
    <div className='category-page'>
      <h1>{pageTitle} {subCategoryCapitalized}</h1>
      <div className='category-page-container'>
        <FilterSidebar onFilterChange={handleFilterChange} products={filteredProducts} activeFilters={filters} />
        {loading ? <Loading /> : <ProductList products={filteredProducts} />}
      </div>
    </div>
  );
}

export default SubCategoryPage;
