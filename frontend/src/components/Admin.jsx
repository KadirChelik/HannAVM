import React from 'react';
import {NavLink}  from 'react-router-dom';

function Admin() {
  return (
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
  )
}

export default Admin