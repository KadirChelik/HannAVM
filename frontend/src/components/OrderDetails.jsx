import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

function OrderDetails() {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Teslim Alacak Kişi:', { fullName, address, phoneNumber });
    setFullName('');
    setAddress('');
    setPhoneNumber('');
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
          <NavLink to="/payment">
              <button onClick={handleSubmit} className="cart-checkout">
                <div>Ödemeye Geç</div>{" "}
                <i className="checkout-icon fa-solid fa-arrow-right-long"></i>
              </button>
            </NavLink>
        </form>
      </div>
    </div>
  );
}

export default OrderDetails;
