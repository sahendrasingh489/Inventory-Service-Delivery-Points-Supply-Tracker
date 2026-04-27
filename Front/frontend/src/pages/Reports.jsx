// src/pages/Reports.jsx
import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";

const Reports = () => {

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Sales",
        data: [100, 200, 150, 300],
        backgroundColor: "rgba(59,130,246,0.6)",
        borderRadius: 8
      }
    ]
  };

  const stockData = {
    labels: ["In Stock", "Low", "Out"],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: ["#10B981", "#F59E0B", "#EF4444"]
      }
    ]
  };

  return (
    <div className="fade-in">

      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Reports & Analytics 📊</h2>
        <p className="text-muted">Track performance and insights</p>
      </div>

      {/* Summary Cards */}
      <div className="row g-4 mb-4">

        <div className="col-md-4">
          <div className="card p-3 bg-primary-gradient">
            <h6>Total Sales</h6>
            <h3 className="fw-bold">₹1.2L</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h6 className="text-muted">Orders</h6>
            <h3 className="fw-bold">320</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h6 className="text-muted">Low Stock</h6>
            <h3 className="fw-bold text-warning">23</h3>
          </div>
        </div>

      </div>

      {/* Charts */}
      <div className="row">

        {/* Bar Chart */}
        <div className="col-lg-8 mb-4">
          <div className="card glass p-3">
            <h5 className="fw-semibold mb-3">Monthly Sales</h5>
            <div style={{ height: "300px" }}>
              <Bar data={salesData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        {/* Doughnut */}
        <div className="col-lg-4 mb-4">
          <div className="card glass p-3">
            <h5 className="fw-semibold mb-3">Stock Status</h5>
            <div style={{ height: "300px" }}>
              <Doughnut data={stockData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

      </div>

      {/* Table */}
      <div className="card glass p-3">
        <h5 className="fw-semibold mb-3">Top Products</h5>

        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Product</th>
              <th>Sales</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Rice</td>
              <td>₹25,000</td>
              <td><span className="badge bg-success">High</span></td>
            </tr>

            <tr>
              <td>Oil</td>
              <td>₹18,000</td>
              <td><span className="badge bg-warning">Medium</span></td>
            </tr>

            <tr>
              <td>Sugar</td>
              <td>₹5,000</td>
              <td><span className="badge bg-danger">Low</span></td>
            </tr>
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Reports;