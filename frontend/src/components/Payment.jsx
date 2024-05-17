import React from 'react';

const Payment = () => {
  return (
    <div className='payment-container'>
        <h1>Ödeme Bilgileri</h1>
    <div className="payment">
      <form>
        <div>
          <div>Kart Sahibi</div>
          <input type="text" name="cardholder" placeholder="Kart Sahibinin Adını Girin" />
        </div>
        <div>
          <div>Kart Numarası</div>
          <input type="text" name="cardnumber" placeholder="Kart Numaranızı Girin"/>
        </div>
        <div className='payment-bottom'>
            <div>
                <div>Son Kullanma Tarihi</div>
                <input type="text" name="expirydate" placeholder="AA/YY" />
            </div>
            <div>
                <div>CVV</div>
                <input type="text" name="cvv" placeholder="CVV" />
            </div>
          
        </div>
      </form>
      <button>Ödemeyi Tamamla</button>
    </div>
    </div>
    
  );
};

export default Payment;