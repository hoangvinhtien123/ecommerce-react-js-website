import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Checkout() {
  const {
    getCartItemsWithProducts,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    clearCart,
  } = useCart();

  const cartItems = getCartItemsWithProducts();
  const total = getCartTotal();
  const shipping = total > 50 ? 0 : 4.99;
  const finalTotal = total + shipping;

  function placeOrder() {
    clearCart();
  }

  if (cartItems.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🛒</div>
            <h2 className="empty-state-title">Your cart is empty</h2>
            <p className="empty-state-text">
              Looks like you haven't added anything yet.
            </p>
            <Link to="/" className="btn btn-primary btn-large">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>

        <div className="checkout-container">
          {/* Items */}
          <div className="checkout-items">
            <h2 className="checkout-section-title">Order Summary</h2>

            {cartItems.map((item) => (
              <div className="checkout-item" key={item.id}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="checkout-item-image"
                />
                <div className="checkout-item-details">
                  <h3 className="checkout-item-name">{item.product.name}</h3>
                  <p className="checkout-item-price">
                    ${item.product.price} each
                  </p>
                </div>
                <div className="checkout-item-controls">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      −
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      aria-label="Increase quantity"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="checkout-item-total">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    className="btn btn-danger btn-small"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Panel */}
          <div className="checkout-summary">
            <h2 className="checkout-section-title">Payment Summary</h2>

            <div className="checkout-total">
              <p className="checkout-total-label">Subtotal</p>
              <p className="checkout-total-value">${total.toFixed(2)}</p>
            </div>

            <div className="checkout-total">
              <p className="checkout-total-label">
                Shipping
                {shipping === 0 && (
                  <span className="checkout-free-badge">FREE</span>
                )}
              </p>
              <p className="checkout-total-value">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </p>
            </div>

            <div className="checkout-total">
              <p className="checkout-total-label">Total</p>
              <p className="checkout-total-value checkout-total-final">
                ${finalTotal.toFixed(2)}
              </p>
            </div>

            {shipping > 0 && (
              <p className="checkout-shipping-note">
                🚚 Add ${(50 - total).toFixed(2)} more for free shipping
              </p>
            )}

            <button
              className="btn btn-primary btn-large btn-block"
              onClick={placeOrder}
            >
              Place Order
            </button>

            <Link to="/" className="checkout-continue-link">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
