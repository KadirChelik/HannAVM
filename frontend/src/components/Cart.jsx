import {React} from 'react';
import { useCart } from './CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrashCan, faArrowRightLong} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
function Cart() {
    const { cart, dispatch } = useCart();
    console.log(cart);
    const removeFromCart = (id) => {
      dispatch({ type: 'REMOVE_FROM_CART', id });
    };
    const increaseQuantity = (id) => {
      dispatch({ type: 'INCREASE_QUANTITY', id });
    };
  
    const decreaseQuantity = (id) => {
      dispatch({ type: 'DECREASE_QUANTITY', id });
    };
    return (
      <div className='cart'>
        <h1>Sepetim</h1>
        <div className='cart-container'>
          <div className='cart-products-container'>
          {cart.length === 0 ? (
          <h5 className='cart-empty'>Alışveriş Sepetiniz Boş!</h5>
        ) :
          (cart.map((product, index) => (
          <div className='cart-product-box' key={index}>
            <img src={product.photo1} alt="" />
            <div className='cart-right-box'>
            <div className='cart-right-top-box'>
              <h5>{product.name}</h5>
              <button className='cart-trash-button' onClick={() => removeFromCart(product.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
            </div>
            <div className='cart-right-mid-box'>
              <p>Renk: Siyah </p>
              <p>Beden: M</p>
            </div>
            <div className='cart-right-bottom-box'>
            <div className='quantity-box'> <button onClick={() => decreaseQuantity(product.id)}><FontAwesomeIcon icon={faMinus} /></button> <div className='quantity-num'>{product.quantity}</div> <button onClick={() => increaseQuantity(product.id)}><FontAwesomeIcon icon={faPlus} /></button>  </div>
            <div className='cart-price'>{product.price} TL</div>
            </div>
            </div>
          </div>
        )))}
          </div>
          {cart.length > 0 && (
            <>
        <hr/>
        <div className='total-container'>
          <div className='total-top'>
          <div>Toplam Ürün Fiyatı</div>
          <div className='total-price-num'>  
          {cart.reduce((total, product) => {
          const price = Number(product.price.replace(',', '.'));
          const quantity = Number(product.quantity);
          return total + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);
          }, 0).toFixed(2)} TL
          </div>
          </div>
          <div className='total-mid'>
          <div>Kargo Ücreti</div>
          <div className='total-price-num'>49.99 TL</div>
          </div>
          </div>
          <hr/>
          <div className='total-bottom'>
          <div>Toplam</div>
          <div className='total-price-num'>
          {(cart.reduce((total, product) => {
          const price = Number(product.price.replace(',', '.'));
          const quantity = Number(product.quantity);
          return total + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);
          }, 0) + 49.99).toFixed(2)} TL
          </div>
          </div>
          <NavLink to="/payment"><button className='cart-checkout'><div>Ödemeye Geç</div> <FontAwesomeIcon className='checkout-icon' icon={faArrowRightLong} /></button></NavLink> 
          </>
          )}
          </div>
        </div>
    );
  }
  
  export default Cart;