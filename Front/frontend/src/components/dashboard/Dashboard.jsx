import React from 'react';
import StatCard from '../components/common/StatCard';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  BuildingOffice2Icon,
  CubeIcon,
  ExclamationTriangleIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {

  const stats = [
    { icon: <BuildingOffice2Icon className="w-8 h-8" />, title: 'Branches', value: '12', color: 'primary' },
    { icon: <CubeIcon className="w-8 h-8" />, title: 'Products', value: '245', color: 'success' },
    { icon: <ExclamationTriangleIcon className="w-8 h-8" />, title: 'Low Stock', value: '23', color: 'warning' },
    { icon: <ShoppingCartIcon className="w-8 h-8" />, title: 'Orders', value: '156', color: 'info' }
  ];

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderRadius: 8
    }]
  };

  return (
    <div className="fade-in">

      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Dashboard Overview 📊</h2>
        <p className="text-muted">Real-time inventory insights</p>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-lg-3 col-md-6">
            
            <div className="card p-4 bg-primary-gradient text-white">
              <div className="d-flex justify-content-between align-items-center">
                
                <div>
                  <p className="mb-1">{stat.title}</p>
                  <h3 className="fw-bold">{stat.value}</h3>
                </div>

                <div className="bg-white text-dark p-3 rounded-circle">
                  {stat.icon}
                </div>

              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="row">

        {/* Bar Chart */}
        <div className="col-lg-8 mb-4">
          <div className="card glass shadow-sm">
            <div className="card-header bg-transparent border-0">
              <h5 className="fw-semibold">Monthly Sales Trend</h5>
            </div>
            <div className="card-body">
              <div style={{ height: '350px' }}>
                <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        </div>

        {/* Doughnut */}
        <div className="col-lg-4 mb-4">
          <div className="card glass shadow-sm h-100">
            <div className="card-header bg-transparent border-0">
              <h5 className="fw-semibold">Stock Status</h5>
            </div>
            <div className="card-body">
              <Doughnut
                data={{
                  labels: ['In Stock', 'Low Stock', 'Out'],
                  datasets: [{
                    data: [70, 25, 5],
                    backgroundColor: ['#10B981', '#F59E0B', '#EF4444']
                  }]
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Recent Activity */}
      <div className="card glass mt-3">
        <div className="card-header bg-transparent border-0">
          <h5 className="fw-semibold">Recent Activity</h5>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Branch</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Time</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td><span className="badge bg-success">Stock In</span></td>
                  <td>Main</td>
                  <td>Rice</td>
                  <td className="text-success">+50</td>
                  <td>2 min ago</td>
                </tr>

                <tr>
                  <td><span className="badge bg-warning">Transfer</span></td>
                  <td>Branch 2</td>
                  <td>Wheat</td>
                  <td className="text-danger">-25</td>
                  <td>1 hr ago</td>
                </tr>
              </tbody>

            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;