import Link from "next/link";
export default function Home(){
  return (
    <div className="hero">
      <h1>Welcome to TRILORA</h1>
      <p>Nutritious, natural, chemical-free food products.</p>
      <Link href="/shop" className="btn">Shop Now</Link>
    </div>
  )
}
