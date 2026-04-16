
import ProductCart from "../components/ProductCard";
import { getProducts } from "../data/product";

export default function Home() {
  const products = getProducts();
  return (
    <div className="page">
      <div className="home-hero">
        <h1 className="home-title">Welome to Shop Hub</h1>
        <p className="home-subtitle">
          Discover amazing products at great prices
        </p>
      </div>
      <div className="container">
        <h2 className="page-title">Our Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCart item = {product} key={product.id}/>
          ))}
        </div>
      </div>
    </div>
  );
}
