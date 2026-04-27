// src/pages/StockTransactions.jsx
import React from "react";

const StockTransactions = () => {
  const transactions = [
    { id: 1, type: "IN", product: "Rice", qty: 50, date: "Today" },
    { id: 2, type: "OUT", product: "Sugar", qty: 20, date: "Yesterday" },
    { id: 3, type: "IN", product: "Oil", qty: 30, date: "2 days ago" },
  ];

  const getBadge = (type) => {
    return type === "IN" ? "bg-success" : "bg-danger";
  };

  return (
    <div className="fade-in">

      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Stock Transactions 🔄</h2>
        <p className="text-muted">Track all stock movements</p>
      </div>

      {/* Filters */}
      <div className="card glass p-3 mb-4">
        <div className="row">

          <div className="col-md-4">
            <input className="form-control" placeholder="Search product..." />
          </div>

          <div className="col-md-4">
            <select className="form-select">
              <option>All Types</option>
              <option>IN</option>
              <option>OUT</option>
            </select>
          </div>

          <div className="col-md-4">
            <button className="btn btn-primary rounded-pill px-4 shadow-sm w-100">
              Apply Filter
            </button>
          </div>

        </div>
      </div>

      {/* Table */}
      <div className="card glass p-3">
        <table className="table table-hover align-middle">

          <thead>
            <tr>
              <th>Type</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>

                <td>
                  <span className={`badge ${getBadge(t.type)}`}>
                    {t.type}
                  </span>
                </td>

                <td>{t.product}</td>

                <td className={t.type === "IN" ? "text-success fw-bold" : "text-danger fw-bold"}>
                  {t.type === "IN" ? `+${t.qty}` : `-${t.qty}`}
                </td>

                <td className="text-muted">{t.date}</td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default StockTransactions;