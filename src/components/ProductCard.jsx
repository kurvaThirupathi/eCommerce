import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleWishlist } from "../store";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector(s => s.wishlist);
  const wished = wishlist.some(x => x.id === product.id);

  return (
    <article className="card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.title} className="product-image" />
        <button
          className="heart"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => dispatch(toggleWishlist(product))}
        >
          {wished ? "♥" : "♡"}
        </button>
      </div>
      <div className="card-body">
        <span className="category">{product.category}</span>
        <h3>{product.title}</h3>
        <p className="muted">{product.description}</p>
        <div className="rating">★ {product.rating}</div>
        <strong>₹{product.price.toLocaleString("en-IN")}</strong>
        <div className="card-actions">
          <Link className="btn secondary" to={`/products/${product.id}`}>View</Link>
          <button className="btn primary" onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
