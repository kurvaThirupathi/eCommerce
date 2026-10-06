import React from "react"
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <div>
        <span className="eyebrow">React Frontend Project</span>
        <h1>Build a production-style e-commerce frontend.</h1>
        <p>Practice React, Redux Toolkit, routing, forms, search, filtering, cart, wishlist, responsive UI and admin workflows in one project.</p>
        <Link className="btn primary large" to="/products">Start Shopping</Link>
      </div>
      <div className="hero-box">
        <div>⚛️ React</div>
        <div>🧠 Redux Toolkit</div>
        <div>🧭 React Router</div>
        <div>⚡ Performance</div>
      </div>
    </section>
  );
}
