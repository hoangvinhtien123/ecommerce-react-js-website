import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ item }) {
  const { addToCart, cartItems } = useCart();
  const productsInCart = cartItems.find((p) => p.id === item.id);
  const quantity = productsInCart ? productsInCart.quantity : 0;

  return (
    <article className="product-card">
      {/* Image */}
      <div className="product-card-image-wrapper">
        <img src={item.image} alt={item.name} className="product-card-image" />
        {quantity > 0 && (
          <span className="product-card-badge">{quantity} in cart</span>
        )}
      </div>

      {/* Content */}
      <div className="product-card-content">
        {item.category && (
          <p className="product-card-category">{item.category}</p>
        )}
        <h3 className="product-card-name">{item.name}</h3>
        <p className="product-card-price">
          <span className="price-currency">$</span>
          {item.price}
        </p>
        <div className="product-card-actions">
          <Link to={`/product/${item.id}`} className="btn btn-secondary btn-small">
            View Details
          </Link>
          <button
            className="btn btn-primary btn-small"
            onClick={() => addToCart(item.id)}
          >
            {quantity > 0 ? `Add More (${quantity})` : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
