import React from "react"
import { useMemo, useState } from "react";
import { products as initialProducts } from "../data/products";

export default function Admin() {
  const [items, setItems] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [selected, setSelected] = useState([]);

  const visible = useMemo(() => {
    const data = items.filter(x => x.title.toLowerCase().includes(search.toLowerCase()));
    return [...data].sort((a, b) =>
      sort === "price" ? a.price - b.price : a.title.localeCompare(b.title)
    );
  }, [items, search, sort]);

  const allSelected = visible.length > 0 && visible.every(x => selected.includes(x.id));

  const toggleAll = () => {
    if (allSelected) setSelected(s => s.filter(id => !visible.some(x => x.id === id)));
    else setSelected(s => [...new Set([...s, ...visible.map(x => x.id)])]);
  };

  const removeSelected = () => {
    setItems(items.filter(x => !selected.includes(x.id)));
    setSelected([]);
  };

  return (
    <section>
      <div className="page-heading">
        <div><h1>Admin Dashboard</h1><p className="muted">Product management frontend</p></div>
        <button className="btn danger" disabled={!selected.length} onClick={removeSelected}>Delete Selected ({selected.length})</button>
      </div>

      <div className="stats">
        <div className="stat"><span>Products</span><strong>{items.length}</strong></div>
        <div className="stat"><span>Orders</span><strong>128</strong></div>
        <div className="stat"><span>Customers</span><strong>1,240</strong></div>
        <div className="stat"><span>Sales</span><strong>₹8.4L</strong></div>
      </div>

      <div className="filters">
        <input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" checked={allSelected} onChange={toggleAll} /></th>
              <th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.map(p => (
              <tr key={p.id}>
                <td><input type="checkbox" checked={selected.includes(p.id)} onChange={() =>
                  setSelected(s => s.includes(p.id) ? s.filter(id => id !== p.id) : [...s, p.id])
                } /></td>
                <td>{p.title}</td><td>{p.category}</td>
                <td>₹{p.price.toLocaleString("en-IN")}</td>
                <td>{p.stock}</td><td><span className="status">{p.stock ? "Active" : "Sold Out"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
