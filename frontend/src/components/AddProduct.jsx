import React, { useState, useEffect, useRef } from 'react';
import { addProduct, fetchProducts, getSignedUrl, uploadFileToSignedUrl } from '../services/ProductDataService';

function AddProduct() {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    category: '',
    price: '',
    discountedPrice: '',
    brand: '',
    fit: '',
    material: '',
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
  const [fileUrls, setFileUrls] = useState([null, null, null]);

  useEffect(() => {
    fetchProducts()
      .then(response => {
        const products = response.data;
        const lastProductId = Math.max(...products.map(product => product.id), 0); // Eğer ürün yoksa, 0 dönecek
        setProduct(prevState => ({ ...prevState, id: lastProductId + 1 }));
      })
      .catch(error => {
        console.error('Ürünler alınırken bir hata oluştu!', error);
      });
  }, []);

  const previewImage = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newPhotos = [...photos];
      newPhotos[index] = reader.result;
      setPhotos(newPhotos);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (index, e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const content_type = file.type;
    const key = `test/image/${file.name}`;
    getSignedUrl({ key, content_type })
      .then(response => {
        const newSignedUrls = [...fileUrls];
        newSignedUrls[index] = (response.data.data);
        setFileUrls(newSignedUrls);
        previewImage(index, file);
      })
      .catch(error => {
        console.error('Signed URL alınırken bir hata oluştu!', error);
      });
  };

  const handleFileInputChange = (index, e) => {
    const file = e.target.files[0];
    const content_type = file.type;
    const key = `test/image/${file.name}`;
    getSignedUrl({ key, content_type })
      .then(response => {
        const newSignedUrls = [...fileUrls];
        newSignedUrls[index] = (response.data.data);
        setFileUrls(newSignedUrls);
        previewImage(index, file);
      })
      .catch(error => {
        console.error('Signed URL alınırken bir hata oluştu!', error);
      });
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
    const newColor = { ...currentColor };
    fileUrls.forEach((data, index) => {
    console.log(data);
    })
    newColor.photos = fileUrls.map((data) => data ? data.fileLink : null).filter(url => url);

    fileUrls.forEach((data, index) => {
      if (data) {
        uploadFileToSignedUrl(data.signedUrl, fileInputRefs.current[index].current.files[0], fileInputRefs.current[index].current.files[0].type, null, () => {});
        console.log("Fotoğraflar S3'e yüklendi");
      }
    });

    setProduct((prevProduct) => ({
      ...prevProduct,
      colors: [...prevProduct.colors, newColor]
    }));
    setCurrentColor({ name: '', photos: [], sizes: [] });
    setPhotos([null, null, null]);
  };

  const handleDeleteColor = (index) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      colors: prevProduct.colors.filter((_, i) => i !== index)
    }));
  };

  const handleIncrementSize = (colorIndex, sizeIndex) => {
    const newColors = [...product.colors];
    newColors[colorIndex].sizes[sizeIndex].stock = parseInt(newColors[colorIndex].sizes[sizeIndex].stock, 10) + 1;
    setProduct({ ...product, colors: newColors });
  };

  const handleDecrementSize = (colorIndex, sizeIndex) => {
    const newColors = [...product.colors];
    if (newColors[colorIndex].sizes[sizeIndex].stock > 0) {
      newColors[colorIndex].sizes[sizeIndex].stock -= 1;
      if (newColors[colorIndex].sizes[sizeIndex].stock === 0) {
        newColors[colorIndex].sizes.splice(sizeIndex, 1);
      }
      setProduct({ ...product, colors: newColors });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    addProduct(product)
      .then(response => {
        console.log(response);
        alert('Ürün başarıyla eklendi!');
        setProduct({
          id: '',
          name: '',
          description: '',
          category: '',
          price: '',
          discountedPrice: '',
          brand: '',
          fit: '',
          material: '',
          colors: []
        });
      })
      .catch(error => {
        console.error('Ürün eklenirken bir hata oluştu:', error.response?.data || error.message);
        alert(`Ürün eklenirken bir hata oluştu: ${error.response?.data || error.message}`);
      });
  };

  return (
    <div >
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
                value={product.price}
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
                value={product.discountedPrice}
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
              {product.colors.map((color, colorIndex) => (
                <div key={colorIndex}>
                  <div className='addproduct-delete-color'>
                  <h6>{color.name}</h6>
                  <button className='addproduct-delete-btn' type='button' onClick={() => handleDeleteColor(colorIndex)}>
                  <span className="fa-solid fa-trash-can"></span>
                  </button>                
                  </div>
                  <div className='addproduct-colors-photos'>
                  {color.photos.map((photo, index) => (
                    <img key={index} src={photo} alt='Preview' className='addproduct-dropzone' />
                  ))}
                  </div>
                  <div  className='addproduct-colors-photos'>
                  {color.sizes.map((size, sizeIndex) => (
                      <div className='addproduct-colors-sizes' key={sizeIndex}>
                      <div>{size.name} - {size.stock}</div>
                      <div className='addproduct-size-buttons'>

                      <button type='button' onClick={() => handleIncrementSize(colorIndex, sizeIndex)}>
                        +
                      </button>
                      <button type='button' onClick={() => handleDecrementSize(colorIndex, sizeIndex)}>
                        -
                      </button>
                      </div>
                    </div>
                    ))}
                  </div>
                  
                </div>
                
              ))}
            </ul>
          </div>
        </div>
        <button className='addproduct-btn3' type='submit'>Ürünü Ekle</button>
      </form>
    </div>
  );
}

export default AddProduct;
