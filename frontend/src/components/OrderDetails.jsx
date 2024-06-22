import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; // useHistory yerine useNavigate kullanılıyor

function OrderDetails() {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate(); // useNavigate kullanarak yönlendirme yapacağız

  const handleSubmit = (event) => {
    event.preventDefault();

    // Tüm alanların doldurulup doldurulmadığını kontrol et
    if (fullName && address && phoneNumber) {
      console.log('Teslim Alacak Kişi:', { fullName, address, phoneNumber });

      // Yönlendirme işlemi
      navigate('/payment');

      // Alanları temizle
      setFullName('');
      setAddress('');
      setPhoneNumber('');
    } else {
      alert('Lütfen tüm bilgileri doldurunuz.');
    }
  };

  return (
    <div className='payment-container'>
      <h1>Gönderim Bilgileri</h1>
      <div className="payment">
        <form onSubmit={handleSubmit}>
          <div>
            <div>İsim Soyisim</div>
            <input
              type="text"
              name="fullname"
              placeholder="Teslim Alacak Kişinin İsim Soyismini Giriniz"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <div>Adres</div>
            <input
              type="text"
              name="address"
              placeholder="Teslim Alacak Kişinin Adresini Giriniz"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <div>Telefon Numarası</div>
            <input
              type="text"
              name="phonenumber"
              placeholder="Teslim Alacak Kişinin Telefon Numarasını Giriniz"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className='cart-checkout-container1'>
            <button className="cart-checkout1" type="submit">
              <div>Ödemeye Geç</div>
              <i className="checkout-icon fa-solid fa-arrow-right-long"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderDetails;
