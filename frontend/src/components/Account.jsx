import React, { useState, useEffect } from 'react';
import { getUser, updateUser, changePassword } from '../services/UserDataService';

function Account({ authControl, email }) {
  if (!authControl) {
    return (
      <div className='admin-main-container0'>
        <h1>Önce giriş yapmalısınız!</h1>
      </div>
    );
  }
  const [activeTab, setActiveTab] = useState('personalInfo');
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    phone: '',
    addresses: [],
    TCno: '' // TCno alanı eklendi
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser(email);
        setUserData(response.data || {
          name: '',
          surname: '',
          phone: '',
          addresses: [],
          TCno: '' // TCno alanı eklendi
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [email]); // email bağımlılığı eklendi

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleAddressChange = (e, index) => {
    const { name, value } = e.target;
    const updatedAddresses = [...userData.addresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      [name]: value
    };
    setUserData({
      ...userData,
      addresses: updatedAddresses
    });
  };

  const handleAddAddress = () => {
    const newAddress = { title: '', address: '' };
    setUserData({
      ...userData,
      addresses: [...userData.addresses, newAddress]
    });
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = userData.addresses.filter((_, i) => i !== index);
    setUserData({
      ...userData,
      addresses: updatedAddresses
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(userData._id, userData);
      alert('Bilgiler başarıyla güncellendi');
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Bilgileri güncellerken bir hata oluştu');
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await changePassword(userData._id, passwordData.oldPassword, passwordData.newPassword);
      alert('Şifre başarıyla değiştirildi');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Şifre değiştirirken bir hata oluştu');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'personalInfo':
        return (
          <div>
            <form className='personal-info-container' onSubmit={handleSubmit}>
              <div className='personal-info-header'><h5>Kişisel Bilgilerim</h5>
                <hr /></div>
              <div className='personal-info-desc'>
                <p>Siparişlerinizi hızlı ve kolay bir şekilde tamamlamak için bilgilerinizi doldurabilirsiniz.</p>
              </div>
              <div className='personal-info-inputs'>
                <div>
                  <div>İsim</div>
                  <input
                    type="text"
                    name="name"
                    placeholder="İsim"
                    value={userData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <div>Soyisim</div>
                  <input
                    type="text"
                    name="surname"
                    placeholder="Soyisim"
                    value={userData.surname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <div>Telefon Numarası</div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Telefon numarası"
                    value={userData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <div>TC Kimlik Numarası</div> {/* Yeni alan eklendi */}
                  <input
                    type="text"
                    name="TCno"
                    placeholder="TC Kimlik Numarası"
                    value={userData.TCno}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div><button className='admin-btn4' type="submit">Güncelle</button></div>
            </form>
          </div>
        );
      case 'addresses':
        return (
          <div className='personal-adresses-container'>
            <div className='personal-info-header'><h5>Adreslerim</h5>
              <hr /></div>
              <div><p>Herhangi bir değişikliği kaydetmek için "Güncelle" butonuna tıklayınız.</p></div>
            <div>
              {userData.addresses.map((address, index) => (
                <div className='address-box' key={index}>
                  <div className='address-box-icons'>
                    <button onClick={() => handleDeleteAddress(index)}><i className="fa-solid fa-trash-can"></i></button>
                  </div>
                  <div className='address-box-title'> Başlık 
                    <input 
                      type="text" 
                      name="title"
                      onChange={(e) => handleAddressChange(e, index)} 
                      value={address.title} 
                    /> 
                  </div>
                  <div className='address-box-address'> Adres 
                    <input 
                      type="text"
                      name="address"
                      onChange={(e) => handleAddressChange(e, index)} 
                      value={address.address}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className='address-box-buttons'>
              <button className='address-box-button2' onClick={handleSubmit}>Güncelle</button> 
              <button className='address-box-button1' onClick={handleAddAddress}>Adres Ekle</button>
            </div>
          </div>
        );
      case 'orders':
        return <div>Siparişlerim İçeriği</div>;
      case 'changePassword':
        return (
          <div>
            <form className='change-password-container' onSubmit={handlePasswordSubmit}>
              <div className='personal-info-header'><h5>Şifre Değiştir</h5>
                <hr /></div>
              <div className='change-password-inputs'>
                <div>
                  <div>Eski Şifre</div>
                  <input
                    type="password"
                    name="oldPassword"
                    placeholder="Eski Şifre"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div>
                  <div>Yeni Şifre</div>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Yeni Şifre"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </div>
              <div className='change-password-button'><button className='admin-btn4' type="submit">Şifreyi Değiştir</button></div>
            </form>
          </div>
        );
      default:
        return <div>Kişisel Bilgilerim İçeriği</div>;
    }
  };

  return (
    <div className='my-account-container'>
      <div className='my-account-header'>
        <h1>Hoş geldin {userData.name.charAt(0).toUpperCase() + userData.name.slice(1)}! <i className="fa-solid fa-hand-holding-heart"></i></h1>
      </div>
      <div className='my-account-content-container'>
        <div className='my-account-links'>
          <button
            onClick={() => setActiveTab('personalInfo')}
            className={activeTab === 'personalInfo' ? 'active' : ''}
          >
            <i className={`account-icons fa-solid fa-user ${activeTab === 'personalInfo' ? 'active' : ''}`}></i> Kişisel Bilgilerim
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={activeTab === 'addresses' ? 'active' : ''}
          >
            <i className={`account-icons fa-solid fa-location-dot ${activeTab === 'addresses' ? 'active' : ''}`}></i> Adreslerim
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={activeTab === 'orders' ? 'active' : ''}
          >
            <i className={`account-icons fa-solid fa-bag-shopping ${activeTab === 'orders' ? 'active' : ''}`}></i> Siparişlerim
          </button>
          <button
            onClick={() => setActiveTab('changePassword')}
            className={activeTab === 'changePassword' ? 'active' : ''}
          >
            <i className={`account-icons fa-solid fa-gear ${activeTab === 'changePassword' ? 'active' : ''}`}></i> Şifre Değiştirme
          </button>
        </div>
        <div className='my-account-content'>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Account;
