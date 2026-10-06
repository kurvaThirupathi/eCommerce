import React from "react"
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store";

export default function Header() {
  const dispatch = useDispatch();
  const cart = useSelector(s => s.cart);
  const wishlist = useSelector(s => s.wishlist);
  const { user, isLoggedIn } = useSelector(s => s.auth);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <Link className="logo" to="/">ShopMaster</Link>
      <nav>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/wishlist">Wishlist ({wishlist.length})</NavLink>
        <NavLink to="/cart">Cart ({cartCount})</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </nav>
      <div className="header-user">
        {isLoggedIn ? (
          <>
            <span>Hi, {user.name}</span>
            <button className="link-btn" onClick={() => dispatch(logout())}>Logout</button>
          </>
        ) : <Link to="/login">Login</Link>}
      </div>
    </header>
  );
}
