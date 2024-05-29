import React from 'react';
import ReactDOM from 'react-dom/client';
import Template from "./components/Template";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Register from './components/Register';
import Login from './components/Login';
import Cart from './components/Cart';
import Payment from './components/Payment';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CartProvider } from './components/CartContext';
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
import "./App.css";
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <CartProvider>
    <Routes>
    <Route path="/" element={<Template/>}>
    <Route path="/" element={<Home/>}/>
    <Route path="/indirim" element={<MainCategoryPage/>}/>
    <Route path="/kadin" element={<MainCategoryPage/>}/>
    <Route path="/erkek" element={<MainCategoryPage/>}/>
    <Route path="/cocuk" element={<MainCategoryPage/>}/>
    <Route path="/aksesuar" element={<MainCategoryPage/>}/>
    <Route path="/kadin/:category" element={<SubCategoryPage/>}/>
    <Route path="/erkek/:category" element={<SubCategoryPage/>}/>
    <Route path="/cocuk/:category" element={<SubCategoryPage/>}/>
    <Route path="/aksesuar/:category" element={<SubCategoryPage/>}/>
    <Route path="/search" element={<Search/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/payment" element={<Payment/>}/>
    <Route path="/product/:id" element={<ProductDetails/>}/>
    <Route path="/admin" element={<Admin/>}/>
    <Route path="/admin/order-management" element={<OrderManagement/>}/>
    <Route path="/admin/user-management" element={<UserManagement/>}/>
    <Route path="/admin/product-management" element={<ProductManagement/>}/>
    <Route path="/admin/product-management/add-product" element={<AddProduct/>}/>
    <Route path="/admin/product-management/update-product/:id" element={<UpdateProduct/>}/>
    <Route path="*" element={<PageNotFound/>} />
    </Route>
    </Routes>
  </CartProvider>
  </BrowserRouter>
)
