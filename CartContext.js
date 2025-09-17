import { createContext, useState, useContext } from "react";
const CartContext = createContext();

export function CartProvider({children}){
  const [cart, setCart] = useState([]);

  function addToCart(product){
    setCart(prev=>{
      const exist = prev.find(p=>p.id===product.id);
      if(exist) return prev.map(p=>p.id===product.id ? {...p, qty:p.qty+1} : p);
      return [...prev, {...product, qty:1}];
    });
  }
  function removeFromCart(id){ setCart(cart.filter(p=>p.id!==id)); }
  function clearCart(){ setCart([]); }
  const total = cart.reduce((sum,p)=> sum+p.price*p.qty,0);

  return <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, total}}>
    {children}
  </CartContext.Provider>
}
export const useCart = ()=> useContext(CartContext);
