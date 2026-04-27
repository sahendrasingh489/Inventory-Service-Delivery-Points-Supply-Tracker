// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ ADD

import Layout from "./components/layout/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Branches from "./pages/Branches";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import StockTransactions from "./pages/StockTransactions";
import PurchaseOrders from "./pages/PurchaseOrders";
import StockTransfer from "./pages/StockTransfer";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* 🌐 Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔒 Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="branches" element={<Branches />} />
            <Route path="products" element={<Products />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="transactions" element={<StockTransactions />} />
            <Route path="purchase-orders" element={<PurchaseOrders />} />
            <Route path="stock-transfer" element={<StockTransfer />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; 