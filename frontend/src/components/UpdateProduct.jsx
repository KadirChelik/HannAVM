import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts} from '../services/ProductDataService';

function UpdateProduct() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    discountedPrice: '',
    brand: '',
    fit: '',
    material:'',
    colors: []
  });

  const [currentColor, setCurrentColor] = useState({
    name: '',
    photos: [],
    sizes: []
  });

  const [currentSize, setCurrentSize] = useState({
    name: '',
    stock: ''
  });

  const fileInputRefs = useRef([React.createRef(), React.createRef(), React.createRef()]);
  const [photos, setPhotos] = useState([null, null, null]);

  useEffect(() => {
    fetchProducts().then(response => setProducts(response.data));
  }, []);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setCurrentColor({
        name: '',
        photos: [],
        sizes: []
      });
      setPhotos([null, null, null]);
    }
  }, [products, id]);

  const handleDrop = (index, e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    previewImage(index, file);
  };

  const handleFileInputChange = (index, e) => {
    const file = e.target.files[0];
    previewImage(index, file);
  };

  const previewImage = (index, file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const newPhotos = [...photos];
      newPhotos[index] = reader.result;
      setPhotos(newPhotos);

      const newColor = { ...currentColor };
      newColor.photos = newPhotos;
      setCurrentColor(newColor);
    };
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setCurrentColor((prevColor) => ({
      ...prevColor,
      [name]: value
    }));
  };

  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setCurrentSize((prevSize) => ({
      ...prevSize,
      [name]: value
    }));
  };

  const handleAddSize = () => {
    setCurrentColor((prevColor) => ({
      ...prevColor,
      sizes: [...prevColor.sizes, currentSize]
    }));
    setCurrentSize({ name: '', stock: '' });
  };

  const handleAddColor = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      colors: [...prevProduct.colors, currentColor]
    }));
    setCurrentColor({ name: '', photos: [], sizes: [] });
    setPhotos([null, null, null]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      alert('Ürün güncellendi!');
  };

  const handleDeleteColor = (colorIndex) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      colors: prevProduct.colors.filter((_, index) => index !== colorIndex)
    }));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form className='addproduct-container' onSubmit={handleSubmit}>
        <div className='addproduct-form'>
          <div className='addproduct-inputs'>
            <div>
              <h6>Ürün Adı</h6>
              <input
                className='addproduct-name'
                type='text'
                name='name'
                value={product.name}
                onChange={handleProductChange}
                placeholder='Örn. Çiçekli Elbise'
              />
            </div>
            <div>
              <h6>Ürün Açıklaması</h6>
              <textarea
                className='addproduct-desc'
                name='description'
                value={product.description}
                onChange={handleProductChange}
                placeholder='Örn. Geniş kesim, çiçek desenli, kısa kollu, yuvarlak yaka, beli lastikli, kemerli, önü düğmeli, kumaş elbise.'
              />
            </div>
            <div>
              <h6>Kategori</h6>
              <input
                className='addproduct-category'
                type='text'
                name='category'
                value={product.category}
                onChange={handleProductChange}
                placeholder='Örn. kadın, elbise, çok satanlar, beyaz, kısakol'
              />
            </div>
            <div>
              <h6>Fiyat</h6>
              <input
                className='addproduct-num'
                type='number'
                name='price'
                value={Number(product.price.replace(',', '.'))}
                onChange={handleProductChange}
                placeholder='Örn. 299,99'
              />
            </div>
            <div>
              <h6>İndirimli Fiyat</h6>
              <input
                className='addproduct-num'
                type='number'
                name='discountedPrice'
                value={Number(product.discountedPrice.replace(',', '.'))}
                onChange={handleProductChange}
                placeholder='Örn. 199,99'
              />
            </div>
            <div>
              <h6>Marka</h6>
              <input
                className='addproduct-category'
                type='text'
                name='brand'
                value={product.brand}
                onChange={handleProductChange}
                placeholder='Örn. Marka Adı'
              />
            </div>
            <div>
              <h6>Kesim</h6>
              <input
                className='addproduct-category'
                type='text'
                name='fit'
                value={product.fit}
                onChange={handleProductChange}
                placeholder='Örn. Slim Fit'
              />
            </div>
            <div>
              <h6>Materyal</h6>
              <input
                className='addproduct-category'
                type='text'
                name='material'
                value={product.material}
                onChange={handleProductChange}
                placeholder='Örn. %75 Pamuk, %25 Polyester'
              />
            </div>
          </div>
          <div className='addproduct-colors'>
            <div>
              <h6>Renk Adı</h6>
              <input
                className='addproduct-color'
                type='text'
                name='name'
                value={currentColor.name}
                onChange={handleColorChange}
                placeholder='Örn. Kırmızı'
              />
            </div>
            <div className='addproduct-imgs'>
              {fileInputRefs.current.map((ref, index) => (
                <div className='addproduct-img' key={index}>
                  <h5>{index + 1}. Resim</h5>
                  <div
                    className='addproduct-dropzone'
                    onDrop={(e) => handleDrop(index, e)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {photos[index] ? (
                      <img src={photos[index]} alt='Preview' style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    ) : (
                      <p>Resmi Buraya Sürükleyip Bırakın veya Dosya Seç Butonuna Tıklayıp Resmi Seçin</p>
                    )}
                  </div>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => handleFileInputChange(index, e)}
                    ref={ref}
                    style={{ display: 'none' }}
                  />
                  <button type='button' onClick={() => ref.current.click()}>
                    Dosya Seç
                  </button>
                </div>
              ))}
            </div>
            <div>
              <h6>Bedenler</h6>
              <div className='addproduct-color-sizes'>
                <input
                  className='addproduct-size-input'
                  type='text'
                  name='name'
                  value={currentSize.name}
                  onChange={handleSizeChange}
                  placeholder='Beden'
                />
                <input
                  className='addproduct-size-input'
                  type='number'
                  name='stock'
                  value={currentSize.stock}
                  onChange={handleSizeChange}
                  placeholder='Stok'
                />
                <button className='addproduct-btn1' type='button' onClick={handleAddSize}>
                  Beden Ekle
                </button>
              </div>
              <ul>
                {currentColor.sizes.map((size, index) => (
                  <li key={index}>
                    {size.name} - {size.stock}
                  </li>
                ))}
              </ul>
            </div>
            <button className='addproduct-btn2' type='button' onClick={handleAddColor}>
              Renk Ekle
            </button>
            <ul className='addproduct-colors-container'>
              {product.colors.map((color, index) => (
                <div key={index}>
                  <div className='addproduct-delete-color'>
                  <h6>{color.name}</h6>
                  <button className='addproduct-delete-btn' type='button' onClick={() => handleDeleteColor(index)}>
                  <span className="fa-solid fa-trash-can"></span>
                  </button>                
                  </div>
                  <div className='addproduct-colors-photos'>
                  {color.photos.map((photo, index) => (
                    <img key={index} src={photo} alt='Preview' className='addproduct-dropzone' />
                  ))}
                  </div>
                  <div  className='addproduct-colors-photos'>
                  {color.sizes.map((size, index) => (
                      <div className='addproduct-colors-sizes' key={index}>
                        {size.name} - {size.stock}
                      </div>
                    ))}
                  </div>
                  
                </div>
                
              ))}
            </ul>
          </div>
        </div>
          <button className='addproduct-btn3' type='submit'>
            Güncelle
          </button>
      </form>
    </div>
  );
}

export default UpdateProduct;
