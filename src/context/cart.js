// cart context
import React, { useEffect } from 'react';
import localCart from '../utils/localCart';

const CartContext = React.createContext();

function CartProvider({ children }) {
  const [cart, setCart] = React.useState(localCart);
  const [total, setTotal] = React.useState(0);
  const [cartItems, setCartItems] = React.useState(0);

  useEffect(() => {
    // local storage
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
    setCart([...cart].filter(item => item.id !== id));
  };
  //increase amount 
  const increaseAmount = id => {
    let newCart = [...cart].map(item => {
      return item.id === id ? { ...item, amount: item.amount + 1 } : { ...item }
    })

    setCart(newCart);
  };
  //decrease amount 
  const decreaseAmount = (id, amount) => {
    if (amount === 1) {
      removeItem(id);
      return;
    } else {
      let newCart = [...cart].map(item => {
        return item.id === id ? { ...item, amount: item.amount - 1 } : { ...item }
      })

      setCart(newCart);
    }
  };
  //add to cart
  const addToCart = product => { };
  //clear item 
  const clearCart = () => { };

  return <CartContext.Provider value={{ cart, total, cartItems, removeItem, increaseAmount, decreaseAmount, addToCart, clearCart }}>
    {children}
  </CartContext.Provider>
}

export { CartContext, CartProvider };