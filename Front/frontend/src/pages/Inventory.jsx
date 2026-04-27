// src/pages/Inventory.jsx
import React, { useState } from "react";

const Inventory = () => {
  const [inventory] = useState([
    {
      id: 1,
      product: "Basmati Rice",
      branch: "Main Branch",
      quantity: 120
    },
    {
      id: 2,
      product: "Wheat Flour",
      branch: "Branch 2",
      quantity: 25
    },
    {
      id: 3,
      product: "Sugar",
      branch: "Main Branch",
      quantity: 5
    }
  ]);

  const getStatus = (qty) => {
    if (qty === 0) return { text: "Out", class: "bg-danger" };
    if (qty <= 20) return { text: "Low", class: "bg-warning" };
    return { text: "In Stock", class: "bg-success" };
  };

  return (
    <div className="fade-in">

      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Inventory 📦</h2>
        <p className="text-muted">Branch-wise stock overview</p>
      </div>

      {/* Filters */}
      <div className="card glass p-3 mb-4">
        <div className="row">

          <div className="col-md-4">
            <input className="form-control" placeholder="Search product..." />
          </div>

          <div className="col-md-4">
            <select className="form-select">
              <option>All Branches</option>
              <option>Main Branch</option>
              <option>Branch 2</option>
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
              <th>Product</th>
              <th>Branch</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {inventory.map((item) => {
              const status = getStatus(item.quantity);

              return (
                <tr key={item.id}>
                  <td>{item.product}</td>
                  <td>{item.branch}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <span className={`badge ${status.class}`}>
                      {status.text}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Inventory;