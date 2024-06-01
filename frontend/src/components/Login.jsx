import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { login } from '../services/UserDataService'; 

const Login = ({setEmail,setUserName,setAuthControl, setTokenCtrl,setIsAdmin }) => {
  const [emailState, setEmailState] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Giriş yapılıyor...');
      const UserData = {
        email: emailState,
        password: password,
      };
      const response = await login(UserData);

      console.log("Giriş başarılı");
      
      const name = response.data.name;
        const capitalizedFirstName = name.charAt(0).toUpperCase() + name.slice(1);
      if (response.data.role === 'admin') {
        setIsAdmin(true);
        setAuthControl(true);
        setUserName(capitalizedFirstName);
        setEmail(response.data.email);
        navigate('/admin');
      } else {
        setAuthControl(true);
        setIsAdmin(false);
        setEmail(response.data.email);
        navigate('/account');
      }

    } catch (error) {
      console.error('Giriş Başarısız:', error);
      alert('Giriş Başarısız!');
    }
  };

  return (
    <div className='sign-in-container'>
      <div className='sign-in-box'>
        <h1>Giriş Yap</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className='sign-in-input'
              type='text'
              name='email'
              placeholder='E-posta adresinizi girin'
              value={emailState}
              onChange={(e) => setEmailState(e.target.value)}
              required
            />
          </div>
          <div className='password-field1'>
            <input
              className='sign-in-input'
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Şifrenizi girin'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className={`password-icon ${showPassword ? 'show-icon' : ''}`} onClick={togglePasswordVisibility}>
              {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>} 
            </span>
            <p className='password-p'>Şifremi Unuttum</p>
          </div>
          <button type='submit'>Giriş Yap</button>
        </form>
        <p>
          Hesabın Yok Mu? <span><NavLink to='/register'> Kayıt Ol</NavLink></span>
        </p>
      </div>
    </div>
  );
};

export default Login;
