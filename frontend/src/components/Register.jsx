import React, { useState } from 'react';
import { NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash,faEye  } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
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
      <h1>Kayıt Ol</h1>
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
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </span>
        </div>
        </div>
        <button type="submit">Kayıt Ol</button>
      </form>
      <p>Zaten Hesabın Var Mı? <span><NavLink to="/login">Giriş Yap</NavLink></span></p>
      </div>
    </div>
  );
};

export default Register;
