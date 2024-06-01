import React from 'react';
import {NavLink}  from 'react-router-dom';

function Admin({userName,isAdmin}) {
  if (!isAdmin) {
    console.log('isAdmin:', isAdmin);
    return (
      <div className='admin-main-container0'>
        <h1>Yetkili değilsiniz!</h1>
      </div>
    ) // isAdmin false ise, hiçbir şey render etme
  }
  return (<div className='admin-main-container0'>
        <h1>Hoşgeldin {userName}!</h1>
    <div className='admin-main-container'>
        <NavLink to="/admin/order-management">
        <button>
        <i className="fa-solid fa-truck-ramp-box"></i> Sipariş Yönetimi
        </button>
        </NavLink>
        <NavLink to="/admin/user-management">
        <button>
        <i className="fa-solid fa-users"></i> Kullanıcı Yönetimi
        </button>
        </NavLink>
        <NavLink to="/admin/product-management">
        <button>
        <i className="fa-solid fa-boxes-stacked"></i> Ürün Yönetimi
        </button>
        </NavLink>
    </div>
  </div>
    
  )
}

export default Admin