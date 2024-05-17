import React, { useState, useRef } from 'react';

function AddProduct() {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const fileInput1 = useRef();
    const fileInput2 = useRef();
    const fileInput3 = useRef();
  
    const handleDrop = (setImage, e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      previewImage(setImage, file);
    };
  
    const handleFileInputChange = (setImage, e) => {
      const file = e.target.files[0];
      previewImage(setImage, file);
    };
  
    const previewImage = (setImage, file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    };

  return (
    <div className='addproduct-container'>
    <div className='addproduct-imgs'>
    <div className='addproduct-img'>
            <h5>1. Resim</h5>
      <div
        className='addproduct-dropzone'
        onDrop={(e) => handleDrop(setImage1, e)}
        onDragOver={(e) => e.preventDefault()}
      >
        {image1 ? (
          <img src={image1} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        ) : (
          <p>Resmi Buraya Sürükleyip Bırakın veya Dosya Seç Butonuna Tıklayıp Resmi Seçin </p>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileInputChange(setImage1, e)}
        ref={fileInput1}
        style={{ display: 'none' }}
      />
      <button type="button" onClick={() => fileInput1.current.click()}>
        Dosya Seç
      </button>
    </div>
    <div className='addproduct-img'>
        <h5>2. Resim</h5>
      <div
        className='addproduct-dropzone'
        onDrop={(e) => handleDrop(setImage2, e)}
        onDragOver={(e) => e.preventDefault()}
      >
        {image2 ? (
          <img src={image2} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        ) : (
          <p>Resmi Buraya Sürükleyip Bırakın veya Dosya Seç Butonuna Tıklayıp Resmi Seçin </p>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileInputChange(setImage2, e)}
        ref={fileInput2}
        style={{ display: 'none' }}
      />
      <button type="button" onClick={() => fileInput2.current.click()}>
        Dosya Seç
      </button>
    </div>
    <div className='addproduct-img'>
        <h5>3. Resim</h5>
      <div
        className='addproduct-dropzone'
        onDrop={(e) => handleDrop(setImage3, e)}
        onDragOver={(e) => e.preventDefault()}
      >
        {image3 ? (
          <img src={image3} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        ) : (
          <p>Resmi Buraya Sürükleyip Bırakın veya Dosya Seç Butonuna Tıklayıp Resmi Seçin </p>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileInputChange(setImage3, e)}
        ref={fileInput3}
        style={{ display: 'none' }}
      />
      <button type="button" onClick={() => fileInput3.current.click()}>
        Dosya Seç
      </button>
    </div>
    </div>
        
    <div className='addproduct-inputs'>
        <div>
            <h6>Ürün Adı</h6>
        <input className='addproduct-name' type="text" placeholder="Örn. Çiçekli Elbise" />
        </div>
        <div>
            <h6>Ürün Açıklaması</h6>
        <textarea className='addproduct-desc' type="text" placeholder="Örn. Geniş kesim, çiçek desenli, kısa kollu, yuvarlak yaka, beli lastikli, kemerli, önü düğmeli, kumaş elbise." />
        </div>
        <div>
            <h6>Kategori</h6>
        <input className='addproduct-category' type="text" placeholder="Örn. kadın, elbise, çok satanlar, beyaz, kısakol" />
        </div>
        <div>
            <h6>Stok Adedi</h6>    
        <input className='addproduct-num' type="number" placeholder="Örn. 32" />
        </div>
        <div>
            <h6>Fiyat</h6>
        <input className='addproduct-num' type="number" placeholder="Örn. 299,99" />
        </div>
        <button type="button">Ürünü Ekle</button>
    </div>
    </div>
  );
}

export default AddProduct;
