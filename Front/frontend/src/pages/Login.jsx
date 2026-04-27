// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import api from "../services/api";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   setTimeout(() => {
  //     login({ name: 'Admin User', email: formData.email });
  //     navigate('/');
  //     setLoading(false);
  //   }, 1500);
  // };





const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // ⚠️ FastAPI ke liye FormData use hota hai
    const form = new FormData();
    form.append("username", formData.email);
    form.append("password", formData.password);

    const res = await api.post("/login", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const token = res.data.access_token;

    // 🔥 YE LINE IMPORTANT HAI
    localStorage.setItem("token", token);

    // user set
    login({ name: formData.email });

    navigate("/");

  } catch (err) {
    console.log(err);
    alert("Login failed ❌");
  } finally {
    setLoading(false);
  }
};





  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: 'linear-gradient(135deg, #eef2ff, #f8fafc)'
      }}
    >

      <div 
        className="card shadow-lg border-0 p-5"
        style={{
          width: "420px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)"
        }}
      >

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Inventory Tracker</h2>
          <p className="text-muted">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>

            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control form-control-lg"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />

              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            className="btn btn-primary w-100 py-2 rounded-pill shadow-sm mt-3 fw-semibold"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>

        </form>

        {/* Footer */}
        <p className="text-center mt-4 text-muted mb-0">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary fw-semibold">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;