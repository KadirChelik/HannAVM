import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt,faRotateLeft,faTruckFast,faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCreditCard } from '@fortawesome/free-regular-svg-icons'


function ShoppingInfo() {
  return (
    <div className='info-container'>
        <div className='info-box'>
            
            <div className='box-top'>
            <span className='box-icon'><FontAwesomeIcon icon={faShirt} />
            <span className='box-icon2'><FontAwesomeIcon icon={faRotateLeft} /></span></span>
                <h5>Ürünlerimizde 15 Gün Ücretsiz Değişim</h5>
            </div>
            <hr />
            <div className='box-bottom'>
                <p>Teslim Aldığınız Ürünlerde Anında Değişim </p>
            </div>
            
            
            
        </div>
        <div className='info-box'>
            
            <div className='box-top'>
            <span className='box-icon'><FontAwesomeIcon icon={faCreditCard} /></span>
                <h5>Kapıda Ödeme Seçeneği</h5>
            </div>
            <hr />
            <div className='box-bottom'>
                <p>Farklı Ödeme Seçenekleri ile Ödeme Kolaylığı</p>
            </div>
            
            
            
        </div>
        <div className='info-box'>
            
            <div className='box-top'>
            <span className='box-icon'><FontAwesomeIcon icon={faCircleCheck} /></span>
                <h5>20 Yıllık Güvence</h5>
            </div>
            <hr />
            <div className='box-bottom'>
                <p>20 Yıldır Müşteri Memnuniyeti İçin Çalışıyoruz</p>
            </div>
            
            
            
        </div>
        <div className='info-box'>
            
            <div className='box-top'>
            <span className='box-icon'><FontAwesomeIcon icon={faTruckFast} /></span>
                <h5>İlk Siparişe Ücretsiz Kargo</h5>
            </div>
            <hr />
            <div className='box-bottom'>
                <p>Üye Olarak Verilen İlk Siparişte Kargo Ücretsiz</p>
            </div>
            
            
            
        </div>
    </div>
  )
}

export default ShoppingInfo