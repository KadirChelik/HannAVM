import React, { useState } from 'react';
import { useCart } from './CartContext';

const Payment = () => {
  const { cart } = useCart();
  const kargoUcreti = 49.99;

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Sepetteki toplam tutarı hesaplayan işlev
  const calculateTotal = () => {
    const total = cart.reduce((total, product) => {
      const price = Number(product.price.replace(",", "."));
      const quantity = Number(product.quantity);
      return total + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);
    }, 0).toFixed(2);

    return Number(total) + kargoUcreti;
  };

  // Ödeme tamamla butonuna tıklanınca çağrılan işlev
  const handlePayment = () => {
    const total = calculateTotal().toFixed(2);
    alert(`Sepetteki toplam tutar: ${total} TL. Kartınızdan ${total} TL ödeme gerçekleşti.`);
  };

  // Kart Numarası formatlama işlevi
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Sadece rakamları al
    value = value.slice(0, 16); // Maksimum 16 rakam al

    // 4 rakamdan sonra boşluk ekle
    const formattedValue = value
      .match(/.{1,4}/g)
      ?.join(' ')
      .trim() || '';

    setCardNumber(formattedValue);
  };

  // Son Kullanma Tarihi formatlama işlevi
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Sadece rakamları al
    if (value.length > 4) value = value.slice(0, 4); // Maksimum 4 rakam al

    // Son kullanma tarihini `MM/YY` formatına çevir
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setExpiryDate(value);
  };

  // CVV kodu değiştirme işlevi
  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Sadece rakamları al
    if (value.length <= 3) {
      setCvv(value); // Maksimum 3 rakam al
    }
  };

  return (
    <div className='payment-container'>
      <h1>Ödeme Bilgileri</h1>
      <div className="payment">
        <form>
          <div>
            <div>Kart Sahibi</div>
            <input type="text" name="cardholder" placeholder="Kart Sahibinin Adını Giriniz" />
          </div>
          <div>
            <div>Kart Numarası</div>
            <input
              type="text"
              name="cardnumber"
              placeholder="Kart Numaranızı Giriniz"
              value={cardNumber}
              onChange={handleCardNumberChange}
              maxLength="19" // `1234 1234 1234 1234` formatı için 19 karakter
            />
          </div>
          <div className='payment-bottom'>
            <div>
              <div>Son Kullanma Tarihi</div>
              <input
                type="text"
                name="expirydate"
                placeholder="AA/YY"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                maxLength="5" // `MM/YY` formatı için 5 karakter
              />
            </div>
            <div>
              <div>CVV</div>
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={cvv}
                onChange={handleCvvChange}
                maxLength="3" // Maksimum 3 karakter
              />
            </div>
          </div>
        </form>
        <button onClick={handlePayment}>Ödemeyi Tamamla</button>
      </div>
    </div>
  );
};

export default Payment;
