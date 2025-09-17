import Link from "next/link";
import { useCart } from "../utils/CartContext";

const products = [
  { id:1, name:"Ghee", price:500, image:"/images/ghee.jpg" },
  { id:2, name:"Cow Ghee", price:550, image:"/images/cow-ghee.jpg" },
  { id:3, name:"Butter", price:300, image:"/images/butter.jpg" }
];

export default function Shop(){
  const { addToCart } = useCart();
  return (
    <div>
      <h2>Our Products</h2>
      <div className="grid">
        {products.map(p=>(
          <div key={p.id} className="card">
            <img src={p.image} alt={p.name}/>
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={()=>addToCart(p)}>Add to Cart</button>
            <Link href={`/product/${p.id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
