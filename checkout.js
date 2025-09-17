import { useCart } from "../utils/CartContext";
import axios from "axios";
import { useState } from "react";

export default function Checkout(){
  const { cart, total, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  async function pay(){
    const orderRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/create`, {
      products: cart, customer:{ name, phone, address }, amount: total
    });
    const orderId = orderRes.data.order._id;

    const razorOrder = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/razorpay/create-order`, {
      amount: total*100, orderRef: orderId
    });

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: razorOrder.data.order.amount,
      currency:"INR",
      name:"TRILORA",
      description:"Checkout",
      order_id: razorOrder.data.order.id,
      handler: function (res) {
        alert("Payment Successful! " + res.razorpay_payment_id);
        clearCart();
      },
      prefill: { name, contact:phone }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  return (
    <div>
      <h1>Checkout</h1>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>
      <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)}/>
      <textarea placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)}/>
      <h2>Total: ₹{total}</h2>
      <button onClick={pay}>Pay Now</button>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  )
}
