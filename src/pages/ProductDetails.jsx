import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getProductById } from "../data/product";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = getProductById(id);
    if (!foundProduct) {
      navigate("/");
      return;
    }
    setProduct(foundProduct);
  }, [id]);

  if (!product) return null;

  const productsInCart = cartItems.find((p) => p.id === product.id);
  const quantity = productsInCart ? productsInCart.quantity : 0;

  return (
    <div className="page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        <div className="product-detail">
          {/* Image */}
          <div className="product-detail-image">
            <div className="product-detail-image-wrapper">
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          {/* Info */}
          <div className="product-detail-info">
            {product.category && (
              <p className="product-detail-category">{product.category}</p>
            )}

            <h1 className="product-detail-name">{product.name}</h1>

            <p className="product-detail-price">${product.price}</p>

            <div className="product-detail-divider" />

            <p className="product-detail-description">{product.description}</p>

            <div className="product-detail-actions">
              <button
                className="btn btn-primary btn-large btn-block"
                onClick={() => addToCart(product.id)}
              >
                {quantity > 0
                  ? `Add More — ${quantity} in Cart`
                  : "Add to Cart"}
              </button>
              <Link to="/checkout" className="btn btn-secondary btn-large btn-block">
                Go to Checkout
              </Link>
            </div>

            <div className="product-detail-meta">
              <p><span>SKU:</span> #{String(product.id).padStart(4, "0")}</p>
              <p><span>Availability:</span> In Stock</p>
              <p><span>Free shipping</span> on orders over $50</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
