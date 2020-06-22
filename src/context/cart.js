// cart context
import React, { useEffect } from 'react';
import reducer from './reducer';


function getCartFromLocalStorage() {
  return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
}

const CartContext = React.createContext();

function CartProvider({ children }) {
  const [cart, dispatch] = React.useReducer(reducer, getCartFromLocalStorage());
  const [total, setTotal] = React.useState(0);
  const [cartItems, setCartItems] = React.useState(0);

  useEffect(() => {
    // local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    // cart items
    let newCartItems = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount)
    }, 0)
    setCartItems(newCartItems);
    // cart total
    let newTotal = cart.reduce((total, cartItem) => {
      return total += cartItem.amount * cartItem.price;
    }, 0)
    newTotal = parseFloat(newTotal.toFixed(2));
    setTotal(newTotal);
  }, [cart]);

  //remove item 
  const removeItem = id => {
    dispatch({ type: "REMOVE", payload: id });
    // setCart([...cart].filter(item => item.id !== id));
  };
  //increase amount 
  const increaseAmount = id => {
    // let newCart = [...cart].map(item => {
    //   return item.id === id ? { ...item, amount: item.amount + 1 } : { ...item }
    // })

    // setCart(newCart);
  };
  //decrease amount 
  const decreaseAmount = (id, amount) => {
    // if (amount === 1) {
    //   removeItem(id);
    //   return;
    // } else {
    //   let newCart = [...cart].map(item => {
    //     return item.id === id ? { ...item, amount: item.amount - 1 } : { ...item }
    //   })

    //   setCart(newCart);
    // }
  };
  //add to cart
  const addToCart = product => {
    // const { id, image, title, price } = product;
    // const item = cart.find(item => item.id === id);
    // if (item) {
    //   increaseAmount(id);
    //   return;
    // } else {
    //   const newItem = { id, image, title, price, amount: 1 };
    //   const newCart = [...cart, newItem];
    //   setCart(newCart);
    // }
  };
  //clear item 
  const clearCart = () => {
    // setCart([]);
  };

  return <CartContext.Provider value={{ cart, total, cartItems, removeItem, increaseAmount, decreaseAmount, addToCart, clearCart }}>
    {children}
  </CartContext.Provider>
}

export { CartContext, CartProvider };