import ProductCard from "../components/ProductCard";
import { getProducts } from "../data/product";
import { Link } from "react-router-dom";

export default function Home() {
  const products = getProducts();

  return (
    <div className="page">
      {/* Hero */}
      <section className="home-hero">
        <p className="home-hero-eyebrow">New Collection 2026</p>
        <h1 className="home-title">
          Discover Products You'll <span>Love</span>
        </h1>
        <p className="home-subtitle">
          Curated picks, unbeatable prices. Shop thousands of top-quality products
          delivered straight to your door.
        </p>
        <div className="home-hero-actions">
          <Link to="/checkout" className="btn btn-primary btn-large">
            Shop Now
          </Link>
          <a href="#products" className="btn btn-secondary btn-large">
            Browse All
          </a>
        </div>
      </section>

      {/* Product Listing */}
      <section id="products" className="container">
        <div className="section-header">
          <h2 className="page-title">Our Products</h2>
          <p className="section-subtitle">{products.length} items available</p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard item={product} key={product.id} />
          ))}
        </div>
      </section>
    </div>
  );
}
