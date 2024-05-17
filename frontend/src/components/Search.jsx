import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/ProductDataService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faTimes,faAngleLeft,faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
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

  useEffect(() => {
    fetchProducts().then(response => {
      setProducts(response.data);
      setSearchResults(response.data);
    });
  }, []);

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
      <div className='search-results'>
        {searchResults.map((product, index) => (
          <NavLink to={`/product/${product.id}`} key={index}>
          <div className="search-product">
          <div className="product-images">
            <img src={product.photo1} alt="" className="default-image" />
            <img src={product.photo2} alt="" className="hover-image" />
          </div>    
        <div className='product-info'>
        <h5>{product.name}</h5>
        <p><span className={product.discountedPrice ? 'old-price' :""}>{product.price} TL</span> <span className='discounted-price'>{product.discountedPrice ? `${product.discountedPrice} TL` : ""}</span> </p>
          <p><button ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffffff" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z"/></svg> Sepete Ekle </button></p>
        </div>
          
        </div>
        </NavLink>
        ))}
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

export default Search;