import { Link } from "react-router-dom";
export default function ProductCart({item}) {
  return (
    <div className="product-card" >
      <img src={item.image} className="product-card-image" />
      <h3 className="product-card-title">{item.name}</h3>
      <p className="product-card-price">${item.price}</p>
      <div className="product-card-actions">
        <Link to="/" className="btn btn-secondary">
          View Details
        </Link>
        <button className="btn btn-primary">Add To Cart</button>
      </div>
    </div>
  );
}
