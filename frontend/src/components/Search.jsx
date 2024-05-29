import React, { useState, useEffect, useReducer } from 'react';
import { fetchProducts } from '../services/ProductDataService';
import { productReducer, initialState } from '../services/ProductReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faTimes,faAngleLeft,faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import Loading from './Loading';
function Search() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([
    "Kadın İç Giyim", 
    "Kadın Elbise",
    "Kadın Tişört",
    "Kadın Gömlek",
    "Kadın Pantolon",
    "Kadın Mont",
    "Kadın Bluz",
    "Kadın Ceket",
    "Etek",
    "Kadın Kazak",
    "Tesettür",
    "Kadın Büyük Beden", 
    "Kadın Sweatshirt",
    "Kadın Kaban",
    "Kadın Hırka",
    "Kadın Ayakkabı",
    "Erkek İç Giyim",
    "Erkek Tişört",
    "Erkek Şort",
    "Erkek Gömlek",
    "Erkek Eşofman",
    "Erkek Pantolon",
    "Erkek Ceket",
    "Erkek Yelek",
    "Erkek Kazak",
    "Erkek Mont",
    "Erkek Takım Elbise",
    "Erkek Sweatshirt",
    "Erkek Kaban",
    "Erkek Hırka",
    "Erkek Blazer",
    "Erkek Ayakkabı",
    "Bebek",
    "Çocuk İç Giyim",
    "Çocuk Tişört",
    "Çocuk Şort",
    "Çocuk Sweatshirt",
    "Çocuk Elbise",
    "Çocuk Gömlek",
    "Çocuk Pantolon",
    "Çocuk Eşofman",
    "Çocuk Mont",
    "Çocuk Ceket",
    "Çocuk Hırka",
    "Çocuk Takım Elbise",
    "Çocuk Kazak",
    "Çocuk Ayakkabı",
    "Çanta",
    "Parfüm",
    "Takı",
    "Başörtüsü",
    "Güneş Gözlüğü",
    "Saat",
    "Cüzdan",
    "Valiz",
    "Kemer",
    "Kıravat",
    "Şapka",
]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

 

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

    useEffect(() => {
      setProducts(state.products);
      setSearchResults(state.products);
    }, [state.products]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
    setIsSubmitted(false);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  const handleSubmit = event => {
    event.preventDefault();
  
    if (searchTerm.trim() === '') {
      setSearchResults(products);
      setIsSubmitted(true);
      return;
    }
  
    const keywords = searchTerm.trim().split(' ');
  
    const results = products.filter(product => {
      return keywords.every(keyword => {
        const normalizedKeyword = normalize(keyword);
        return normalize(product.name).includes(normalizedKeyword) ||
          product.category.some(category => normalize(category).includes(normalizedKeyword)) ||
          (typeof product.description === 'string' && normalize(product.description).includes(normalizedKeyword));
      });
    });
  
    setSearchResults(results);
    setIsSubmitted(true);
  
    setSearchHistory(prevHistory => {
      const newHistory = [...prevHistory];
      if (!newHistory.includes(searchTerm.trim())) {
        newHistory.push(searchTerm.trim());
      }
      return newHistory.length > 6 ? newHistory.slice(newHistory.length - 6) : newHistory;
    });
  };

  const handleCategoryClick = category => {
    setSearchTerm(category);
    setSelectedCategory(category);
  };

  const normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filteredCategories = searchTerm
    ? categories
        .filter(category =>
          category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => 
          a.toLowerCase().indexOf(searchTerm.toLowerCase()) - b.toLowerCase().indexOf(searchTerm.toLowerCase())
        )
        .slice(0, 20)
    : [];

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
          handleSubmit(event);
        }
      };
  return (
    <div className='searchproduct-container'>
      <h1>Ürün Ara</h1>
      <form className='search-area' onSubmit={handleSubmit}>
        <div className='search-bar'>
          <input
            className='search-input'
            type="text"
            placeholder="Ürün, Renk, Marka veya Kategori Ara"
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          {searchTerm && <button className='clear-button' onClick={handleClear}><FontAwesomeIcon icon={faTimes} /></button>}
          <button className='search-button' type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </div>
        {!searchTerm && (
          <div className='category-suggestions'>
            {searchHistory.map((historyItem, index) => (
              <div className='search-categories' key={index} onClick={() => setSearchTerm(historyItem)}>
                {historyItem}
              </div>
            ))}
          </div>
        )}
        {searchTerm && !isSubmitted && (
          <div className='category-suggestions'>
            {filteredCategories.map((category, index) => {
              const regex = new RegExp(`(${searchTerm})`, 'gi');
              const parts = category.split(regex);
              return (
                <div className='search-categories' key={index} onClick={() => handleCategoryClick(category)}>
                  {parts.map((part, i) => (
                    regex.test(part) ? <span className='search-letter' key={i}>{part}</span> : part
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </form>
      
      {state.isLoading? <Loading/> : state.isError ? (<p>Ürünler alınamadı.</p>) : (<div className='search-results'>
        {searchResults.map((product, index) => (
          <NavLink to={`/product/${product._id}`} key={index}>
          <div className="search-product">
          <div className="product-images">
            <img src={product.colors[0].photos[0]} alt="" className="default-image" />
            <img src={product.colors[0].photos[1]} alt="" className="hover-image" />
          </div>    
        <div className='product-info'>
        <h5>{product.name}</h5>
        <p><span className={product.discountedPrice ? 'old-price' :""}>{product.price} TL</span> <span className='discounted-price'>{product.discountedPrice ? `${product.discountedPrice} TL` : ""}</span> </p>
          <p><button ><i className="fa-solid fa-cart-plus"></i> Sepete Ekle </button></p>
        </div>
          
        </div>
        </NavLink>
        ))}
      </div>)}
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

export default Search;