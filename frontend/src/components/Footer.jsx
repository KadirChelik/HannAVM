import React from 'react'
import "../App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faLocationDot} from '@fortawesome/free-solid-svg-icons'
import { faCopyright} from '@fortawesome/free-regular-svg-icons'
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
export default function Footer() {
  return (
    <div className='my-footer'>
      <div className='my-footer-container section-padding'>
        <div className='my-footer-links'>
          <div className='my-footer-links-div'>
            <h4>Site Haritası</h4>
            <a href="/kadin">
              <p>Kadın Giyim</p>
            </a>
            <a href="/erkek">
              <p>Erkek Giyim</p>
            </a>
            <a href="/cocuk">
              <p>Çocuk Giyim</p>
            </a>
            <a href="/aksesuar">
              <p>Aksesuarlar</p>
            </a>
            <a href="/cok-satanlar">
              <p>Çok Satanlar</p>
            </a>
            <a href="/indirimdekiler">
              <p>İndirimdekiler</p>
            </a>
            <a href="/yeni-urunler">
              <p>Yeni Ürünler</p>
            </a>
          </div>
          <div className='my-footer-links-div'>
            <h4>Markalarımız</h4>
              <p>Koton</p>
              <p>U.S. POLO ASSN.</p>
              <p>Süvari</p>
              <p>Dockers</p>
              <p>LTB</p>
              <p>Kinetix</p>
              <p>Şimal</p>
              <p>Polaris</p>
              <p>Lumberjack</p>
            
          </div>
          <div className='my-footer-links-div'>
            <h4>Destek</h4>
            <a href="/hakkimizda">
              <p>Hakkımızda</p>
            </a>
            <a href="/kargo-ve-iade">
              <p>Kargo ve İade</p>
            </a>
            <a href="/cerezler">
              <p>Çerezler</p>
            </a>
            
          </div>
          <div className='my-footer-links-div'>
            <h4>Bize Ulaşın</h4>
            
              <p><FontAwesomeIcon className='my-footer-icon' icon={faPhone} /> (0256) 811 08 11</p>
            
            
              <p><FontAwesomeIcon className='my-footer-icon' icon={faEnvelope} /> didimhannavm@gmail.com</p>
            
            <a href="https://www.instagram.com/hannavmdidim/" target='_blank'>
              <p><FontAwesomeIcon className='my-footer-icon' icon={faInstagram} /> Instagram</p>
            </a>
            <a href="https://www.facebook.com/profile.php?id=100070033564682">
              <p><FontAwesomeIcon className='my-footer-icon' icon={faFacebook} /> Facebook</p>
            </a>
          </div>
          <div className='my-footer-links-div'>
            <h4>Mağaza Konumu <FontAwesomeIcon icon={faLocationDot} /></h4>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.5584187824525!2d27.26371927537724!3d37.37662423499612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14be812a821133f9%3A0xe44a6c3bbf17f326!2sHann%20avm%20Didim!5e0!3m2!1str!2str!4v1712735127785!5m2!1str!2str" 
            width="230" 
            height="150" 
            style={{border: "0"}}
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
            </iframe>
           
          </div>
        </div>
        <center><hr></hr></center>

        <div className='my-footer-below'>
          <div className='my-footer-copyright'>
            <p>2024 Didim Hann AVM <FontAwesomeIcon icon={faCopyright} style={{color: "#ffffff"}}  /> - Bütün hakları Saklıdır.</p>
          </div>
          <div className='my-footer-below-links'>
            <a href="/terms"><div><p>Gizlilik Sözleşmesi</p></div></a>
            <a href="/terms"><div><p>Kullanıcı Sözleşmesi</p></div></a>
            <a href="/terms"><div><p>Mesafeli Satış Sözleşmesi</p></div></a>
          </div>
        </div>
      </div>
    </div>
  )
}
