import React from "react"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, decrement, increment, removeFromCart } from "../store";

export default function Cart() {
  const cart = useSelector(s => s.cart);
  const dispatch = useDispatch();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 50000 || subtotal === 0 ? 0 : 99;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  if (!cart.length) return (
    <div className="empty">
      <h1>Your cart is empty</h1>
      <Link className="btn primary" to="/products">Browse Products</Link>
    </div>
  );

  return (
    <section>
      <div className="page-heading">
        <h1>Shopping Cart</h1>
        <button className="btn danger" onClick={() => dispatch(clearCart())}>Clear Cart</button>
      </div>

      <div className="cart-layout">
        <div>
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="cart-info">
                <h3>{item.title}</h3>
                <p>₹{item.price.toLocaleString("en-IN")}</p>
                <div className="quantity">
                  <button onClick={() => dispatch(decrement(item.id))}>−</button>
                  <strong>{item.quantity}</strong>
                  <button onClick={() => dispatch(increment(item.id))}>+</button>
                </div>
              </div>
              <strong>₹{(item.price * item.quantity).toLocaleString("en-IN")}</strong>
              <button className="link-btn danger-text" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
            </div>
          ))}
        </div>

        <aside className="summary">
          <h2>Order Summary</h2>
          <p><span>Subtotal</span><strong>₹{subtotal.toLocaleString("en-IN")}</strong></p>
          <p><span>Tax (18%)</span><strong>₹{tax.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</strong></p>
          <p><span>Shipping</span><strong>{shipping ? `₹${shipping}` : "FREE"}</strong></p>
          <hr />
          <p><span>Total</span><strong>₹{total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</strong></p>
          <Link className="btn primary full" to="/checkout">Proceed to Checkout</Link>
        </aside>
      </div>
    </section>
  );
}
