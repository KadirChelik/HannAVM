import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../services/ProductDataService";
import { useCart } from "./CartContext";
import Loading from "./Loading";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";



function ProductDetails() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const [products, setProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  useEffect(() => {
    window.focus();
window.scrollTo(0,0);
    fetchProducts().then((response) => {
      setProducts(response.data);
      const product = response.data.find(
        (product) => product.id === Number(id)
      );
      if (product && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
        const availableSize = product.colors[0].sizes.find(
          (size) => size.stock > 0
        ).name;
        if (availableSize) {
          setSelectedSize(availableSize);
        }
      }
    });
  }, [id]);

  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return <Loading />;
  }

  const handleColorChange = (event) => {
    const colorName = event.target.value;
    const color = product.colors.find((color) => color.name === colorName);
    setSelectedColor(color);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      product: {
        id: `${product.id}-${selectedColor.name}-${selectedSize.name}`,
        name: product.name,
        price: product.price,
        photo1: selectedColor.photos[0],
        photo2: selectedColor.photos[1],
        discountedPrice: product.discountedPrice,
        color: selectedColor,
        size: selectedSize,
      },
    });
  };

  const photos = selectedColor ? selectedColor.photos : [];
  const CustomDot = ({ onClick, active, index }) => {
    return (
      <div
        className={`custom-dot ${active ? "active" : ""}`}
        onClick={() => onClick()}
      >
        <img src={photos[index]} alt={`dot-${index}`} />
      </div>
    );
  };
  const responsive = {
    mobile: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
      slidesToSlide: 1, 
    },
  };
  
  return (
    <div className="product-detail-container">
      <div className="product-detail-img">
      
        <Carousel
          responsive={responsive}
          customDot={<CustomDot />}
          renderButtonGroupOutside={true}
          customTransition="all 1s ease-in-out"
          infinite
          draggable
          swipeable
          minimumTouchDrag={80}
          pauseOnHover
          focusOnSelect={false}
          rewind={false}
          rewindWithAnimation={false}
          shouldResetAutoplay
          rtl={false}
          dotListClass="custom-dot-list-style"
          showDots
          renderDotsOutside
          sliderClass=""
          transitionDuration={1000}
        >
          {photos.map((photo, index) => (
            <img key={index} src={photo} alt="carousel-item" />
          ))}
        </Carousel>
         
      </div>
      <div className="product-details">
        <h2>{product.name}</h2>
        <hr />
        <h5>Ürün Özellikleri</h5>
        <p className="product-detail-desc">{product.description}</p>
        <p>{product.material}</p>
        <hr />
        <h5>Mevcut Seçenekler</h5>
        <div className="product-detail-options">
          <div>
            <div>Beden</div>
            <select id="sizeSelect" onChange={handleSizeChange}>
              {selectedColor.sizes
                .filter((size) => size.stock > 0)
                .map((size, index) => (
                  <option key={index} value={size.name}>
                    {size.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <div>Renk</div>
            <select id="colorSelect" onChange={handleColorChange}>
              {product.colors.map((color, index) => (
                <option key={index} value={color.name}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr />
        <p className="product-detail-price">{product.price} TL</p>

        <button onClick={addToCart} className="product-detail-btn">
          Sepete Ekle
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
