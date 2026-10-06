import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const cart = useSelector(s => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({ name: "", phone: "", address: "", city: "", state: "", pincode: "" });
  const [payment, setPayment] = useState("UPI");

  const total = cart.reduce((sum, x) => sum + x.price * x.quantity, 0);

  const next = () => {
    if (step === 1 && Object.values(address).some(v => !v.trim())) return alert("Please fill all address fields");
    setStep(s => s + 1);
  };

  const placeOrder = () => {
    dispatch(clearCart());
    alert("Order placed successfully!");
    navigate("/orders");
  };

  return (
    <section>
      <h1>Checkout</h1>
      <div className="steps">Step {step} of 3</div>

      {step === 1 && (
        <div className="form-card wide">
          <h2>Delivery Address</h2>
          {Object.keys(address).map(key => (
            <label key={key}>
              {key.toUpperCase()}
              <input value={address[key]} onChange={e => setAddress({ ...address, [key]: e.target.value })} />
            </label>
          ))}
          <button className="btn primary" onClick={next}>Continue</button>
        </div>
      )}

      {step === 2 && (
        <div className="form-card wide">
          <h2>Payment</h2>
          {["UPI", "Credit Card", "Debit Card", "Cash on Delivery"].map(x => (
            <label className="radio" key={x}>
              <input type="radio" name="payment" checked={payment === x} onChange={() => setPayment(x)} />
              {x}
            </label>
          ))}
          <button className="btn primary" onClick={next}>Review Order</button>
        </div>
      )}

      {step === 3 && (
        <div className="form-card wide">
          <h2>Review</h2>
          <p>Items: {cart.length}</p>
          <p>Payment: {payment}</p>
          <h2>Total: ₹{total.toLocaleString("en-IN")}</h2>
          <button className="btn primary" onClick={placeOrder}>Place Order</button>
        </div>
      )}
    </section>
  );
}
