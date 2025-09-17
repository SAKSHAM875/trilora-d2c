import Link from "next/link";
import { useCart } from "../utils/CartContext";

export default function Cart(){
  const { cart, removeFromCart, total } = useCart();
  return (
    <div>
      <h1>Your Cart</h1>
      {cart.map(p=>(
        <div key={p.id}>
          {p.name} x {p.qty} = ₹{p.price*p.qty}
          <button onClick={()=>removeFromCart(p.id)}>Remove</button>
        </div>
      ))}
      <h2>Total: ₹{total}</h2>
      <Link href="/checkout">Proceed to Checkout</Link>
    </div>
  )
}
