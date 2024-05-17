import React, { createContext, useReducer, useContext,useEffect } from 'react';

// Cart context
const CartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const existingProductIndex = state.findIndex(product => product.id === action.product.id);
        if (existingProductIndex >= 0) {
          const newState = [...state];
          newState[existingProductIndex].quantity += 1;
          return newState;
        } else {
          return [...state, { ...action.product, quantity: 1 }];
        }
      case 'REMOVE_FROM_CART':
        return state.filter((item) => item.id !== action.id);
      case 'LOAD_CART':
        return action.cart;
      case 'INCREASE_QUANTITY':
      return state.map((item) =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    case 'DECREASE_QUANTITY':
      return state.map(product =>
        product.id === action.id
          ? { ...product, quantity: product.quantity - 1 }
          : product
      ).filter(product => product.quantity > 0);
      default:
        return state;
    }
  };
// Cart provider
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      dispatch({ type: 'LOAD_CART', cart: JSON.parse(storedCart) });
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
