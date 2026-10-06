import React, { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import useDebounce from "../hooks/useDebounce";

const PAGE_SIZE = 6;

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const filtered = useMemo(() => {
    let result = products.filter(p =>
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    if (category !== "All") result = result.filter(p => p.category === category);
    if (minPrice > 0) result = result.filter(p => p.price >= minPrice);

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sort === "name") result.sort((a, b) => a.title.localeCompare(b.title));

    return result;
  }, [debouncedSearch, category, minPrice, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const reset = () => {
    setSearch("");
    setCategory("All");
    setMinPrice(0);
    setSort("default");
    setPage(1);
  };

  return (
    <section>
      <div className="page-heading">
        <div>
          <h1>Products</h1>
          <p className="muted">{filtered.length} products found</p>
        </div>
      </div>

      <div className="filters">
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search products..."
        />

        <select value={category} onChange={e => { setCategory(e.target.value); setPage(1); }}>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>

        <select value={minPrice} onChange={e => { setMinPrice(Number(e.target.value)); setPage(1); }}>
          <option value="0">Any price</option>
          <option value="10000">₹10,000+</option>
          <option value="30000">₹30,000+</option>
          <option value="50000">₹50,000+</option>
        </select>

        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="default">Sort</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
          <option value="rating">Rating</option>
          <option value="name">Name A → Z</option>
        </select>

        <button className="btn secondary" onClick={reset}>Clear</button>
      </div>

      {visible.length ? (
        <div className="product-grid">
          {visible.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : <div className="empty">No products found.</div>}

      <div className="pagination">
        <button disabled={safePage === 1} onClick={() => setPage(p => p - 1)}>Previous</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(n =>
          <button className={safePage === n ? "active-page" : ""} key={n} onClick={() => setPage(n)}>{n}</button>
        )}
        <button disabled={safePage === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </section>
  );
}
