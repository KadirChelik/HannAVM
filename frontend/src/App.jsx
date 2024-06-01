import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Template from "./components/Template";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Register from './components/Register';
import Login from './components/Login';
import Cart from './components/Cart';
import Payment from './components/Payment';
import ProductDetails from './components/ProductDetails';
import Admin from './components/Admin';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import Search from './components/Search';
import SubCategoryPage from './components/SubCategoryPage';
import MainCategoryPage from './components/MainCategoryPage';
import OrderManagement from './components/OrderManagement';
import UserManagement from './components/UserManagement';
import ProductManagement from './components/ProductManagement';
import OrderDetails from './components/OrderDetails';
import Account from './components/Account';
import "./App.css";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [authControl, setAuthControl] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Template isAdmin={isAdmin} setIsAdmin={setIsAdmin} authControl={authControl} setAuthControl={setAuthControl} />}>
        <Route path="/" element={<Home />} />
        <Route path="/indirim" element={<MainCategoryPage />} />
        <Route path="/kadin" element={<MainCategoryPage />} />
        <Route path="/erkek" element={<MainCategoryPage />} />
        <Route path="/cocuk" element={<MainCategoryPage />} />
        <Route path="/aksesuar" element={<MainCategoryPage />} />
        <Route path="/kadin/:category" element={<SubCategoryPage />} />
        <Route path="/erkek/:category" element={<SubCategoryPage />} />
        <Route path="/cocuk/:category" element={<SubCategoryPage />} />
        <Route path="/aksesuar/:category" element={<SubCategoryPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setEmail={setEmail} setUserName={setUserName} setAuthControl={setAuthControl} setIsAdmin={setIsAdmin} />} />
        <Route path="/account" element={<Account email={email} authControl={authControl} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/admin" element={<Admin userName={userName} isAdmin={isAdmin} />} />
        <Route path="/admin/order-management" element={<OrderManagement isAdmin={isAdmin} />} />
        <Route path="/admin/user-management" element={<UserManagement isAdmin={isAdmin} />} />
        <Route path="/admin/product-management" element={<ProductManagement isAdmin={isAdmin}/>} />
        <Route path="/admin/product-management/add-product" element={<AddProduct isAdmin={isAdmin}/>} />
        <Route path="/admin/product-management/update-product/:id" element={<UpdateProduct isAdmin={isAdmin}/>} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
