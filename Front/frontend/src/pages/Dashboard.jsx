// src/pages/Dashboard.jsx - COMPLETE VERSION
import API from "../services/api";
import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBranches: 12,
    totalProducts: 245,
    lowStock: 23,
    totalOrders: 156
  });

  // Chart Data
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales',
      data: [120, 190, 300, 500, 200, 300],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  const doughnutChartData = {
  labels: ['In Stock', 'Low Stock', 'Out of Stock'],
  datasets: [{
    data: [
      stats.inStock || 0,
      stats.lowStock || 0,
      stats.outOfStock || 0
    ],
    backgroundColor: [
      '#10B981',
      '#F59E0B',
      '#EF4444'
    ],
    borderWidth: 0
  }]
};

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Simulate real-time data update
 useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {
  try {
    const res = await API.get("/dashboard");

    setStats({
      totalProducts: res.data.total_products,
      lowStock: res.data.low_stock,
      inStock: res.data.in_stock,
      outOfStock: res.data.out_of_stock
    });

  } catch (err) {
    console.error("Dashboard error:", err);
  }
};

  return (
    <div>
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="fw-bold text-primary mb-1">Dashboard</h2>
          <p className="text-muted">Welcome back! Here's what's happening with your inventory.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-5">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 bg-primary bg-gradient rounded-circle p-3">
                  <i className="fas fa-building fa-2x text-white"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="text-muted mb-1">Total Branches</h5>
                  <h2 className="fw-bold text-primary">{stats.totalBranches}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 bg-success bg-gradient rounded-circle p-3">
                  <i className="fas fa-box fa-2x text-white"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="text-muted mb-1">Total Products</h5>
                  <h2 className="fw-bold text-success">{stats.totalProducts}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 bg-warning bg-gradient rounded-circle p-3">
                  <i className="fas fa-exclamation-triangle fa-2x text-white"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="text-muted mb-1">Low Stock Items</h5>
                  <h2 className="fw-bold text-warning">{stats.lowStock}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 bg-info bg-gradient rounded-circle p-3">
                  <i className="fas fa-shopping-cart fa-2x text-white"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="text-muted mb-1">Total Orders</h5>
                  <h2 className="fw-bold text-info">{stats.totalOrders}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row g-4">
        <div className="col-xl-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 pb-0">
              <h5 className="card-title mb-0 fw-bold">Sales Overview</h5>
              <p className="text-muted mb-0">Monthly sales trend across all branches</p>
            </div>
            <div className="card-body p-0">
              <div style={{ height: '350px', padding: '2rem' }}>
                <Bar data={barChartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xl-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 pb-0">
              <h5 className="card-title mb-0 fw-bold">Stock Status</h5>
              <p className="text-muted mb-0">Current inventory distribution</p>
            </div>
            <div className="card-body p-4">
              <div style={{ height: '250px' }}>
                <Doughnut data={doughnutChartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="row mt-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 pb-0">
              <h5 className="card-title mb-0 fw-bold">Recent Activity</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Activity</th>
                      <th>Branch</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Status</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="badge bg-success">Stock Received</span></td>
                      <td>Main Branch</td>
                      <td>Rice 5kg Pack</td>
                      <td><span className="text-success fw-bold">+150</span></td>
                      <td><span className="badge bg-success">Completed</span></td>
                      <td>2 min ago</td>
                    </tr>
                    <tr>
                      <td><span className="badge bg-warning">Stock Transfer</span></td>
                      <td>Delhi → Mumbai</td>
                      <td>Wheat Flour</td>
                      <td><span className="text-warning fw-bold">-75</span></td>
                      <td><span className="badge bg-warning">In Transit</span></td>
                      <td>45 min ago</td>
                    </tr>
                    <tr>
                      <td><span className="badge bg-info">Purchase Order</span></td>
                      <td>Main Branch</td>
                      <td>Edible Oil</td>
                      <td><span className="text-info fw-bold">+200</span></td>
                      <td><span className="badge bg-info">Pending</span></td>
                      <td>1 hr ago</td>
                    </tr>
                    <tr>
                      <td><span className="badge bg-danger">Low Stock Alert</span></td>
                      <td>Bangalore</td>
                      <td>Sugar</td>
                      <td><span className="text-danger fw-bold">12</span></td>
                      <td><span className="badge bg-danger">Critical</span></td>
                      <td>2 hrs ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-center mt-3">
                <a href="/transactions" className="text-primary fw-semibold">View All Transactions →</a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 pb-0">
              <h5 className="card-title mb-0 fw-bold">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <a href="/inventory" className="btn btn-outline-primary">
                  <i className="fas fa-warehouse me-2"></i>
                  View Inventory
                </a>
                <a href="/purchase-orders" className="btn btn-outline-success">
                  <i className="fas fa-shopping-cart me-2"></i>
                  New Purchase Order
                </a>
                <a href="/stock-transfer" className="btn btn-outline-info">
                  <i className="fas fa-truck me-2"></i>
                  Transfer Stock
                </a>
                <a href="/branches" className="btn btn-outline-warning">
                  <i className="fas fa-building me-2"></i>
                  Manage Branches
                </a>
                <a href="/reports" className="btn btn-outline-secondary">
                  <i className="fas fa-chart-bar me-2"></i>
                  Generate Report
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;