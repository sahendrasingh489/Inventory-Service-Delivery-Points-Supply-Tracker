// src/components/layout/Layout.jsx
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const SIDEBAR_WIDTH = 100;

const Layout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        style={{
          marginLeft: SIDEBAR_WIDTH,
          width: `calc(100% - ${SIDEBAR_WIDTH}px)`,   // 🔥 IMPORTANT FIX
          display: "flex",
          flexDirection: "column"
        }}
      >

        <Header />

        <div
          className="fade-in"
          style={{
            padding: "20px 30px",
            flex: 1
          }}
        >
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Layout;