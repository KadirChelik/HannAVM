import React, { useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/ProductDataService";
import { productReducer, initialState } from '../services/ProductReducer';
import { useCart } from "./CartContext";
import Loading from "./Loading";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function ProductDetails() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [state, dispatchState] = useReducer(productReducer, initialState);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    dispatchState({ type: 'FETCH_INIT' });
    getProduct(id)
      .then(response => {
        dispatchState({ type: 'FETCH_PRODUCT', payload: response.data });
      })
      .catch(error => {
        console.error('There was an error!', error);
        dispatchState({ type: 'FETCH_FAILURE' });
      });
  }, [id]);

  useEffect(() => {
    const product = state.product;
    if (product) {
      if (product.colors.length > 0) {
        const initialColor = product.colors[0];
        setSelectedColor(initialColor);
        const availableSize = initialColor.sizes.find(size => size.stock > 0)?.name;
        if (availableSize) {
          setSelectedSize(availableSize);
        }
      }
    }
  }, [state.product]);

  const product = state.product;

  useEffect(() => {
    if (selectedColor) {
      const preloadImages = selectedColor.photos.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      Promise.all(preloadImages)
        .then(() => setImagesLoaded(true))
        .catch(err => console.error('Failed to preload images', err));
    }
  }, [selectedColor]);

  if (!product) {
    return <Loading />;
  }

  const handleColorChange = (event) => {
    const colorName = event.target.value;
    const color = product.colors.find(color => color.name === colorName);
    setSelectedColor(color);
    setImagesLoaded(false); // Reset image load state
    const availableSize = color.sizes.find(size => size.stock > 0)?.name;
    if (availableSize) {
      setSelectedSize(availableSize);
    } else {
      setSelectedSize(null);
    }
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      product: {
        id: `${product.id}-${selectedColor.name}-${selectedSize}`,
        name: product.name,
        price: product.price,
        photo1: selectedColor.photos[0],
        photo2: selectedColor.photos[1],
        discountedPrice: product.discountedPrice,
        color: selectedColor.name,
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
        {imagesLoaded ? (
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
        ) : (
          <Loading />
        )}
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
            <select id="sizeSelect" onChange={handleSizeChange} value={selectedSize || ''}>
              {selectedColor && selectedColor.sizes
                .filter(size => size.stock > 0)
                .map((size, index) => (
                  <option key={index} value={size.name}>
                    {size.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <div>Renk</div>
            <select id="colorSelect" onChange={handleColorChange} value={selectedColor?.name || ''}>
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
