import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, toggleWishlist } from "../store";
import { products } from "../data/products";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  if (!product) return <div className="empty"><h2>Product not found</h2><Link to="/products">Back to products</Link></div>;

  const add = () => {
    for (let i = 0; i < quantity; i++) dispatch(addToCart(product));
  };

  return (
    <section className="details">
      <img src={product.image} alt={product.title} />
      <div>
        <span className="category">{product.category}</span>
        <h1>{product.title}</h1>
        <div className="rating">★ {product.rating}</div>
        <h2>₹{product.price.toLocaleString("en-IN")}</h2>
        <p>{product.description}</p>
        <p>Stock available: {product.stock}</p>
        <div className="quantity">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
          <strong>{quantity}</strong>
          <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}>+</button>
        </div>
        <div className="card-actions">
          <button className="btn primary" onClick={add}>Add to Cart</button>
          <button className="btn secondary" onClick={() => dispatch(toggleWishlist(product))}>♡ Wishlist</button>
        </div>
      </div>
    </section>
  );
}
