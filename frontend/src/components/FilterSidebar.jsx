import React, { useState } from 'react';

const FilterSidebar = ({ onFilterChange }) => {
  const [openFilters, setOpenFilters] = useState([]);
  const filters = {
    'Kategori': ['Kategori 1', 'Kategori 2', 'Kategori 3', 'Kategori 4', 'Kategori 5', 'Kategori 6', 'Kategori 7', 'Kategori 8', 'Kategori 9', 'Kategori 10'],
    'Beden': ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    'Marka': ['Marka 1', 'Marka 2', 'Marka 3'],
    'Renk': ['Renk 1', 'Renk 2', 'Renk 3'],
    'Fiyat': ['Fiyat 1', 'Fiyat 2', 'Fiyat 3'],
    'Kalıp': ['Kalıp 1', 'Kalıp 2', 'Kalıp 3'],
  };

  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (filterCategory, filterValue) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterCategory]: [filterValue]
    });
    onFilterChange({
      ...selectedFilters,
      [filterCategory]: [filterValue]
    });
  };

  const toggleFilter = (filterCategory) => {
    if (openFilters.includes(filterCategory)) {
      setOpenFilters(openFilters.filter(category => category !== filterCategory));
    } else {
      setOpenFilters([...openFilters, filterCategory]);
    }
  };
  
  return (
    <div className='filter-container'>
      <div className='selected-filters'>
        {Object.keys(selectedFilters).map((filterCategory) => (
          <div key={filterCategory}>
            <h5>{filterCategory}</h5>
            <p>{selectedFilters[filterCategory]}</p>
          </div>
        ))}
      </div>
      {Object.keys(filters).map((filterCategory) => (
        <div className='filter-category-container' key={filterCategory}>
          <button className='filter-header' onClick={() => toggleFilter(filterCategory)}>
          <h5 >
            {filterCategory}
          </h5>
          {openFilters.includes(filterCategory) ? 
              <i className="fa-solid fa-angle-up"></i> : 
              <i className="fa-solid fa-angle-down"></i>
            }
          </button>
          <div className={openFilters.includes(filterCategory) ? 'filter-option-container' : ''}>
          {openFilters.includes(filterCategory) && filters[filterCategory].map((filterValue) => (
            <div className='filter-option' key={filterValue} onClick={() => handleFilterChange(filterCategory, filterValue)}>
              <input
                type="radio"
                id={filterValue}
                name={filterCategory}
                checked={selectedFilters[filterCategory] && selectedFilters[filterCategory].includes(filterValue)}
                onChange={() => handleFilterChange(filterCategory, filterValue)}
              />
              <label htmlFor={filterValue}></label>
              <p>{filterValue}</p>
            </div>
          ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;