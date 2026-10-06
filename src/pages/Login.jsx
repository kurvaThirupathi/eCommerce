import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { login } from "../store";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const submit = e => {
    e.preventDefault();
    const next = {};
    if (!form.email.includes("@")) next.email = "Enter a valid email";
    if (form.password.length < 6) next.password = "Minimum 6 characters";
    setErrors(next);
    if (Object.keys(next).length) return;

    dispatch(login({ name: form.email.split("@")[0], email: form.email }));
    navigate(location.state?.from || "/");
  };

  return (
    <section className="form-page">
      <form className="form-card" onSubmit={submit}>
        <h1>Login</h1>
        <label>Email</label>
        <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        {errors.email && <small className="error">{errors.email}</small>}
        <label>Password</label>
        <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        {errors.password && <small className="error">{errors.password}</small>}
        <button className="btn primary full">Login</button>
        <p className="muted">Demo: use any valid email and a password with 6+ characters.</p>
        <Link to="/">Back Home</Link>
      </form>
    </section>
  );
}
