// src/components/layout/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Package, 
  Warehouse, 
  ShoppingCart, 
  Truck, 
  BarChart3, 
  Settings 
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/branches', icon: Building2, label: 'Branches' },
  { path: '/products', icon: Package, label: 'Products' },
  { path: '/inventory', icon: Warehouse, label: 'Inventory' },
  { path: '/transactions', icon: ShoppingCart, label: 'Transactions' },
  { path: '/purchase-orders', icon: ShoppingCart, label: 'Purchase Orders' },
  { path: '/stock-transfer', icon: Truck, label: 'Stock Transfer' },
  { path: '/reports', icon: BarChart3, label: 'Reports' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div
      className="d-flex flex-column p-3 shadow"
      style={{
        width: '260px',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        background: 'linear-gradient(180deg, #1e293b, #0f172a)',
        color: 'white',
        zIndex: 1000
      }}
    >
      {/* Logo */}
      <div className="text-center mb-4">
        <h4 className="fw-bold">🚀 Inventory</h4>
        <small className="text-muted">Admin Panel</small>
      </div>

      {/* Menu */}
      <div className="nav flex-column">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`d-flex align-items-center gap-2 mb-2 px-3 py-2 rounded text-decoration-none ${
                isActive
                  ? 'bg-primary text-white shadow'
                  : 'text-light'
              }`}
              style={{
                transition: '0.3s',
                fontWeight: isActive ? '600' : '400'
              }}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-3">
        <div className="p-2 bg-dark rounded text-center">
          <small>👤 Admin</small>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;