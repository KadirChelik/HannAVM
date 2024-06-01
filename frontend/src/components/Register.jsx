import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { addUser } from '../services/UserDataService';

const Register = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Şifre kontrolü
      if (!validatePassword(password)) {
        setPasswordError('Şifre kriterlere uymuyor');
        return;
      }

      // Kullanıcı verilerini bir nesne olarak oluştur
      const userData = {
        name: name,
        surname: surname,
        email: email,
        password: password
      };

      // Kullanıcıyı kaydetmek için servis fonksiyonunu çağır
      const response = await addUser(userData);
      console.log('Kullanıcı başarıyla kaydedildi:');

      // Başarılı kayıt sonrası state'leri sıfırla
      setName('');
      setSurname('');
      setEmail('');
      setPassword('');
      setPasswordError('');
    } catch (error) {
      console.error('Kayıt işlemi başarısız:', error);
      alert('Kayıt işlemi başarısız!');
    }
  };

  // Şifre kontrol fonksiyonu
  const validatePassword = (password) => {
    const minLength = 8;
    const regex = /^(?=.*[0-9])/;
    return password.length >= minLength && regex.test(password);
  };

  return (
    <div className='sign-in-container'>
      <div className='sign-in-box'>
        <h1>Kayıt Ol</h1>
        <form className='sign-in-form' onSubmit={handleSubmit}>
          <div>
            <input
              className='sign-in-input'
              type="text"
              name='name'
              placeholder='İsim'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              className='sign-in-input'
              type="text"
              name='surname'
              placeholder='Soyisim'
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              className='sign-in-input'
              type="text"
              name='email'
              placeholder='E-posta adresinizi girin'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <div className='password-field'>
              <input
                className='sign-in-input'
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='Şifrenizi oluşturun'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className={`password-icon ${showPassword ? 'show-icon' : ''}`} onClick={togglePasswordVisibility}>
                {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>} 
              </span>
            </div>
            <p className="password-info"><span className='password-error'>{passwordError ? passwordError : ""}</span> Şifre en az 8 karakter içermeli ve en az bir rakam içermelidir.</p>
          </div>
          <button type="submit">Kayıt Ol</button>
        </form>
        <p>Zaten Hesabın Var Mı? <span><NavLink to="/login">Giriş Yap</NavLink></span></p>
      </div>
    </div>
  );
};

export default Register;
