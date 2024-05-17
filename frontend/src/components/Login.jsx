import React, { useState } from 'react';
import { NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash,faEye  } from '@fortawesome/free-solid-svg-icons'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmail('');
    setPassword('');
  };

  return (
    <div className='sign-in-container'>
      <div className='sign-in-box'>
      <h1>Giriş Yap</h1>
      <form onSubmit={handleSubmit}>
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
       
         <div className='password-field1'>
        <input
            className='sign-in-input '
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Şifrenizi girin'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <span className={`password-icon ${showPassword ? 'show-icon' : ''}`} onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </span>
        <p className='password-p'>Şifremi Unuttum</p>
        </div>
        
        
        <button type="submit">Giriş Yap</button>
      </form>
      <p>Hesabın Yok Mu? <span><NavLink to="/register"> Kayıt Ol</NavLink></span></p>
      </div>
    </div>
  );
};

export default Login;
