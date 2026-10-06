export default function Orders() {
  const orders = [
    { id: "ORD-1001", date: "06 Oct 2026", amount: 79999, status: "Shipped" },
    { id: "ORD-1002", date: "01 Oct 2026", amount: 14999, status: "Delivered" },
    { id: "ORD-1003", date: "28 Sep 2026", amount: 29999, status: "Processing" }
  ];

  return (
    <section>
      <h1>Orders</h1>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Order</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td><td>{o.date}</td><td>₹{o.amount.toLocaleString("en-IN")}</td>
                <td><span className="status">{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
