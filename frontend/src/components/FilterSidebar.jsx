import React, { useState } from "react";
import ReactSlider from "react-slider";

const FilterSidebar = ({ onFilterChange, products, activeFilters }) => {
  const [openFilters, setOpenFilters] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]); // Varsayılan fiyat aralığı
  const [isModalOpen, setIsModalOpen] = useState(false); // Filtre modalının açık olup olmadığını kontrol eder.

  const generateCategoryFilters = (products) => {
    const categoryCounts = products.reduce((acc, product) => {
      product.category.forEach((cat) => {
        acc[cat] = (acc[cat] || 0) + 1;
      });
      return acc;
    }, {});

    return Object.keys(categoryCounts).map(
      (cat) => `${cat} (${categoryCounts[cat]})`
    );
  };

  const generateSizeFilters = (products) => {
    const sizeCounts = products.reduce((acc, product) => {
      product.colors.forEach((color) => {
        color.sizes.forEach((size) => {
          if (!acc[size.name]) {
            acc[size.name] = { count: 0, totalStock: 0 };
          }
          acc[size.name].count += 1;
          acc[size.name].totalStock += size.stock;
        });
      });
      return acc;
    }, {});

    // Stok sayısı 0 olan bedenleri filtreler listesine eklemiyoruz
    return Object.keys(sizeCounts)
      .filter((size) => sizeCounts[size].totalStock > 0)
      .map((size) => `${size} (${sizeCounts[size].totalStock})`);
  };

  const generateBrandFilters = (products) => {
    const brandCounts = products.reduce((acc, product) => {
      acc[product.brand] = (acc[product.brand] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(brandCounts).map(
      (brand) => `${brand} (${brandCounts[brand]})`
    );
  };

  const generateColorFilters = (products) => {
    const colorCounts = products.reduce((acc, product) => {
      product.colors.forEach((color) => {
        acc[color.name] = (acc[color.name] || 0) + 1;
      });
      return acc;
    }, {});

    return Object.keys(colorCounts).map(
      (color) => `${color} (${colorCounts[color]})`
    );
  };

  const generateFitFilters = (products) => {
    const fitCounts = products.reduce((acc, product) => {
      acc[product.fit] = (acc[product.fit] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(fitCounts).map((fit) => `${fit} (${fitCounts[fit]})`);
  };

  const filters = {
    Kategori: generateCategoryFilters(products),
    Beden: generateSizeFilters(products),
    Marka: generateBrandFilters(products),
    Renk: generateColorFilters(products),
    Fiyat: [],
    Kalıp: generateFitFilters(products),
  };

  const handleFilterChange = (filterCategory, filterValue) => {
    const valueWithoutCount = filterValue.split(" (")[0];
    const isSelected = activeFilters[filterCategory]?.includes(valueWithoutCount);
    const newFilterValues = isSelected
      ? activeFilters[filterCategory].filter(
          (value) => value !== valueWithoutCount
        )
      : [...(activeFilters[filterCategory] || []), valueWithoutCount];

    let updatedFilters = {
      ...activeFilters,
      [filterCategory]: newFilterValues,
    };

    // Eğer bir filtre kategorisinde hiç değer kalmadıysa, bu filtre kategorisini kaldırıyoruz
    if (updatedFilters[filterCategory].length === 0) {
      delete updatedFilters[filterCategory];
    }

    onFilterChange(updatedFilters);
  };

  const toggleFilter = (filterCategory) => {
    if (openFilters.includes(filterCategory)) {
      setOpenFilters(
        openFilters.filter((category) => category !== filterCategory)
      );
    } else {
      setOpenFilters([...openFilters, filterCategory]);
    }
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);

    // Fiyat değişikliğini bildirmek için güncellenmiş filtreleri oluşturun
    const updatedFilters = {
      ...activeFilters,
      Fiyat: value,
    };

    onFilterChange(updatedFilters);
  };

  const handleClearFilters = () => {
    onFilterChange({});
  };

  const handleFilterButtonClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isMobile = window.innerWidth < 768;

  return (
    <>
      {isMobile ? (
      <div className="mobile-filter-container">
        <button className="mobile-filter-button" onClick={handleFilterButtonClick}>
        <i className="fa-solid fa-filter"></i>
        <br />
        Filtrele
      </button>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-modal" onClick={closeModal}><i className="fa-solid fa-xmark"></i></button>
              <div className="modal-filters">
                {Object.keys(activeFilters).length > 0 && (
                  <button className="filter-clean-btn-mobile" onClick={handleClearFilters}>Temizle</button>
                )}
  
                <div className={Object.keys(activeFilters).length > 0 ? "selected-filters" : ""}>
                  {Object.keys(activeFilters).map(
                    (filterCategory) =>
                      activeFilters[filterCategory].length > 0 && (
                        <div key={filterCategory}>
                          <h5>{filterCategory}</h5>
                          <p>
                            {filterCategory === "Fiyat"
                              ? activeFilters[filterCategory].join(" TL - ") + " TL"
                              : activeFilters[filterCategory].join(", ")}
                          </p>
                        </div>
                      )
                  )}
                </div>
                {Object.keys(filters).map((filterCategory) => (
                  <div className="filter-category-container" key={filterCategory}>
                    <button
                      className="filter-header"
                      onClick={() => toggleFilter(filterCategory)}
                    >
                      <h5>{filterCategory}</h5>
                      {openFilters.includes(filterCategory) ? (
                        <i className="fa-solid fa-angle-up"></i>
                      ) : (
                        <i className="fa-solid fa-angle-down"></i>
                      )}
                    </button>
                    <div
                      className={
                        openFilters.includes(filterCategory)
                        ? "filter-option-container"
                        : ""
                      }
                      >
                      {openFilters.includes(filterCategory) &&
                        filterCategory !== "Fiyat" &&
                        filters[filterCategory].map((filterValue) => (
                          <div className="filter-option" key={filterValue}>
                            <input
                              className="ui-checkbox"
                              type="checkbox"
                              id={filterValue}
                              name={filterCategory}
                              checked={
                                !!activeFilters[filterCategory]?.includes(
                                  filterValue.split(" (")[0]
                                )
                              }
                              onChange={() =>
                                handleFilterChange(filterCategory, filterValue)
                              }
                              />
                            <p>{filterValue.charAt(0).toLocaleUpperCase('tr-TR') + filterValue.slice(1)}</p>
                          </div>
                        ))}
                      {openFilters.includes(filterCategory) &&
                        filterCategory === "Fiyat" && (
                          <div className="price-filter">
                            <ReactSlider
                              className="slider1"
                              value={priceRange}
                              min={0}
                              max={10000}
                              step={100}
                              onChange={handlePriceChange}
                              />
                            <div className="price-range">
                              <span>{priceRange[0]} TL</span> -{" "}
                              <span>{priceRange[1]} TL</span>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      
          </div>
      ) : (
        <div className="filter-container">
          {Object.keys(activeFilters).length > 0 && (
            <button className="filter-clean-btn" onClick={handleClearFilters}>
              Temizle
            </button>
          )}

          <div className={Object.keys(activeFilters).length > 0 ? "selected-filters" : ""}>
            {Object.keys(activeFilters).map(
              (filterCategory) =>
                activeFilters[filterCategory].length > 0 && (
                  <div key={filterCategory}>
                    <h5>{filterCategory}</h5>
                    <p>
                      {filterCategory === "Fiyat"
                        ? activeFilters[filterCategory].join(" TL - ") + " TL"
                        : activeFilters[filterCategory].join(", ")}
                    </p>
                  </div>
                )
            )}
          </div>
          {Object.keys(filters).map((filterCategory) => (
            <div className="filter-category-container" key={filterCategory}>
              <button className="filter-header" onClick={() => toggleFilter(filterCategory)}>
                <h5>{filterCategory}</h5>
                {openFilters.includes(filterCategory) ? (
                  <i className="fa-solid fa-angle-up"></i>
                ) : (
                  <i className="fa-solid fa-angle-down"></i>
                )}
              </button>
              <div
                className={
                  openFilters.includes(filterCategory) ? "filter-option-container" : ""
                }
              >
                {openFilters.includes(filterCategory) &&
                  filterCategory !== "Fiyat" &&
                  filters[filterCategory].map((filterValue) => (
                    <div className="filter-option" key={filterValue}>
                      <input
                        className="ui-checkbox"
                        type="checkbox"
                        id={filterValue}
                        name={filterCategory}
                        checked={
                          !!activeFilters[filterCategory]?.includes(
                            filterValue.split(" (")[0]
                          )
                        }
                        onChange={() => handleFilterChange(filterCategory, filterValue)}
                      />
                      <p>
                        {filterValue.charAt(0).toLocaleUpperCase("tr-TR") +
                          filterValue.slice(1)}
                      </p>
                    </div>
                  ))}
                {openFilters.includes(filterCategory) && filterCategory === "Fiyat" && (
                  <div className="price-filter">
                    <ReactSlider
                      className="slider1"
                      value={priceRange}
                      min={0}
                      max={10000}
                      step={100}
                      onChange={handlePriceChange}
                    />
                    <div className="price-range">
                      <span>{priceRange[0]} TL</span> -{" "}
                      <span>{priceRange[1]} TL</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
