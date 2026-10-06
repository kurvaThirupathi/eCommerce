import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleWishlist } from "../store";

export default function Wishlist() {
  const items = useSelector(s => s.wishlist);
  const dispatch = useDispatch();

  if (!items.length) return <div className="empty"><h1>Your wishlist is empty</h1></div>;

  return (
    <section>
      <h1>Wishlist</h1>
      <div className="product-grid">
        {items.map(item => (
          <article className="card" key={item.id}>
            <img className="product-image" src={item.image} alt={item.title} />
            <div className="card-body">
              <h3>{item.title}</h3>
              <strong>₹{item.price.toLocaleString("en-IN")}</strong>
              <div className="card-actions">
                <button className="btn primary" onClick={() => dispatch(addToCart(item))}>Move to Cart</button>
                <button className="btn secondary" onClick={() => dispatch(toggleWishlist(item))}>Remove</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
