import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
export default function ProductCard({ item }) {
  const { addToCart, cartItems } = useCart();
  const productsInCart = cartItems.find((p) => p.id === item.id)
  const productQuantityLabel = productsInCart ? `${productsInCart.quantity}` : "";
  return (
    <div className="product-card">
      <img src={item.image} alt={item.name} className="product-card-image" />
      <h3 className="product-card-title">{item.name}</h3>
      <p className="product-card-price">${item.price}</p>
      <div className="product-card-actions">
        <Link to={`/product/${item.id}`} className="btn btn-secondary">
          View Details
        </Link>
        <button className="btn btn-primary" onClick={() => addToCart(item.id)}>
          Add To Cart ({productQuantityLabel})
        </button>
        
      </div>
    </div>
  );
}
