import React, { useState } from 'react';
import { useCart } from './CartContext';

const Payment = () => {
  const { cart } = useCart();
  const kargoUcreti = 49.99;

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholder, setCardholder] = useState('');
  const [errors, setErrors] = useState({});

  const calculateTotal = () => {
    const total = cart.reduce((total, product) => {
      const price = Number(product.price.replace(",", "."));
      const quantity = Number(product.quantity);
      return total + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);
    }, 0).toFixed(2);

    return Number(total) + kargoUcreti;
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const total = calculateTotal().toFixed(2);
      alert(`Sepetteki toplam tutar: ${total} TL. Kartınızdan ${total} TL ödeme gerçekleşti.`);
    } else {
      alert('Lütfen tüm alanları doğru şekilde doldurunuz.');
    }
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 16);
    const formattedValue = value.match(/.{1,4}/g)?.join(' ').trim() || '';
    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setExpiryDate(value);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!cardholder) {
      newErrors.cardholder = 'Kart sahibi adı gereklidir.';
    }
    if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Geçerli bir kart numarası giriniz.';
    }
    if (!expiryDate || expiryDate.length !== 5 || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = 'Son kullanma tarihi AA/YY formatında olmalıdır.';
    }
    if (!cvv || cvv.length !== 3) {
      newErrors.cvv = 'Geçerli bir CVV kodu giriniz.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='payment-container'>
      <h1>Ödeme Bilgileri</h1>
      <div className="payment">
        <form onSubmit={handlePayment}>
          <div>
            <div>Kart Sahibi</div>
            <input
              type="text"
              name="cardholder"
              placeholder="Kart Sahibinin Adını Giriniz"
              value={cardholder}
              onChange={(e) => setCardholder(e.target.value)}
              required
            />
            {errors.cardholder && <span className="error">{errors.cardholder}</span>}
          </div>
          <div>
            <div>Kart Numarası</div>
            <input
              type="text"
              name="cardnumber"
              placeholder="Kart Numaranızı Giriniz"
              value={cardNumber}
              onChange={handleCardNumberChange}
              maxLength="19"
              required
            />
            {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
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
                maxLength="5"
                required
              />
              {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}
            </div>
            <div>
              <div>CVV</div>
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={cvv}
                onChange={handleCvvChange}
                maxLength="3"
                required
              />
              {errors.cvv && <span className="error">{errors.cvv}</span>}
            </div>
          </div>
          <button type="submit">Ödemeyi Tamamla</button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
